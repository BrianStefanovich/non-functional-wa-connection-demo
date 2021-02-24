import React from "react";
import { Grid, Row, Column } from "carbon-components-react";

export default function SimpleCard(props) {
  return (
    <div className="SimpleCard">
      <Grid>
        <Row>
          <Column>
            <h2 className={"title"}>{props.title}</h2>
            {props.children}
          </Column>
        </Row>
      </Grid>
    </div>
  );
}
