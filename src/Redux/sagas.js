import { all, put, select, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { fetchLotteries } from './lotteries'
import { clearAndFetchTickets } from './tickets'
import { fetchBalance, createRandom } from './account'

import accountSagas from './account/sagas'
import lotteriesSagas from './lotteries/sagas'
import ticketSagas from './tickets/sagas'
import newTicketSagas from './newTicket/sagas'

function* afterRehydrate() {
  while(window.web3js === null){
      yield delay(300)
  }
  yield put(fetchLotteries())
  yield put(clearAndFetchTickets())
  yield put(createRandom())
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
