import React from "react";
import Layout from "./../components/Layout/Layout";
import SimpleCard from "./../components/SimpleCard/SimpleCard";
import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  Button,
} from "carbon-components-react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { TrashCan16 } from "@carbon/icons-react";

function ContactStatus(props) {
  const { id } = useParams();
  const deleteContact = () => {};

  const contact = props.contacts.find((elm) => {
    return elm.id === id;
  });

  return (
    <div className="contact-status">
      <SimpleCard title={contact.id}>
        <Layout
          col={2}
          first={
            <div>
              <p>
                This is a list with all your contact’s available variables. To
                call them in the message, just type it’s name inside curly
                braces.
              </p>
              <br />
              <br />
              <p>
                If you call a variable that doesn’t exists, “undefined” is going
                to appear on its place in the message.
              </p>
            </div>
          }
          second={
            <Table>
              <TableHead>
                <TableHeader>
                  <h3>Available variables</h3>
                </TableHeader>
              </TableHead>

              <TableBody>
                {contact.variables.map((elm, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell> {`{ ${elm} }`}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

              <TableHead>
                <TableHeader>
                  <h3>Contacts Available</h3>
                </TableHeader>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell> {contact.length} contacts </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          }
        />
        <Button onClick={deleteContact} kind="danger" renderIcon={TrashCan16}>
          Delete contact list
        </Button>
      </SimpleCard>
    </div>
  );
}

const stateToProps = (state) => {
  return {
    contacts: state.firestore.ordered.contacts,
  };
};

export default connect(stateToProps)(ContactStatus);
