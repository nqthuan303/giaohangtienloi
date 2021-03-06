import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {ConnectedRouter as Router} from 'react-router-redux'
import {APPLICATION_INIT} from '../../../actions'
import {ThemeProvider} from 'styled-components'
import theme from '../../../styles/theme'

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object,
        history: PropTypes.object,
        routes: PropTypes.func
    }

    componentWillMount() {
        const {store} = this.props
        store.dispatch({type: APPLICATION_INIT})
    }

    authCheck = (path) => {
        const {store} = this.props
        const {loggedIn} = store.getState().me.auth
        const authPath = '/auth'
        const allowedToVisitPath = [authPath]

        if (loggedIn && path === authPath) {
            return false
        } else if (!loggedIn && !allowedToVisitPath.includes(path)) {
            return false
        }
        return true
    }

    render() {
        const {store, history, routes} = this.props;

        return (
            <Provider store={store}>
                <Router history={history}>
                    <ThemeProvider theme={theme}>
                        {routes(this.authCheck)}
                    </ThemeProvider>
                </Router>
            </Provider>
        )
    }
}
