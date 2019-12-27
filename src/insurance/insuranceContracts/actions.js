import * as types from "./types";
import { actionTypes as resourceActions } from "redux-resource";

export const find = id => ({
  type: types.FIND,
  payload: { id }
});

export const fetchFiltered = params => ({
  type: types.FETCH_FILTERED,
  payload: { params }
});

export const createContract = params => ({
  type: types.CREATE,
  payload: { params },
  meta: {
    thunk: true
  }
});

export const activateContract = id => ({
  type: types.ACTIVATE,
  payload: { id },
  meta: {
    thunk: true
  }
});

export const activateSucceeded = params => ({
  type: types.ACTIVATE_SUCCEEDED,
  ...params
});

export const activateError = params => ({
  type: types.ACTIVATE_ERROR,
  ...params
});
