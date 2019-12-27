import { put, call, takeLatest, takeEvery, all } from "redux-saga/effects";
import * as types from "./types";
import * as api from "./api";
import * as actions from "./actions";
import { setInsuranceContract as setSprintContract } from "subscriptions/sprint/actions";
import { setInsuranceContract as setAttContract } from "subscriptions/att/actions";
import * as actionsHelpers from "helpers/resourceSagas/actions";
import {
  findGenerator,
  getAllGenerator,
  updateGenerator
} from "helpers/resourceSagas";

export const find = findGenerator({
  resourceType: "insuranceContracts",
  endpoint: api.find
});

export const fetchFiltered = getAllGenerator({
  resourceType: "insuranceContracts",
  endpoint: api.fetchFiltered,
  endpointArgs: payload => [payload.params]
});

export const create = updateGenerator({
  resourceType: "insuranceContracts",
  endpoint: api.create,
  endpointArgs: payload => [payload.params]
});

export function* activate(action) {
  const { payload } = action;
  try {
    let resp = yield call(api.activate, payload.id);
    yield put(
      actions.activateSucceeded({
        meta: action.meta,
        payload: resp.data,
        data: resp.data
      })
    );
  } catch (err) {
    console.log("err", err);
    yield put(
      actions.activateError({
        meta: action.meta,
        payload: err,
        data: err
      })
    );
  }
}

export function* watchFind() {
  yield takeEvery(types.FIND, find);
}

export function* watchFetchFiltered() {
  yield takeLatest(types.FETCH_FILTERED, fetchFiltered);
}

export function* watchActivateContract() {
  yield takeLatest(types.ACTIVATE, activate);
}

export function* watchCreateContract() {
  yield takeLatest(types.CREATE, create);
}

export function* watchInsuranceContracts() {
  yield all([
    call(watchFind),
    call(watchFetchFiltered),
    call(watchCreateContract),
    call(watchActivateContract)
  ]);
}
