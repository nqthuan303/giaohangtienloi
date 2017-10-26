import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import {withRouter, matchPath} from 'react-router';
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'
import {Header, Sidebar} from '../../components'
import {CLOSE_SIDEBAR, OPEN_SIDEBAR, WINDOW_RESIZE} from '../../actions/layout'
import {LOGOUT_AUTH} from '../../actions/auth'
import {appRouting} from '../../routing'
import {
    PageLayout,
    MainLayout,
    MainContent,
    SidebarSemanticPusherStyled,
    SidebarSemanticPushableStyled,
    MainContainer,
    StyledDimmer
} from './style'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        location: PropTypes.object,
        history: PropTypes.object,
        sidebarOpened: PropTypes.bool,
        closeSidebar: PropTypes.func,
        isLoggedIn: PropTypes.bool,
        handleWindowResize: PropTypes.func,
        logout: PropTypes.func,
        checkAuthLogic: PropTypes.func,
        toggleSidebar: PropTypes.func,
        isMobile: PropTypes.bool,
        isMobileXS: PropTypes.bool,
        isMobileSM: PropTypes.bool
    }

    componentWillMount() {
        const {handleWindowResize, isLoggedIn} = this.props
        window.addEventListener('resize', handleWindowResize)
        this.checkAppAuthLogic(isLoggedIn)
    }

    componentWillReceiveProps(nextProps) {
        this.checkAppAuthLogic(nextProps.isLoggedIn)
    }

    checkAppAuthLogic(loggedIn) {
        const {location, checkAuthLogic} = this.props
        const path = location.pathname
        checkAuthLogic(path, loggedIn)
    }

    getSidebarRouting() {
        const sidebarRouting = appRouting.filter(a => a.sidebarVisible).map(a => {
            const {path, name, icon, external, strict, exact} = a
            const b = {path, name, icon, external, strict, exact}
            return b
        })
        return sidebarRouting
    }

    getPageTitle(pathname) {
        const matchedRoutes = appRouting.filter(a => matchPath(pathname, a))
        const currentRoute = matchedRoutes[0] || {}
        const title = currentRoute.name || '404'
        return title
    }

    render() {
        const {
            children,
            sidebarOpened,
            closeSidebar,
            isLoggedIn,
            logout,
            toggleSidebar,
            location,
            isMobile,
            apiLoading
        } = this.props

        // routing for sidebar menu
        const sidebarRouting = this.getSidebarRouting()
        const title = this.getPageTitle(location.pathname)

        const sidebarProps = {
            isMobile,
            logout,
            open: sidebarOpened,
            routing: sidebarRouting
        }

        const headerProps = {
            toggleSidebar,
            title,
            isLoggedIn,
            isMobile
        }

        const dimmerProps = {
            active: true,
            onClick: closeSidebar
        }

        const SidebarSemanticPusherStyledPatch =
            !isMobile && isLoggedIn ?
                SidebarSemanticPusherStyled.extend`max-width: calc(100% - 150px);` :
                SidebarSemanticPusherStyled;


        return (
            <PageLayout>

                <SidebarSemanticPushableStyled>
                    {isLoggedIn && <Sidebar {...sidebarProps} />}
                    <SidebarSemanticPusherStyledPatch>
                        <Header {...headerProps} />
                        <MainLayout>
                            <MainContent>
                                <MainContainer id="main-container">
                                    {children}
                                </MainContainer>
                            </MainContent>
                        </MainLayout>
                    </SidebarSemanticPusherStyledPatch>


                    <Dimmer style={{height: '100%'}} active={apiLoading}>
                        <Loader />
                    </Dimmer>

                    {isLoggedIn && sidebarOpened && <StyledDimmer {...dimmerProps} />}
                </SidebarSemanticPushableStyled>
                <ToastContainer
                    position="top-right"
                    type="default"
                    newestOnTop={true}
                    closeOnClick
                    pauseOnHover
                />
            </PageLayout>
        )
    }
}

function mapStateToProps(state) {
    const {sidebarOpened, isMobile, isMobileXS, isMobileSM} = state.layout;
    const {apiLoading} = state.common;

    return {
        sidebarOpened,
        apiLoading,
        isMobile,
        isMobileXS,
        isMobileSM,
        isLoggedIn: state.me.auth.loggedIn
    }
}

function mapDispatchToProps(dispatch) {
    let resizer
    return {
        closeSidebar: () => {
            dispatch(CLOSE_SIDEBAR())
        },
        logout: () => {
            dispatch(LOGOUT_AUTH())
        },
        toggleSidebar: () => {
            dispatch(OPEN_SIDEBAR())
        },
        checkAuthLogic: (path, isLoggedIn) => {
            const authPath = '/auth'
            const homePath = '/'
            if (isLoggedIn && path === authPath) {
                dispatch(push(homePath))
            }
        },
        handleWindowResize: () => {
            clearTimeout(resizer)
            resizer = setTimeout(() => dispatch(WINDOW_RESIZE()), 150)
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
