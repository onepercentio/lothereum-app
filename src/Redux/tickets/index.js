const initialState = {
    list: [{ id: 13, lotteryId: 597364, numbers: [10, 20, 30, 40, 50, 60]}],
    fetching: false,
    error: null
}

// Action constants
export const FETCH_TICKETS = 'tickets/FETCH_TICKETS'
export const FINISHED_FETCHING_TICKETS = 'tickets/FINISHED_FETCHING_TICKETS'
export const ERROR_FETCHING_TICKETS = 'tickets/ERROR_FETCHING_TICKETS'

// Action creators
export const fetchLotteries = () => ({
    type: FETCH_TICKETS
})

export const fetchResult = ({ list }) => ({
    type: FINISHED_FETCHING_TICKETS,
    list
})

export const fetchError = ({ error }) => ({
    type: ERROR_FETCHING_TICKETS,
    error
})

// reducer
export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TICKETS:
            return { ...state, fetching: true, error: null }
        case FINISHED_FETCHING_TICKETS:
            return { ...state, list: action.list, fetching: false, error: null }
        case ERROR_FETCHING_TICKETS:
            return { ...state, fetching: false, error: action.error }
        default:
            return state
    }
}

// selectors
export const getTicketsForLottery = (state, { lotteryId }) => state.list.filter(ticket => ticket.lotteryId === lotteryId )