import { call, put, select, takeLatest } from 'redux-saga/effects'
import { 
  FETCH_TICKETS,
  fetchResult, fetchError
} from '../tickets'
import Api from '../../Api'

function* fetchTicketsSaga(action) {
  try {
    const { address, contractAddress } = yield select(state => ({
      address: state.account.address,
      contractAddress: state.lotteries.list[0].id
    }))
    const tickets = address ? yield call(Api.getTickets, {address, contractAddress}) : []
    yield put(fetchResult({ list: tickets }))
  } catch (e) {
    yield put(fetchError({ error: e.message }))
  }
}

export default [ 
  takeLatest(FETCH_TICKETS, fetchTicketsSaga)
]
