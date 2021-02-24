import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.scss";

import { createStore, applyMiddleware } from "redux";

import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import fbConfig from "./.env.js";

import firebase from "firebase/app";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
import "firebase/database";
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from "redux-firestore"; // <- needed if using firestore

import { composeWithDevTools } from "redux-devtools-extension";

firebase.initializeApp(fbConfig);
firebase.firestore();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbConfig)
  )
);

const rrfConfig = {
  userProfile: "users",
  enableClaims: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  useFirestoreForProfile: true,
  // createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
