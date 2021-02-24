import React from "react";
import { Select, SelectItem, TextInput } from "carbon-components-react";
import { connect } from "react-redux";

function SelectConnection(props) {
  return (
    <div className="SelectConnection">
      <div style={{ marginBottom: "1em" }}>
        <Select
          onChange={props.handleSelectConnection}
          defaultValue="placeholder-item"
          hideLabel
        >
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Select a connection"
          />
          {props.connections.map((elm, i) => {
            return <SelectItem key={i} value={elm.id} text={elm.id} />;
          })}
        </Select>
      </div>
      <div>
        <Select
          onChange={props.handleSelectContact}
          defaultValue="placeholder-item"
          hideLabel
        >
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Select a contact list"
          />

          {props.contacts.map((elm, i) => {
            return <SelectItem key={i} value={elm.id} text={elm.id} />;
          })}
        </Select>
        <br />
        <TextInput
          type="number"
          value={props.cooldown}
          onChange={props.handleSelectCooldown}
          labelText="Cooldown (seconds)"
        />
      </div>
    </div>
  );
}

const stateToProps = (state) => {
  return {
    contacts: state.firestore.ordered.contacts,
    connections: state.firestore.ordered.connections,
  };
};

export default connect(stateToProps)(SelectConnection);
