const initState = {};

const toolTipReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_ACTIVE_TOOLTIP":
      return {
        ...state,
        id: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default fakeFireStoreReducer;
