import React from 'react'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import rootReducer from './reducers'
import Root from './components/views/Root'
import {Routing, history} from './routing'
import 'semantic-ui-css/semantic.css'
import './styles/global'
import {render} from 'react-dom'

const configureStore = initialState => {
    let thunkApplied = applyMiddleware(thunk)
    let routerMiddlewareApplied = applyMiddleware(routerMiddleware(history))
    let enhancers

    if (process.env.NODE_ENV === 'development') {
        const {composeWithDevTools} = require('redux-devtools-extension')
        enhancers = composeWithDevTools(thunkApplied, routerMiddlewareApplied)
    } else {
        enhancers = compose(thunkApplied, routerMiddlewareApplied)
    }

    return createStore(rootReducer, initialState, enhancers)
}
const configureRootComponent = store => {
    const propsRoot = {
        routes: Routing,
        history,
        store
    }
    return <Root {...propsRoot} />
}

const preloadedState = window.__PRELOADED_STATE__ || {}
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)
const RootComponent = configureRootComponent(store)
render(RootComponent, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}


