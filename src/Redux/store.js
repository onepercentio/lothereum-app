import { createStore, combineReducers } from 'redux'

import account from './account'
import lotteries from './lotteries'
import tickets from './tickets'

const reducers = combineReducers({
    account,
    lotteries,
    tickets
})

const store = createStore(reducers)

export default store