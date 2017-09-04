import { call, put, select, takeLatest } from 'redux-saga/effects'
import { 
  FETCH_TICKETS,
  fetchResult, fetchError
} from '../tickets'
import Api from '../../Api'

function* fetchTicketsSaga(action) {
  try {
    const address = yield select(state => state.account.address)
    const tickets = address ? yield call(Api.getTickets, {address}) : []
    yield put(fetchResult({ list: tickets }))
  } catch (e) {
    yield put(fetchError({ error: e.message }))
  }
}

export default [ 
  takeLatest(FETCH_TICKETS, fetchTicketsSaga)
]
