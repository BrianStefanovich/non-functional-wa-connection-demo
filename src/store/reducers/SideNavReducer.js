const initState = {
  activeTab: "dashboard",
};

const sideNavReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        activeTab: action.data,
      };
    default:
      return state;
  }
};

export default sideNavReducer;
