import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from './Api'

function* fetchBalance(action) {
   try {
      const balance = yield call(Api.getBalance, action.address);
      yield put({type: "FINISHED_FETCHING_BALANCE", balance: balance});
   } catch (e) {
      yield put({type: "ERROR_FETCHING_BALANCE", message: e.message});
   }
}

function* sagas() {
  yield takeLatest("FETCH_BALANCE", fetchBalance);
}

export default sagas;
