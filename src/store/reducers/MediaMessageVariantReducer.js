const initState = {
  variants: [],
};

const mediaMessageVariantReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_MEDIA_TEXT_ACTIVE":
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

    case "SET_MEDIA_PATH":
      return {
        ...state,
        mediaPath: action.data,
      };

    case "SET_MEDIA_TYPE":
      return {
        ...state,
        mediaType: action.data,
      };

    case "CREATE_MEDIA_TEXT":
      const tmp = state.variants.map((elm) => {
        return { ...elm, active: false };
      });
      return {
        ...state,
        variants: tmp.concat(action.data),
      };

    case "EDIT_MEDIA_TEXT":
      return {
        ...state,
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

    case "DELETE_MEDIA_TEXT":
      return {
        ...state,
        variants: state.variants.filter((elm, i) => i !== 0),
      };

    default:
      return {
        ...state,
      };

    case "DELETE_ALL_MEDIA_TEXT":
      return {
        ...state,
        variants: [],
      };
  }
};

export default mediaMessageVariantReducer;
