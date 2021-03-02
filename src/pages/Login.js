import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Link,
  Loading,
  InlineNotification,
} from "carbon-components-react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const firebase = useFirebase();
  const history = useHistory();

  const [loginState, setLoginState] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailWarn, setEmailWarn] = useState(false);
  const [emailWarnText, setEmailWarnText] = useState("");

  const handleMail = (e) => {
    setEmailWarn(false);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = (value) => {
    setLoginState(value);
  };

  const handleMailWarn = (text) => {
    setEmailWarn(true);
    setEmailWarnText(text);
  };

  const handleResetPassword = () => {
    setLoginState("loading");
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoginState("reset");
      });
  };

  switch (loginState) {
    case "login":
      return (
        <Modal
          shouldSubmitOnEnter
          hasForm
          onRequestSubmit={() => {
            if (email === "") {
              handleMailWarn("Your mail cannot be empty");
            } else {
              handleClick("password");
            }
          }}
          open
          modalHeading={<h2> Login</h2>}
          primaryButtonText="Login"
        >
          <p>Don't have an account yet? </p>{" "}
          <Link> Create my Connectivity's account</Link>
          <br />
          {emailWarn ? (
            <InlineNotification title={emailWarnText} kind="warning" />
          ) : null}
          <br />
          <TextInput
            onChange={handleMail}
            labelText="eMail"
            placeholder={"your@email.com"}
            value={email !== "" ? email : null}
          />
        </Modal>
      );

    case "password":
      return (
        <Modal
          open
          hasForm
          shouldSubmitOnEnter
          modalHeading={<h2> Login</h2>}
          primaryButtonText="Login"
          secondaryButtonText="Back"
          onSecondarySubmit={() => handleClick("login")}
          onRequestSubmit={() => {
            setLoginState("loading");
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                history.push("/app");
              })
              .catch((err) => {
                handleMailWarn(err.message);
                setLoginState("login");
              });
          }}
        >
          <p>Login with {email} account </p>
          <br />
          <br />
          <TextInput.PasswordInput
            onChange={handlePassword}
            id="password"
            labelText="Password"
          />
          <Link onClick={handleResetPassword}> Forgot my password </Link>
        </Modal>
      );

    case "loading":
      return <Loading active />;

    case "reset":
      return (
        <Modal
          open
          shouldSubmitOnEnter
          modalHeading={<h2> Login</h2>}
          primaryButtonText="Login"
          secondaryButtonText="Back"
          onRequestSubmit={() => setLoginState("login")}
          onSecondarySubmit={() => setLoginState("login")}
        >
          <p>
            We've sent an email to {email} to reset your password. Check your
            spam folder if the mail doesn't appear{" "}
          </p>
          <br />
          <br />
        </Modal>
      );
    default:
      return null;
  }
}
