const initialState = {
    list: [{ id: 597364, prize: 48927349, date: 1504364400 }],
    fetching: false,
    error: null
}

// Action constants
export const FETCH_LOTTERIES = 'lotteries/FETCH_LOTTERIES'
export const FINISHED_FETCHING_LOTTERIES = 'lotteries/FINISHED_FETCHING_LOTTERIES'
export const ERROR_FETCHING_LOTTERIES = 'lotteries/ERROR_FETCHING_LOTTERIES'

// Action creators
export const fetchLotteries = () => ({
    type: FETCH_LOTTERIES
})

export const fetchResult = ({ list }) => ({
    type: FINISHED_FETCHING_LOTTERIES,
    list
})

export const fetchError = ({ error }) => ({
    type: ERROR_FETCHING_LOTTERIES,
    error
})

// reducer
export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOTTERIES:
            return { ...state, fetching: true, error: null }
        case FINISHED_FETCHING_LOTTERIES:
            return { ...state, list: action.list, fetching: false, error: null }
        case ERROR_FETCHING_LOTTERIES:
            return { ...state, fetching: false, error: action.error }
        default:
            return state
    }
}

// selectors
export const getNextLottery = (state) => state.list.length > 0 ? state.list[state.list.length - 1] : null