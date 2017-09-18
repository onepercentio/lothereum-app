const initialState = {
    list: [],
    fetching: false,
    error: null
}

// Action constants
export const PUSH_TICKET = 'tickets/PUSH_TICKET'
export const FETCH_TICKETS = 'tickets/FETCH_TICKETS'
export const FINISHED_FETCHING_TICKETS = 'tickets/FINISHED_FETCHING_TICKETS'
export const ERROR_FETCHING_TICKETS = 'tickets/ERROR_FETCHING_TICKETS'
export const CLEAR_AND_FETCH_TICKETS = 'tickets/CLEAR_AND_FETCH_TICKETS'

// Action creators
export const pushTicket = ({ ticket }) => ({ type: PUSH_TICKET, ticket })
export const fetchTickets = () => ({ type: FETCH_TICKETS })
export const fetchResult = ({ list }) => ({ type: FINISHED_FETCHING_TICKETS, list })
export const fetchError = ({ error }) => ({ type: ERROR_FETCHING_TICKETS, error })
export const clearAndFetchTickets = _ => ({ type: CLEAR_AND_FETCH_TICKETS })

export const setTickets = fetchResult

// reducer
export default (state = initialState, action) => {
    switch(action.type) {
        case PUSH_TICKET:
            return { ...state, list: [...state.list, action.ticket]}
        case FETCH_TICKETS:
            return { ...state, fetching: true, error: null }
        case FINISHED_FETCHING_TICKETS:
            return { ...state, list: action.list, fetching: false, error: null }
        case ERROR_FETCHING_TICKETS:
            return { ...state, fetching: false, error: action.error }
        case CLEAR_AND_FETCH_TICKETS:
            return { ...state, list: state.list.filter(item => !item.processing), fetching: true, error: null }
        default:
            return state
    }
}

// selectors
export const getTicketsForLottery = (state, { lotteryId }) => state.list.filter(ticket => ticket.lotteryId === lotteryId )
