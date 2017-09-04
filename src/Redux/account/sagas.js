import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SET_INFO, FETCH_BALANCE,
  fetchBalance, fetchResult, fetchError
} from '../account'
import Api from '../../Api'

function* fetchBalanceSaga(action) {
  try {
    const address = yield select(state => state.account.address)
    const balance = yield call(Api.getBalance, { address })
    yield put(fetchResult({ balance }))
  } catch (e) {
    console.log(" ERROR: ", e)
    yield put(fetchError({ error: e.message }))
  }
}

function* updateBalanceSaga() {
  yield put(fetchBalance())
}

export default [
  takeLatest(FETCH_BALANCE, fetchBalanceSaga),
  takeLatest(SET_INFO, updateBalanceSaga)
]
