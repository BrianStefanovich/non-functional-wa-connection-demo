import React, { useState, useEffect } from "react";
import TextEditor from "./../components/TextEditor/TextEditor";
import AddTextEditor from "./../components/AddTextEditor/AddTextEditor";
import {
  CreateVariant,
  DeleteVariant,
  EditVariant,
  DeleteAll,
  SetActiveVariant,
} from "./../store/actions/TextNessageVariantAction";
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
  TableBody,
  InlineLoading,
  ExpandableTile,
  TileAboveTheFoldContent,
} from "carbon-components-react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Send16 } from "@carbon/icons-react";
import SelectConnection from "./../components/SelectConnection/SelectConnection";

function SendTextMessage(props) {
  useEffect(() => {
    props.deleteAll();
  }, []);

  const history = useHistory();

  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedCooldown, setSelectedCooldown] = useState("10");
  const [contactsInterval, setContactsInterval] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendStatus, setSendStaus] = useState([]);
  const [dispatchStatus, setDispatchStatus] = useState(false);

  const [contact, setContact] = useState({
    variables: ["Contact list is not selected"],
  });

  const calcContactsInterval = () => {
    const messageAmount = Math.floor(290 / (2 + parseInt(selectedCooldown)));
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
    const count = 0;
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

  const handleSelectConnection = (e) => {
    setSelectedConnection(e.target.value);
  };

  const handleSelectCooldown = (e) => {
    setSelectedCooldown(e.target.value);
  };

  const toggleDispatch = () => {
    setDispatchStatus(!dispatchStatus);
  };

  const handleModalClose = () => {
    props.changeNav("dashboard");
    history.push("/app/dashboard");
  };

  const handleSelectContact = async (e) => {
    const tmpContact = props.contacts.find((elm) => {
      return elm.id === e.target.value;
    });

    console.log("Contact!", tmpContact);

    setContact(tmpContact);
    setSelectedContact(e.target.value);
  };

  const sendMessages = async () => {
    setLoading(true);

    const tmpVariants = props.textMessageVariants.variants.map((elm) => {
      return elm.body;
    });
  };

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

        {props.textMessageVariants.variants.map((elm, i) => {
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

        <AddTextEditor messageType="text" />

        {props.textMessageVariants.variants.length > 0 ? (
          <Button
            kind="primary"
            style={{ marginTop: "64px" }}
            renderIcon={Send16}
            onClick={sendMessages}
          >
            Send Messages
          </Button>
        ) : null}
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    textMessageVariants: state.textMessageVariants,
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

export default connect(stateToProps, dispatchToProps)(SendTextMessage);
