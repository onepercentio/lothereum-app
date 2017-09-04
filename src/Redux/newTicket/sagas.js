import { call, put, select, takeLatest } from 'redux-saga/effects'
import { 
  BUY_TICKET,
  transactionResult, transactionError
} from '../newTicket'
import { changeRoute } from '../router'
import Api from '../../Api'

function* buyTicketSaga(action) {
  try {
    const address = yield select(state => state.account.address)
    const { numbers, lotteryId } = yield select(state => ({numbers: state.newTicket.numbers, lottery: state.newTicket.lotteryId}))
    const transaction = yield call(Api.buyTicket, { address, numbers, lotteryId })
    yield put(transactionResult({ result: transaction }))
    yield put(changeRoute({ route: 'home' }))
  } catch (e) {
    yield put(transactionError({ error: e.message }))
  }
}

export default [ 
  takeLatest(BUY_TICKET, buyTicketSaga)
]
