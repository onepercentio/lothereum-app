const initialState = {
    lotteryId: 0,
    numbers: [],
    fetchingTransaction: false,
    result: null,
    error: null
}

// Action constants
export const CLEAR = 'newTicket/CLEAR'
export const SET_ID = 'newTicket/SET_ID'
export const SET_NUMBERS = 'newTicket/SET_NUMBERS'
export const BUY_TICKET = 'newTicket/BUY_TICKET'
export const TRANSACTION_RESULT = 'newTicket/TRANSACTION_RESULT'
export const TRANSACTION_ERROR = 'newTicket/TRANSACTION_ERROR'

// Action creators
export const clearForm = () => ({ type: CLEAR })
export const setTicketId = ({ id }) => ({ type: SET_ID, id })
export const setNumbers = ({ numbers }) => ({ type: SET_NUMBERS, numbers })
export const buyTicket = () => ({ type: BUY_TICKET })
export const transactionResult = ({ result }) => ({ type: TRANSACTION_RESULT, result })
export const transactionError = ({ error }) => ({ type: TRANSACTION_ERROR, error })

// reducer
export default (state = initialState, action) => {
    switch(action.type) {
        case CLEAR:
            return initialState
        case SET_ID:
            return { ...state, lotteryId: action.id }
        case SET_NUMBERS:
            return { ...state, numbers: action.numbers.sort((a,b) => a - b) }
        case BUY_TICKET:
            return { ...state, fetchingTransaction: true, result: null, error: null }
        case TRANSACTION_RESULT:
            return { ...state, result: action.result, error: null }
        case TRANSACTION_ERROR:
            return { ...state, result: null, error: action.error }
        default:
            return state
    }
}