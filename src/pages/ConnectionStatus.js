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
  Loading,
} from "carbon-components-react";

import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { TrashCan16 } from "@carbon/icons-react";

function ConnectionStatus(props) {
  const { id } = useParams();
  const history = useHistory();

  const connection = props.connections.find((elm) => {
    return elm.id === id;
  });

  const deleteConnection = () => {};

  if (connection.user) {
    return (
      <div className="connection-status">
        <SimpleCard title={connection.id}>
          <Layout
            col={2}
            first={
              <Table>
                <TableHead>
                  <TableHeader>
                    <h3>Connection's Info</h3>
                  </TableHeader>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>Name: {connection.user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>JID: {connection.user.jid}</TableCell>
                  </TableRow>
                </TableBody>

                <TableHead>
                  <TableHeader>
                    <h3>Device Info</h3>
                  </TableHeader>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      Device manufacurer:
                      {connection.user.phone.device_manufacturer}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Device model: {connection.user.phone.device_model}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>MCC: {connection.user.phone.mcc}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>MNC: {connection.user.phone.mnc}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      OS build number: {connection.user.phone.os_build_number}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      OS version: {connection.user.phone.os_version}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      WA version: {connection.user.phone.wa_version}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            }
            second={
              <img
                src={`${connection.user.imgUrl}`}
                style={{ width: "100%" }}
                alt="Profile associated with this wa account"
              />
            }
          />
        </SimpleCard>
        <Button
          kind="danger"
          renderIcon={TrashCan16}
          onClick={deleteConnection}
        >
          Delete connection
        </Button>
      </div>
    );
  } else {
    return <Loading />;
  }
}

const stateToProps = (state) => {
  return {
    connections: state.firestore.ordered.connections,
  };
};

export default connect(stateToProps)(ConnectionStatus);
