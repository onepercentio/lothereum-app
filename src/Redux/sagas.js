import { all, put, select, takeLatest } from 'redux-saga/effects'

import { fetchLotteries } from './lotteries'
import { clearAndFetchTickets } from './tickets'
import { fetchBalance } from './account'

import accountSagas from './account/sagas'
import lotteriesSagas from './lotteries/sagas'
import ticketSagas from './tickets/sagas'
import newTicketSagas from './newTicket/sagas'

function* afterRehydrate() {
  yield put(fetchLotteries())
  yield put(clearAndFetchTickets())
  let address = yield select(state => state.account.address)
  if(address) yield put(fetchBalance())
}

function* sagas() {
  yield all([ 
    ...accountSagas,
    ...lotteriesSagas,
    ...ticketSagas,
    ...newTicketSagas,
    takeLatest('persist/REHYDRATE', afterRehydrate)
  ])
}

export default sagas
