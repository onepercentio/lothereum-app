import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// import reducers
import account from './account'
import lotteries from './lotteries'
import tickets from './tickets'
import newTicket from './newTicket'

// sagas
import sagras from './sagas'

const reducers = combineReducers({
    account,
    lotteries,
    tickets,
    newTicket
})

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

// then run the saga
sagaMiddleware.run(sagras)

export default store
