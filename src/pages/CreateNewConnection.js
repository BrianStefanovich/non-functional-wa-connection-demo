import React, { useState } from "react";
import { Modal, TextInput, Loading } from "carbon-components-react";

import { changeNav } from "./../store/actions/SideNavActions";
import * as QRCode from "qrcode.react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function CreateNewConnection(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [qr, setQr] = useState(
    "This is a non functional demo so this qr doesn't do anything"
  );

  const createConnection = () => {
    handleClick("loading");
    setConnectionState("qr");
  };

  const [connectionState, setConnectionState] = useState("name");

  const handleModalClose = () => {
    props.changeNav("dashboard");
    history.push("app/dashboard");
  };

  const handleClick = (value) => {
    setConnectionState(value);
  };

  const handleName = (e) => {
    setName(e.target.value);
    setQr(qr + e.target.value);
  };

  switch (connectionState) {
    case "name":
      return (
        <Modal
          onRequestSubmit={async () => {
            createConnection();
          }}
          hasForm
          open
          modalHeading={<h2> Create new connection</h2>}
          primaryButtonText="Create"
        >
          <br />
          <TextInput
            onChange={handleName}
            labelText="Connection's name"
            value={name}
          />
        </Modal>
      );

    case "loading":
      return <Loading />;

    case "qr":
      return (
        <Modal
          onRequestClose={handleModalClose}
          hasForm
          passiveModal
          open
          modalHeading={<h2>Scan the code</h2>}
        >
          <br />
          <p> Open whatsapp and scan the QR code</p>
          <br />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <QRCode value={qr} />
          </div>
        </Modal>
      );

    default:
      return null;
  }
}

const stateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    token: state.firebase.profile.token.token,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    changeNav: (elm) => dispatch(changeNav(elm)),
  };
};

export default connect(stateToProps, dispatchToProps)(CreateNewConnection);
