import React, { useState } from "react";
import { AppSwitcher20 } from "@carbon/icons-react";

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
  const [isGlobalBarOpen, setIsGlobalBarOpen] = useState(false);

  const toggleGlobalBar = () => {
    setIsGlobalBarOpen(!isGlobalBarOpen);
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
          <SwitcherItem aria-label="Log out">Log out</SwitcherItem>
        </Switcher>
      </HeaderPanel>
    </Header>
  );
}

export default MainHeader;
