import { put, call } from "redux-saga/effects";
import { setRedirect } from "auth/actions";
import { authenticateUser } from "auth/sagas";
import { attInsuranceConfirm } from "app/routes";

export function* sprintInsuranceConfirmNavigate() {
  yield call(authenticateUser);
}

export function* attInsuranceConfirmNavigate({ subId, sku, insPlanId }) {
  yield put(setRedirect(attInsuranceConfirm(subId, sku, insPlanId)));
  yield call(authenticateUser);
}
