import React, { useState } from "react";
import { Modal, Loading, FileUploader } from "carbon-components-react";
import { changeNav } from "./../store/actions/SideNavActions";

import { connect } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

function CreateNewContact(props) {
  const firebase = useFirebase();
  const history = useHistory();

  const [connectionState, setConnectionState] = useState("file");
  const [fileStatus, setFileStatus] = useState("uploading");

  const handleModalClose = () => {
    setConnectionState(connectionState);
    props.changeNav("dashboard");
    history.push("/app/dashboard");
  };
  const handleFile = async (e) => {
    const file = e.target.files[0];
    await firebase
      .uploadFile(`user/${props.uid}/contacts`, file)
      .catch((err) => console.log(err));

    setFileStatus("complete");
  };

  switch (connectionState) {
    case "loading":
      return <Loading />;

    case "file":
      return (
        <Modal
          onRequestClose={handleModalClose}
          onRequestSubmit={handleModalClose}
          open
          modalHeading={<h2>Upload your csv</h2>}
          primaryButtonText="Done"
        >
          <br />
          <p>
            Upload your csv here. Remember that the first column’s header must
            be “phone” (without quotes) and all it’s cells must be user’s phone
            number with its country code (ex: 59594123456).
          </p>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FileUploader
              filenameStatus={fileStatus}
              buttonLabel="Add file"
              onChange={handleFile}
            />
          </div>
        </Modal>
      );
    default:
      return null;
  }
}

const dispatchToProps = (dispatch) => {
  return {
    changeNav: (elm) => dispatch(changeNav(elm)),
  };
};

export default connect(null, dispatchToProps)(CreateNewContact);
