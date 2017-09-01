import { createStore, combineReducers } from 'redux'

import account from './account'
import lotteries from './lotteries'
import tickets from './tickets'
import newTicket from './newTicket'

const reducers = combineReducers({
    account,
    lotteries,
    tickets,
    newTicket
})

const store = createStore(reducers)

export default store