const initialState = {
    address: '',
    privateKey: '',
    balance: 0,
    fetching: false,
    error: null
}

// Action constants
export const SET_INFO = 'account/SET_INFO'
export const CLEAR_INFO = 'account/CLEAR_INFO'
export const FETCH_BALANCE = 'account/FETCH_BALANCE'
export const FINISHED_FETCHING_BALANCE = 'account/FINISHED_FETCHING_BALANCE'
export const ERROR_FETCHING_BALANCE = 'account/ERROR_FETCHING_BALANCE'

// Action creators
export const setInfo = ({ address, privateKey }) => ({ type: SET_INFO, address, privateKey})
export const clearInfo = _ => ({ type: CLEAR_INFO })
export const fetchBalance = _ => ({ type: FETCH_BALANCE })
export const fetchResult = ({ balance }) => ({ type: FINISHED_FETCHING_BALANCE, balance })
export const fetchError = ({ error }) => ({ type: ERROR_FETCHING_BALANCE, error })

// reducer
export default ( state = initialState, action ) => {
    console.log(action.type)
    switch(action.type){
        case SET_INFO:
            return { ...state, address: action.address, privateKey: action.privateKey }
        case CLEAR_INFO:
            return initialState
        case FETCH_BALANCE:
            return { ...state, fetching: true, error: null }
        case FINISHED_FETCHING_BALANCE:
            return { ...state, balance: action.balance, fetching: false }
        case ERROR_FETCHING_BALANCE:
            return { ...state, fetching: false, error: action.error }
        default:
            return state
    }
}
