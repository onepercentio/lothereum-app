import { put, call, select, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  BUY_TICKET
} from '../newTicket'
import {
  pushTicket,
  fetchResult
} from '../tickets'
// import { setTickets } from '../tickets'
import { changeRoute } from '../router'
import Api from '../../Api'

function* buyTicketSaga(action) {
  const { address, privateKey } = yield select(state => state.account)
  const { numbers, ticketPrice, contractAddress, lotteryId } = yield select(state => ({
      numbers: state.newTicket.numbers,
      ticketPrice: state.lotteries.list[0].ticketPrice,
      contractAddress: state.lotteries.list[0].id,
      lotteryId: state.lotteries.list[0].drawingCounter
  }))
  let succeeded = false
  yield put(pushTicket({ ticket: { numbers, lotteryId, processing: true }}))
  yield put(changeRoute({ route: 'home' }))
  while(!succeeded){
    try {
      // this is done async with no expected result
      yield call(() => Api.buyTicket({ address, privateKey, numbers, ticketPrice, contractAddress }))
      succeeded = true
      // set tickets -> add new ticket if processed
    } catch (e) {
      if(e.message.indexOf('50 blocks') !== -1 || e.message.indexOf('known transaction') !== -1 || e.message.indexOf('replacement') !== -1){
        succeeded = true
      } else {
        yield call(delay, 2000)
      }
    }
  }
  const tickets = yield call(Api.getTickets, {address, contractAddress})
  yield put(fetchResult({ list: tickets }))
}

export default [
  takeLatest(BUY_TICKET, buyTicketSaga)
]
