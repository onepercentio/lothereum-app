import { call, put, takeLatest } from 'redux-saga/effects'
import {
  FETCH_LOTTERIES,
  fetchResult, fetchError
} from '../lotteries'
import Api from '../../Api'

function* fetchLotteriesSaga(action) {
  try {
    const lotteries = yield call(Api.getLotteries)
    yield put(fetchResult({ list: lotteries }))
  } catch (e) {
    console.log('ee ' + e)
    yield put(fetchError({ error: e.message }))
  }
}

export default [
  takeLatest(FETCH_LOTTERIES, fetchLotteriesSaga)
]
