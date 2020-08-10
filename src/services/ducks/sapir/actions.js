import { SapirTypes } from "./types";

export const requestSapir = (data) => ({
  type: SapirTypes.REQUEST,
  payload: { data },
});

export const successSapir = (data) => ({
  type: SapirTypes.SUCCESS,
  payload: { data },
});

export const failureSapir = (error) => ({
  type: SapirTypes.FAILURE,
  payload: { error },
});
