import { CombinedState, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { Action } from "@reduxjs/toolkit";
import authReducer, {authSliceName, AuthState} from '../features/authSlice'
export const actionResetPersist = "logout-bye"
const appReducer = combineReducers({
  [authSliceName]: authReducer
})

const rootReducer = (state: CombinedState<{ [authSliceName]: AuthState; }> | undefined, action: Action) => {
  if (action.type === actionResetPersist) {
      // for all keys defined in your persistConfig(s)
      storage.removeItem('persist:root')
      // storage.removeItem('persist:otherKey')

      return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
