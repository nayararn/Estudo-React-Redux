import { call, put } from "redux-saga/effects"; //generator
import api from "../../../providers/api";
import { success, failure } from "./actions";

export function* Request(action) {
  try {
    const response = yield call(api.get, "https://localhost:5000/integrador");

    if (response.data && response.data.length) {
      yield put(success(response.data));
    } else {
      yield put(failure(new Error("error")));
    }
  } catch (error) {
    yield put(failure(error));
  }
}
