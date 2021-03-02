import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  TextBold32,
  TextItalic32,
  TextStrikethrough32,
  Code32,
  FaceSatisfied32,
  TrashCan32,
} from "@carbon/icons-react";
import { Button, Dropdown } from "carbon-components-react";
import { connect } from "react-redux";
import {
  CreateVariant,
  DeleteVariant,
  DeleteAll,
} from "./../../store/actions/TextNessageVariantAction";

function reduceSlate(value) {
  const lastIndex = value.length - 1;
  const paragraphReducer = (accumulator, currentValue, index) => {
    const textReducer = (accumulator, currentValue) => {
      if (currentValue.bold) {
        if (currentValue.text !== "") {
          return `${accumulator} *${currentValue.text}*`;
        } else {
          return `${accumulator} ${currentValue.text}`;
        }
      } else if (currentValue.italic) {
        if (currentValue.text !== "") {
          return `${accumulator} _${currentValue.text}_`;
        } else {
          return `${accumulator} ${currentValue.text}`;
        }
      } else if (currentValue.code) {
        if (currentValue.text !== "") {
          return accumulator + "```" + currentValue.text + "```";
        } else {
          return `${accumulator} ${currentValue.text}`;
        }
      } else if (currentValue.overline) {
        if (currentValue.text) {
          return `${accumulator} ~${currentValue.text}~`;
        } else {
          return `${accumulator} ${currentValue.text}`;
        }
      } else {
        return `${accumulator} ${currentValue.text}`;
      }
    };

    if (index !== lastIndex) {
      return (
        accumulator + `${currentValue.children.reduce(textReducer, "")} \n`
      );
    } else {
      return accumulator + `${currentValue.children.reduce(textReducer, "")}`;
    }
  };
  return value.reduce(paragraphReducer, "");
}

function TextEditor(props) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [emoji, setEmoji] = useState(false);

  const toggleEmoji = () => {
    setEmoji(!emoji);
  };

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = <code>{children}</code>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.overline) {
      children = <strike>{children}</strike>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const addText = (text) => {
    Transforms.insertText(editor, text);
  };

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const ToolBar = () => {
    return (
      <div className="ToolBar">
        <Dropdown
          onChange={(e) => addText(`{${e.selectedItem}}`)}
          size="sm"
          type="inline"
          items={props.variables}
          titleText="Variables"
        />
        <Button
          renderIcon={TextBold32}
          kind="ghost"
          hasIconOnly
          size={"small"}
          iconDescription="Bold"
          onClick={() => {
            const [match] = Editor.nodes(editor, {
              match: (n) => n.bold,
            });

            Transforms.setNodes(
              editor,
              { bold: match ? false : true },
              { match: (n) => Text.isText(n), split: true }
            );
          }}
        />
        <Button
          renderIcon={TextItalic32}
          kind="ghost"
          hasIconOnly
          iconDescription="Italic"
          size={"small"}
          onClick={() => {
            const [match] = Editor.nodes(editor, {
              match: (n) => n.italic,
            });

            Transforms.setNodes(
              editor,
              { italic: match ? false : true },
              { match: (n) => Text.isText(n), split: true }
            );
          }}
        />
        <Button
          renderIcon={TextStrikethrough32}
          kind="ghost"
          hasIconOnly
          iconDescription="Strike through"
          size={"small"}
          onClick={() => {
            const [match] = Editor.nodes(editor, {
              match: (n) => n.overline,
            });

            Transforms.setNodes(
              editor,
              { overline: match ? false : true },
              { match: (n) => Text.isText(n), split: true }
            );
          }}
        />
        <Button
          renderIcon={Code32}
          kind="ghost"
          hasIconOnly
          iconDescription="Monospace"
          size={"small"}
          onClick={() => {
            const [match] = Editor.nodes(editor, {
              match: (n) => n.code,
            });

            Transforms.setNodes(
              editor,
              { code: match ? false : true },
              { match: (n) => Text.isText(n), split: true }
            );
          }}
        />
        {/*
        <button
          onClick={() => {
            console.log(reduceSlate(value));
          }}
        >
          Reduce
        </button>


        <select onChange={(e) => addText(e.target.value)}>
          <option value="{opt1}">Opt1</option>
          <option value="{opt2}">Opt2</option>
          <option value="{opt3}">Opt3</option>
        </select>
	*/}
        <Button
          renderIcon={FaceSatisfied32}
          kind="ghost"
          iconDescription="Emoji"
          hasIconOnly
          size={"small"}
          onClick={toggleEmoji}
        />
      </div>
    );
  };

  return (
    <div className="TextEditor">
      {props.open ? <ToolBar /> : null}
      <div className="EmojiPicker">
        {emoji ? (
          <Picker
            title="Connectivity's"
            perLine={8}
            showPreview={false}
            onClick={(emoji) => {
              addText(emoji.native);
            }}
          />
        ) : null}
      </div>

      <div className="Main">
        <Slate
          editor={editor}
          value={props.textState}
          onChange={(newValue) => {
            props.editVariant(props.editorIndex, {
              body: reduceSlate(newValue),
              textState: newValue,
            });
          }}
        >
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </Slate>
        {props.open ? null : (
          <Button
            className="DeleteButton"
            hasIconOnly
            renderIcon={TrashCan32}
            onClick={() => {
              console.log(props.editorIndex);
              props.deleteVariant(props.editorIndex);
            }}
            kind={"secondary"}
            iconDescription="Delete this variant"
          />
        )}
      </div>
    </div>
  );
}

const stateToProps = (state) => {
  return {
    textMessageVariants: state.textMessageVariants,
    contacts: state.firestore.ordered.contacts,
    connections: state.firestore.ordered.connections,
    uid: state.firebase.auth.uid,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    createVariant: (elm) => dispatch(CreateVariant(elm)),
    deleteVariant: (elm) => dispatch(DeleteVariant(elm)),
    deleteAll: () => dispatch(DeleteAll()),
  };
};

export default connect(stateToProps, dispatchToProps)(TextEditor);
