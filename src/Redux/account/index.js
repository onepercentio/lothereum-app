const initialState = {
    address: '',
    privateKey: '',
    destinationAddress: '',
    balance: 0,
    fetching: false,
    error: null
}

// Action constants
export const SET_INFO = 'account/SET_INFO'
export const SET_DESTINATION_ADDRESS = 'account/SET_DESTINATION_ADDRESS'
export const CLEAR_INFO = 'account/CLEAR_INFO'
export const FETCH_BALANCE = 'account/FETCH_BALANCE'
export const FINISHED_FETCHING_BALANCE = 'account/FINISHED_FETCHING_BALANCE'
export const ERROR_FETCHING_BALANCE = 'account/ERROR_FETCHING_BALANCE'
export const CREATE_RANDOM = 'account/CREATE_RANDOM'

// Action creators
export const setInfo = ({ address, privateKey }) => ({ type: SET_INFO, address, privateKey})
export const setDestination = ({ destinationAddress }) => ({ type: SET_DESTINATION_ADDRESS, destinationAddress })
export const clearInfo = _ => ({ type: CLEAR_INFO })
export const fetchBalance = _ => ({ type: FETCH_BALANCE })
export const fetchResult = ({ balance }) => ({ type: FINISHED_FETCHING_BALANCE, balance })
export const fetchError = ({ error }) => ({ type: ERROR_FETCHING_BALANCE, error })
export const createRandom = _ => ({ type: CREATE_RANDOM })

// reducer
export default ( state = initialState, action ) => {
    switch(action.type){
        case SET_INFO:
            return { ...state, address: action.address, privateKey: action.privateKey }
        case SET_DESTINATION_ADDRESS:
            return { ...state, destinationAddress: action.destinationAddress }
        case CLEAR_INFO:
            return initialState
        case FETCH_BALANCE:
            return { ...state, fetching: true, error: null }
        case FINISHED_FETCHING_BALANCE:
            return { ...state, balance: action.balance, fetching: false }
        case ERROR_FETCHING_BALANCE:
            return { ...state, fetching: false, error: action.error }
        case CREATE_RANDOM:
            return state
        default:
            return state
    }
}
