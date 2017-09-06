import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  BUY_TICKET,
  transactionError
} from '../newTicket'
import {
  pushTicket
} from '../tickets'
// import { setTickets } from '../tickets'
import { changeRoute } from '../router'
import Api from '../../Api'

function* buyTicketSaga(action) {
  try {
    const { address, privateKey } = yield select(state => state.account)
    yield call(Api.login, { address, password: privateKey })
    const { numbers, ticketPrice, contractAddress, lotteryId } = yield select(state => ({
        numbers: state.newTicket.numbers,
        ticketPrice: state.lotteries.list[0].ticketPrice,
        contractAddress: state.lotteries.list[0].id,
        lotteryId: state.lotteries.list[0].drawingCounter
    }))
    // this is done async with no expected result
    Api.buyTicket({ address, numbers, ticketPrice, contractAddress })

    // set tickets -> add new ticket if processed
    yield put(pushTicket({ ticket: { numbers, lotteryId, processing: true }}))
    yield put(changeRoute({ route: 'home' }))
  } catch (e) {
    console.log(e)
    yield put(transactionError({ error: e.message }))
  }
}

export default [
  takeLatest(BUY_TICKET, buyTicketSaga)
]
