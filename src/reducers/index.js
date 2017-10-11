import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

import {layout} from './layout/'
import {common} from './common/'
import {auth} from './auth'

// Root reducer
export default combineReducers({
    layout,
    common,
    me: combineReducers({auth}),
    form: formReducer,
    routing: routerReducer
})
