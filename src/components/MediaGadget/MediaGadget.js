import React, { useState } from "react";
import { TrashCan16 } from "@carbon/icons-react";
import {
  FileUploaderItem,
  FileUploaderDropContainer,
  Loading,
  Button,
  InlineNotification,
} from "carbon-components-react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import {
  CreateVariant,
  DeleteVariant,
  DeleteAll,
  SetActiveVariant,
  SetMediaPath,
  SetMediaType,
} from "./../../store/actions/MediaMessageVariantAction";

function MediaGadget(props) {
  const firebase = useFirebase();
  const [status, setStatus] = useState("upload");
  const [image, setImage] = useState("#");
  const [audio, setAudio] = useState("#");
  const [video, setVideo] = useState("#");
  const [document, setDocument] = useState({});
  const [fileName, setFileName] = useState("");
  const [warn, setWarn] = useState({
    isOn: false,
    message: "",
  });

  const handleFile = async (evt, { addedFiles }) => {
    const file = addedFiles[0];
    const MBSize = file.size * 0.000001;
    const correctFormat =
      file.type === "application/pdf" ||
      file.type === "image/jpg" ||
      file.type === "audio/mpeg" ||
      file.type === "video/mp4" ||
      file.type === "image/jpeg";

    if (MBSize > 2.5) {
      setWarn({
        isOn: true,
        message: "File size must be less than 2.5mb",
      });
    } else if (!correctFormat) {
      setWarn({
        isOn: true,
        message: `Incorrect file format. ${file.type} not allowed`,
      });
    } else {
      setWarn({
        isOn: false,
        message: "",
      });
    }

    const upload = async () => {
      await firebase.uploadFile(`user/${props.uid}/media`, file);
    };

    setFileName(file.name);
    setStatus("loading");

    switch (file.type) {
      case "application/pdf":
        if (MBSize > 2.5 || !correctFormat) {
          setStatus("upload");
          props.setAddText(false);
          props.setSendMessage(false);
          break;
        } else {
          props.setMediaPath(file.name);
          await upload();
          setDocument(file.name);
          props.setMediaType("document");
          props.setSendMessage(true);
          props.setAddText(false);
          setStatus("document");
          break;
        }

      /*
      case "image/png":
        props.setMediaPath(file.name);
        await firebase.uploadFile(`user/${props.uid}/media`, file);
        await createSticker();
        setImage(URL.createObjectURL(file));
        props.setMediaType("sticker");
        props.setAddText(false);
        props.setSendMessage(true);
        setStatus("sticker");
        break;
*/
      case "image/jpeg":
        if (MBSize > 2.5 || !correctFormat) {
          setStatus("upload");
          props.setAddText(false);
          props.setSendMessage(false);
          break;
        } else {
          props.setMediaPath(file.name);
          await upload();
          setImage(URL.createObjectURL(file));
          props.setMediaType("image");
          props.setAddText(true);
          props.setSendMessage(true);
          setStatus("image");
          break;
        }

      case "image/jpg":
        if (MBSize > 2.5 || !correctFormat) {
          setStatus("upload");
          props.setAddText(false);
          props.setSendMessage(false);
          break;
        } else {
          props.setMediaPath(file.name);
          await upload();
          setImage(URL.createObjectURL(file));
          props.setMediaType("image");
          props.setSendMessage(true);
          setStatus("image");
          break;
        }

      case "audio/mpeg":
        if (MBSize > 2.5 || !correctFormat) {
          setStatus("upload");
          props.setAddText(false);
          props.setSendMessage(false);
          break;
        } else {
          props.setMediaPath(file.name);
          await upload();
          setAudio(URL.createObjectURL(file));
          props.setMediaType("audio");
          props.setAddText(false);
          props.setSendMessage(true);
          setStatus("audio");
          break;
        }

      case "video/mp4":
        if (MBSize > 2.5 || !correctFormat) {
          setStatus("upload");
          props.setAddText(false);
          props.setSendMessage(false);
          break;
        } else {
          props.setMediaPath(file.name);
          await upload();
          setVideo(URL.createObjectURL(file));
          props.setMediaType("video");
          props.setAddText(true);
          props.setSendMessage(true);
          setStatus("video");
          break;
        }

      default:
        setStatus("upload");
        props.setAddText(false);
        props.setSendMessage(false);
        break;
    }
  };

  const deleteVideo = async () => {
    const ref = firebase.storage().ref(`user/${props.uid}/media/${fileName}`);
    await ref.delete();
    props.setSendMessage(false);
    props.setMediaPath("");
    props.deleteAll();
    setStatus("upload");
  };

  const deleteAudio = async () => {
    const ref = firebase.storage().ref(`user/${props.uid}/media/${fileName}`);
    await ref.delete();
    props.setSendMessage(false);
    props.setMediaPath("");
    props.deleteAll();
    setStatus("upload");
  };

  const deleteImage = async () => {
    const ref = firebase.storage().ref(`user/${props.uid}/media/${fileName}`);
    await ref.delete();
    props.setSendMessage(false);
    props.setMediaPath("");
    props.deleteAll();
    setStatus("upload");
  };

  const deleteDocument = async () => {
    const ref = firebase.storage().ref(`user/${props.uid}/media/${fileName}`);
    await ref.delete();
    props.setSendMessage(false);
    props.setMediaPath("");
    props.deleteAll();
    setStatus("upload");
  };

  if (status === "image") {
    return (
      <div className="MediaGadget">
        <img alt="" className="image" src={image} />
        <div className="DeleteButton">
          <Button
            iconDescription="Delete this file"
            hasIconOnly
            renderIcon={TrashCan16}
            kind="secondary"
            size="sm"
            onClick={deleteImage}
          />
        </div>
      </div>
    );
  } else if (status === "document") {
    return (
      <div className="MediaGadget">
        <FileUploaderItem
          name={document}
          status="edit"
          onDelete={deleteDocument}
        />
      </div>
    );
  } else if (status === "video") {
    return (
      <div className="MediaGadget">
        <Video loop controls={["PlayPause", "Seek", "Time", "Volume"]}>
          <source src={video} type="video/mp4" />
        </Video>
        <div className="DeleteButton">
          <Button
            iconDescription="Delete this file"
            hasIconOnly
            renderIcon={TrashCan16}
            kind="secondary"
            size="sm"
            onClick={deleteVideo}
          />
        </div>
      </div>
    );
  } else if (status === "audio") {
    return (
      <div className="MediaGadget">
        <AudioPlayer src={audio} />
        <div className="DeleteButton">
          <Button
            iconDescription="Delete this file"
            hasIconOnly
            renderIcon={TrashCan16}
            kind="secondary"
            size="sm"
            onClick={deleteAudio}
          />
        </div>
      </div>
    );
  } else if (status === "loading") {
    return (
      <div className="MediaGadget">
        <Loading withOverlay={false} />
      </div>
    );
  } else if (status === "upload") {
    return (
      <div>
        <div className="MediaGadget">
          <FileUploaderDropContainer
            labelText="Drop your media file here"
            onAddFiles={handleFile}
            accept={[
              "application/pdf",
              "image/png",
              "image/jpg",
              "image/jpeg",
              "audio/mpeg",
              "video/mp4",
            ]}
          />
        </div>
        {warn.isOn ? (
          <div className="Warn">
            <InlineNotification kind="warning" title={warn.message} />
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="MediaGadget">
        <FileUploaderDropContainer labelText="Drop your media file here" />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    createVariant: (elm) => dispatch(CreateVariant(elm)),
    deleteVariant: (id) => dispatch(DeleteVariant(id)),
    deleteAll: () => dispatch(DeleteAll()),
    setActiveVariant: (id) => dispatch(SetActiveVariant(id)),
    setMediaPath: (path) => dispatch(SetMediaPath(path)),
    setMediaType: (type) => dispatch(SetMediaType(type)),
  };
};

export default connect(stateToProps, dispatchToProps)(MediaGadget);
