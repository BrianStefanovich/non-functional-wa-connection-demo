import React from "react";
import { Button } from "carbon-components-react";
import { Add32 } from "@carbon/icons-react";
import { connect } from "react-redux";
import { CreateVariant as CreateTextVariant } from "./../../store/actions/TextNessageVariantAction";
import { CreateVariant as CreateMediaVariant } from "./../../store/actions/MediaMessageVariantAction";

function AddTextEditor(props) {
  if (props.messageType === "text") {
    return (
      <div className="AddTextEditor">
        <Button
          hasIconOnly
          onClick={() =>
            props.createTextVariant({
              body: "",
              textState: [
                {
                  type: "paragraph",
                  children: [{ text: "Write here your variant..." }],
                },
              ],
              active: true,
            })
          }
          renderIcon={Add32}
          kind={"secondary"}
          iconDescription="Add new variant"
        />
      </div>
    );
  }else if (props.messageType === "media") {
    return (
      <div className="AddTextEditor">
        <Button
          hasIconOnly
          onClick={() =>
            props.createMediaVariant({
              body: "",
              textState: [
                {
                  type: "paragraph",
                  children: [{ text: "Write here your variant..." }],
                },
              ],
              active: true,
            })
          }
          renderIcon={Add32}
          kind={"secondary"}
          iconDescription="Add new variant"
        />
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => {
  return {
    createTextVariant: (elm) => dispatch(CreateTextVariant(elm)),
    createMediaVariant: (elm) => dispatch(CreateMediaVariant(elm)),
  };
};

export default connect(null, dispatchToProps)(AddTextEditor);
