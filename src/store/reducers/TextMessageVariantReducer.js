const initState = {
  variants: [],
};

const textMessageVariantReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_TEXT_ACTIVE":
      return {
        ...state,
        variants: state.variants.map((elm, i) => {
          if (i === action.data) {
            return { ...elm, active: true };
          } else {
            return { ...elm, active: false };
          }
        }),
      };

    case "CREATE_TEXT":
      const tmp = state.variants.map((elm) => {
        return { ...elm, active: false };
      });
      return {
        ...state,
        variants: tmp.concat(action.data),
      };

    case "EDIT_TEXT":
      return {
        variants: state.variants.map((elm, i) => {
          if (i === action.data.index) {
            return {
              body: action.data.body,
              textState: action.data.textState,
              active: true,
            };
          } else {
            return elm;
          }
        }),
      };

    case "DELETE_TEXT":
      return {
        ...state,
        variants: state.variants.filter((elm, i) => i !== 0),
      };

    default:
      return {
        ...state,
      };

    case "DELETE_ALL_TEXT":
      return {
        ...state,
        variants: [],
      };
  }
};

export default textMessageVariantReducer;
