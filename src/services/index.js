import { combineReducers } from "redux";
import { SapirReducer } from "./ducks/sapir";

export const reducers = combineReducers({
  sapir: SapirReducer,
});

export { root } from "./sagas";
