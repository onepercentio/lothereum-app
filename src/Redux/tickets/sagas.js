import { call, put, select, takeLatest } from 'redux-saga/effects'
import { 
  FETCH_TICKETS,
  fetchTickets, fetchResult, fetchError
} from '../tickets'
import { CHANGE_ROUTE } from '../router'
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

function* fetchTicketsWhenRoute(action) {
  if(action.route === 'home') yield put(fetchTickets())
}

export default [ 
  takeLatest(FETCH_TICKETS, fetchTicketsSaga),
  takeLatest(CHANGE_ROUTE, fetchTicketsWhenRoute)
]
