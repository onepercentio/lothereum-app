import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  BUY_TICKET,
  transactionResult, transactionError
} from '../newTicket'
// import { setTickets } from '../tickets'
import { changeRoute } from '../router'
import Api from '../../Api'

function* buyTicketSaga(action) {
  try {
    const { address, privateKey } = yield select(state => state.account)
    yield call(Api.login, { address, password: privateKey })
    const { numbers, ticketPrice, contractAddress } = yield select(state => ({
        numbers: state.newTicket.numbers,
        ticketPrice: state.lotteries.list[0].ticketPrice,
        contractAddress: state.lotteries.list[0].id
    }))
    const transaction = yield call(Api.buyTicket, { address, numbers, ticketPrice, contractAddress })
    console.log("TRANSACTION ", transaction)
    // set tickets -> add new ticket if processed

    yield put(transactionResult({ result: transaction }))
    yield put(changeRoute({ route: 'home' }))
  } catch (e) {
    console.log(e)
    yield put(transactionError({ error: e.message }))
  }
}

export default [
  takeLatest(BUY_TICKET, buyTicketSaga)
]
