import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  ToolbarDivider,
} from "carbon-components-react";

import { changeNav } from "./../../store/actions/SideNavActions";

import {
  Dashboard16,
  ClosedCaptionAlt16,
  Network_416,
  Image16,
  EventSchedule16,
  EventsAlt16,
} from "@carbon/icons-react";

import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

function SideBar(props) {
  const history = useHistory();

  const redirect = (path) => {
    history.push(`${path}`);
  };

  return (
    <Fragment>
      <SideNav
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
        aria-label="Side navigation"
      >
        <SideNavItems>
          <SideNavLink
            isActive={props.sideNav === "dashboard"}
            renderIcon={Dashboard16}
            onClick={() => {
              props.changeTab("dashboard");
              redirect("/app/dashboard");
            }}
          >
            Dashboard
          </SideNavLink>

          <ToolbarDivider />
          <SideNavLink
            renderIcon={ClosedCaptionAlt16}
            isActive={props.sideNav === "send-text-message"}
            onClick={() => {
              props.changeTab("send-text-message");
              redirect("/app/send-text-message");
            }}
          >
            Send text messages
          </SideNavLink>
          <SideNavLink
            isActive={props.sideNav === "send-media-message"}
            renderIcon={Image16}
            onClick={() => {
              console.log("Closed feature");
              props.changeTab("send-media-message");
              redirect("/app/send-media-message");
            }}
          >
            Send media messages
          </SideNavLink>

          <ToolbarDivider />

          <SideNavMenu renderIcon={EventSchedule16} title="Campaigns">
            <SideNavMenuItem>Create new campaign</SideNavMenuItem>
          </SideNavMenu>

          <ToolbarDivider />

          <SideNavMenu
            title="WA - Connections"
            isActive={false}
            renderIcon={Network_416}
          >
            {props.connections
              ? props.connections.map((elm, i) => {
                  return (
                    <SideNavMenuItem
                      key={i}
                      isActive={props.sideNav === `connection-status/${elm.id}`}
                      onClick={() => {
                        props.changeTab(`connection-status/${elm.id}`);
                        redirect(`/app/connection-status/${elm.id}`);
                      }}
                    >
                      {elm.id}
                    </SideNavMenuItem>
                  );
                })
              : ""}
            <SideNavMenuItem
              isActive={props.sideNav === `create-new-connection`}
              onClick={() => {
                redirect(`/app/create-new-connection`);
                props.changeTab(`create-new-connection`);
              }}
            >
              Create new connection
            </SideNavMenuItem>
          </SideNavMenu>

          <SideNavMenu title="Contact lists" renderIcon={EventsAlt16}>
            {props.contacts
              ? props.contacts.map((elm, i) => {
                  return (
                    <SideNavMenuItem
                      key={i}
                      isActive={props.sideNav === `contact-status/${elm.id}`}
                      onClick={() => {
                        props.changeTab(`contact-status/${elm.id}`);
                        redirect(`/app/contact-status/${elm.id}`);
                      }}
                    >
                      {elm.id}
                    </SideNavMenuItem>
                  );
                })
              : ""}
            <SideNavMenuItem
              isActive={props.sideNav === `create-new-contact`}
              onClick={() => {
                redirect(`/app/create-new-contact`);
                props.changeTab(`create-new-contact`);
              }}
            >
              Create new contact list
            </SideNavMenuItem>
          </SideNavMenu>
        </SideNavItems>
      </SideNav>
    </Fragment>
  );
}

const stateToProps = (state) => {
  return {
    connections: state.firestore.ordered.connections,
    contacts: state.firestore.ordered.contacts,
    sideNav: state.sideNav.activeTab,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    changeTab: (newTab) => {
      dispatch(changeNav(newTab));
    },
  };
};

export default connect(stateToProps, dispatchToProps)(SideBar);
