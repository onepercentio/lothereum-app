import { all } from 'redux-saga/effects'

import accountSagas from './account/sagas'

function* sagas() {
  yield all([ 
    ...accountSagas
  ])
}

export default sagas
