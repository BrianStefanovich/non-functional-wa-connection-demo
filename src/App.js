import React from "react";
import { Content } from "carbon-components-react";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { connect } from "react-redux";
import {
  ConnectionStatus,
  ContactStatus,
  Dashboard,
  SendMediaMessage,
  SendTextMessage,
  CreateNewConnection,
  CreateNewContact,
} from "./pages";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <Header />
          <SideBar />
          <Content className={"content"}>
            <Switch>
              <Route path={`/app/create-new-connection`}>
                <CreateNewConnection />
              </Route>
              <Route path={`/app/create-new-contact`}>
                <CreateNewContact />
              </Route>
              <Route path={`/app/dashboard`}>
                <Dashboard />
              </Route>
              <Route path={`/app/send-text-message`}>
                <SendTextMessage />
              </Route>
              <Route path={`/app/send-media-message`}>
                <SendMediaMessage />
              </Route>
              <Route path="/app/connection-status/:id">
                <ConnectionStatus />
              </Route>
              <Route path="/app/contact-status/:id">
                <ContactStatus />
              </Route>
              <Route path="*">
                <Redirect to="/app/dashboard" />
              </Route>
            </Switch>
          </Content>
        </Route>
        <Route path="*">
          <Redirect to="/app/dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}

const stateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(stateToProps)(App);
