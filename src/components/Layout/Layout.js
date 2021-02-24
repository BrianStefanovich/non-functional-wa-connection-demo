import React from "react";
import { Grid, Row, Column } from "carbon-components-react";

export default function Layout(props) {
  if (props.col > 1) {
    return (
      <Grid>
        <Row>
          <Column>{props.first}</Column>
          <Column>{props.second}</Column>
        </Row>
      </Grid>
    );
  } else {
    return (
      <Grid>
        <Row>
          <Column>{props.children}</Column>
        </Row>
      </Grid>
    );
  }
}
