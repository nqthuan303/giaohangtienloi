import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import {layout} from './layout/'
import {auth} from './auth'

// Root reducer
export default combineReducers({
  layout,
  me: combineReducers({auth}),
  form: formReducer,
  // entities: combineReducers({
  //   // posts,
  //   // users
  // }),
  routing: routerReducer
})
