import { all, put, select, takeLatest } from 'redux-saga/effects'

import { fetchLotteries } from './lotteries'
import { fetchTickets } from './tickets'
import { fetchBalance } from './account'

import accountSagas from './account/sagas'
import lotteriesSagas from './lotteries/sagas'
import ticketSagas from './tickets/sagas'

function* afterRehydrate() {
  yield put(fetchLotteries())
  yield put(fetchTickets())
  let address = yield select(state => state.account.address)
  if(address) yield put(fetchBalance())
}

function* sagas() {
  yield all([ 
    ...accountSagas,
    ...lotteriesSagas,
    ...ticketSagas,
    takeLatest('persist/REHYDRATE', afterRehydrate)
  ])
}

export default sagas
