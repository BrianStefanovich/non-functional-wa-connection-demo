import React from "react";
import SimpleCard from "./../components/SimpleCard/SimpleCard";
import Layout from "./../components/Layout/Layout";

import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "carbon-components-react";
import { connect } from "react-redux";

function Dashboard(props) {
  return (
    <div className={"dashboard"}>
      <Layout>
        <SimpleCard title="WA Connections">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>
                  <h5>Available Connections</h5>
                </TableHeader>
                <TableHeader>
                  <h5>Status</h5>
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.connections
                ? props.connections.map((elm, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{elm.id}</TableCell>
                        <TableCell> Online </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </SimpleCard>
      </Layout>

      <Layout>
        <SimpleCard title="Contact lists">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>
                  <h5>List name</h5>
                </TableHeader>
                <TableHeader>
                  <h5>Length</h5>
                </TableHeader>
                <TableHeader>
                  <h5>Available variables</h5>
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.contacts
                ? props.contacts.map((elm, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{elm.id}</TableCell>
                        <TableCell> {elm.length} </TableCell>
                        <TableCell>{elm.variables.toString()}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </SimpleCard>
      </Layout>
    </div>
  );
}

const stateToProps = (state) => {
  return {
    contacts: state.firestore.ordered.contacts,
    connections: state.firestore.ordered.connections,
  };
};

export default connect(stateToProps)(Dashboard);
