import React, { useState, useEffect, Fragment } from "react";
import TextEditor from "./../components/TextEditor/TextEditor";
import MediaGadget from "./../components/MediaGadget/MediaGadget";
import AddTextEditor from "./../components/AddTextEditor/AddTextEditor";
import {
  CreateVariant,
  EditVariant,
  DeleteVariant,
  DeleteAll,
  SetActiveVariant,
} from "./../store/actions/MediaMessageVariantAction";
import { changeNav } from "./../store/actions/SideNavActions";
import {
  Loading,
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableCell,
  Button,
  Modal,
  InlineLoading,
  ExpandableTile,
  TileAboveTheFoldContent,
  TableBody,
} from "carbon-components-react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useFirestoreConnect, useFirebase } from "react-redux-firebase";
import { Send16 } from "@carbon/icons-react";
import SelectConnection from "./../components/SelectConnection/SelectConnection";

function SendMediaMessage(props) {
  useEffect(() => {
    props.deleteAll();
  }, []);
  const firebase = useFirebase();
  const database = firebase.database();
  const history = useHistory();
  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedCooldown, setSelectedCooldown] = useState("10");
  const [contactsInterval, setContactsInterval] = useState([]);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendStatus, setSendStaus] = useState([]);
  const [dispatchStatus, setDispatchStatus] = useState(false);
  const [sendMessasges, setSendMessages] = useState(false);
  const [addText, setAddText] = useState(false);

  const [contact, setContact] = useState({
    id: "contact",
    variables: ["Contact list is not selected"],
    length: 1,
  });

  useEffect(() => {
    console.log(contactsInterval);
  }, [contactsInterval]);

  const calcContactsInterval = () => {
    const messageAmount = Math.floor(290 / (5 + parseInt(selectedCooldown)));
    console.log("Message amount: ", messageAmount);
    console.log("Contact length: ", contact.length);

    const messageQuant =
      messageAmount > contact.length
        ? 1
        : Math.floor(contact.length / messageAmount);
    const messageReminder =
      messageAmount > contact.length
        ? 0
        : Math.floor(contact.length % messageAmount);
    let tmpInterval = [];
    let lastSuperior = 0;

    for (let i = 0; i < messageQuant; i++) {
      if (messageAmount > contact.length) {
        tmpInterval.push([0, contact.length]);
      } else {
        tmpInterval.push([i * messageAmount, (i + 1) * messageAmount]);
      }
      lastSuperior = (i + 1) * messageAmount;
    }
    if (messageReminder !== 0) {
      tmpInterval.push([lastSuperior, lastSuperior + messageReminder]);
    }
    setContactsInterval(tmpInterval);
    console.log("tmpInterval: ", tmpInterval);
  };

  useEffect(() => {
    calcContactsInterval();
  }, [contact, selectedCooldown, selectedConnection]);

  const handleSelectCooldown = (e) => {
    setSelectedCooldown(e.target.value);
  };

  const db = () => {
    database.ref(`user/${props.uid}/mediaMessage`).remove();
    database.ref(`user/${props.uid}/mediaMessage`).on("value", (data) => {
      if (data.exists()) {
        const res = data.val();
        setSendStaus(res);
        setLoading(false);
        toggleDispatch();
        props.deleteAll();
      }
    });
  };

  const deleteDB = async () => {
    setSendStaus([]);
    await database.ref(`user/${props.uid}/mediaMessage`).remove();
  };

  const handleSelectConnection = (e) => {
    setSelectedConnection(e.target.value);
  };

  const toggleDispatch = () => {
    setDispatchStatus(!dispatchStatus);
  };

  const handleModalClose = () => {
    deleteDB();
    props.changeNav("dashboard");
    history.push("/app/dashboard");
  };

  const handleSelectContact = (e) => {
    const tmpContact = props.contacts.find((elm) => {
      return elm.id === e.target.value;
    });
    setSelectedContact(e.target.value);
    setContact(tmpContact);
  };

  const sendMessages = async () => {
    setLoading(true);
    db();

    let fireWall = false;

    for (let i = 0; i < contactsInterval.length; i++) {
      if (!fireWall) {
        const tmpToken = await firebase.auth().currentUser.getIdToken(true);
        await fetch(
          "https://us-central1-connectivitys-2066c.cloudfunctions.net/api/sendSingleMediaMessage/",
          {
            method: "POST",
            body: JSON.stringify({
              uid: props.uid,
              contactId: selectedContact,
              connectionId: selectedConnection,
              variants: props.mediaMessageVariants,
              token: tmpToken,
              cooldown: selectedCooldown * 1000,
              contactsInterval: contactsInterval[i],
              isFirst: i === 0,
              isLast: i === contactsInterval.length - 1,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            fireWall = true;
            console.log("Error response from server: ", err);
          });
      }
    }
  };

  useFirestoreConnect([
    {
      collection: "user",
      doc: props.uid,
      subcollections: [{ collection: "contacts" }],
      storeAs: "contacts",
    },
    {
      collection: "user",
      doc: props.uid,
      subcollections: [{ collection: "credentials" }],
      storeAs: "connections",
    },
  ]);

  if (dispatchStatus) {
    return (
      <Modal
        open={dispatchStatus}
        passiveModal
        onRequestClose={handleModalClose}
        modalHeading="Dispatch status"
        hasForm
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader />
              <TableHeader>Phone </TableHeader>
              <TableHeader>Message </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {sendStatus.map((elm, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{i} </TableCell>
                  <TableCell>
                    <InlineLoading
                      status={elm.sendStatus}
                      description={elm.receiverNumber}
                    />
                  </TableCell>
                  <TableCell>
                    <ExpandableTile>
                      <p></p>
                      <TileAboveTheFoldContent>
                        <p>{elm.message}</p>
                      </TileAboveTheFoldContent>
                    </ExpandableTile>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Modal>
    );
  } else {
    return (
      <div className="send-text-message">
        {loading ? <Loading /> : null}
        <SelectConnection
          handleSelectContact={handleSelectContact}
          handleSelectConnection={handleSelectConnection}
          handleSelectCooldown={handleSelectCooldown}
          cooldown={selectedCooldown}
        />

        <MediaGadget setAddText={setAddText} setSendMessage={setSendMessages} />

        {sendMessasges ? (
          <Fragment>
            {props.mediaMessageVariants.variants.map((elm, i) => {
              return (
                <div onClick={() => props.setActiveVariant(i)}>
                  <TextEditor
                    key={i}
                    editVariant={props.editVariant}
                    variables={contact.variables}
                    editorIndex={i}
                    textState={elm.textState}
                    open={elm.active}
                  />
                </div>
              );
            })}

            {addText ? <AddTextEditor messageType="media" /> : null}

            <Button
              kind="primary"
              style={{ marginTop: "64px" }}
              renderIcon={Send16}
              onClick={sendMessages}
            >
              Send Messages
            </Button>
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    mediaMessageVariants: state.mediaMessageVariants,
    contacts: state.firestore.ordered.contacts,
    connections: state.firestore.ordered.connections,
    uid: state.firebase.auth.uid,
    token: state.firebase.profile.token.token,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    changeNav: (elm) => dispatch(changeNav(elm)),
    createVariant: (elm) => dispatch(CreateVariant(elm)),
    deleteVariant: (id) => dispatch(DeleteVariant(id)),
    editVariant: (index, text) => dispatch(EditVariant(index, text)),
    deleteAll: () => dispatch(DeleteAll()),
    setActiveVariant: (id) => dispatch(SetActiveVariant(id)),
  };
};

export default connect(stateToProps, dispatchToProps)(SendMediaMessage);
