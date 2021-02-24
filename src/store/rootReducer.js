import { combineReducers } from "redux";
import fakeFirebaseReducer from "./reducers/FakeFirebaseReducer";
import fakeFireStoreReducer from "./reducers/FakeFireStoreReducer";
import textMessageVariantReducer from "./reducers/TextMessageVariantReducer";
import mediaMessageVariantReducer from "./reducers/MediaMessageVariantReducer";
import sideNavReducer from "./reducers/SideNavReducer";

const rootReducer = combineReducers({
  firebase: fakeFirebaseReducer,
  firestore: fakeFireStoreReducer,
  sideNav: sideNavReducer,
  textMessageVariants: textMessageVariantReducer,
  mediaMessageVariants: mediaMessageVariantReducer,
});

export default rootReducer;
