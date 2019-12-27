import { put, call } from "redux-saga/effects";

import { activate } from "./sagas";
import * as actions from "./actions";
import * as api from "./api";

jest.mock("redux-saga");

describe("activate saga", () => {
  const subscription = 50;
  const gen = activate(actions.activateContract(subscription));
  const resp = {
    data: { success: true },
    payload: { success: true },
    meta: { thunk: true }
  };

  it("dispatches a clear action", () => {
    expect(gen.next(true).value).toEqual(call(api.activate, 50));
  });

  it("sends an activateSucceeded action", () => {
    expect(gen.next(resp).value).toEqual(put(actions.activateSucceeded(resp)));
  });

  it("should be done", () => {
    expect(gen.next().done).toEqual(true);
  });
});
