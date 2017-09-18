import { call, put, select, takeLatest } from 'redux-saga/effects'
import { 
  FETCH_TICKETS, CLEAR_AND_FETCH_TICKETS,
  fetchTickets, fetchResult, fetchError
} from '../tickets'
import { CHANGE_ROUTE } from '../router'
import Api from '../../Api'

function* fetchTicketsSaga(action) {
  try {
    const { address, contractAddress, currentTickets } = yield select(state => ({
      address: state.account.address,
      contractAddress: state.lotteries.list[0].id,
      currentTickets: state.tickets.list.filter(ticket => ticket.processing === true)
    }))
    const tickets = address ? yield call(Api.getTickets, {address, contractAddress}) : []
    yield put(fetchResult({ list: [...tickets, ...currentTickets] }))
  } catch (e) {
    yield put(fetchError({ error: e.message }))
  }
}

function* clearAndFetchTicketsSaga(action) {
  try {
    const { address, contractAddress } = yield select(state => ({
      address: state.account.address,
      contractAddress: state.lotteries.list[0].id,
      currentTickets: state.tickets.list.filter(ticket => ticket.processing === true)
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
  takeLatest(CLEAR_AND_FETCH_TICKETS, clearAndFetchTicketsSaga),
  takeLatest(CHANGE_ROUTE, fetchTicketsWhenRoute)
]
