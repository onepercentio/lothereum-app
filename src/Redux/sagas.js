import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { FETCH_BALANCE, ERROR_FETCHING_BALANCE, FINISHED_FETCHING_BALANCE} from './account'
import Api from '../Api'

function* fetchBalance(action) {
   try {
      const address = yield select(state => state.account.address)
      const balance = yield call(Api.getBalance, address)
      yield put({type: FINISHED_FETCHING_BALANCE, balance})
   } catch (e) {
      yield put({type: ERROR_FETCHING_BALANCE, message: e.message})
   }
}

function* sagas() {
  yield all([ takeLatest(FETCH_BALANCE, fetchBalance) ])
}

export default sagas
