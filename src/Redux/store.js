import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { persistStore, autoRehydrate } from 'redux-persist'
import 'babel-polyfill'
import createSagaMiddleware from 'redux-saga'

// import reducers
import account from './account'
import lotteries from './lotteries'
import tickets from './tickets'
import newTicket from './newTicket'

// sagas
import sagas from './sagas'
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    account,
    lotteries,
    tickets,
    newTicket
})


const store = createStore(reducers,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas)
// persistStore(store)

export default store
