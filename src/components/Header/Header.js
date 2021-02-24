import React, { useState } from "react";
import { AppSwitcher20 } from "@carbon/icons-react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  HeaderPanel,
  Switcher,
  SwitcherItem,
} from "carbon-components-react";

function MainHeader() {
  const history = useHistory();
  const firebase = useFirebase();
  const [isGlobalBarOpen, setIsGlobalBarOpen] = useState(false);

  const toggleGlobalBar = () => {
    setIsGlobalBarOpen(!isGlobalBarOpen);
  };

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        toggleGlobalBar();
        history.push("/login");
      });
  };

  return (
    <Header aria-label="Connectivity's">
      <SkipToContent />
      <HeaderName href="/" prefix="">
        NON FUNCTIONAL DEMO - WA Connection
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="User Avatar" onClick={toggleGlobalBar}>
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel expanded={isGlobalBarOpen}>
        <Switcher aria-label="Switcher Container">
          <SwitcherItem onClick={handleLogOut} aria-label="Log out">
            Log out
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    </Header>
  );
}

export default MainHeader;
