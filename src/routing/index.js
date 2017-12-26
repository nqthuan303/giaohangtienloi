import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {
    App,
    Login,
    HomePage,
    ShopList,
    AddShop,
    OrderList,
    AddOrder,
    PickupList,
    PickupHistory,
    DeliveryList,
    ShopInfo,
    AddDelivery,
    UpdateDelivery
} from '../containers';

import {RouteAuth} from '../components'
import {createBrowserHistory, createMemoryHistory} from 'history'

export const history = getHistory()

export const appRouting = [
    {
        path: '/',
        name: 'Home',
        exact: true,
        icon: 'home',
        sidebarVisible: true,
        tag: RouteAuth,
        component: HomePage
    },
    {
        path: '/shop',
        name: 'Shop',
        exact: true,
        icon: 'tasks',
        sidebarVisible: true,
        tag: RouteAuth,
        component: ShopList
    },
    {
        path: '/shop/add',
        name: 'Thêm shop',
        exact: true,
        sidebarVisible: false,
        tag: RouteAuth,
        component: AddShop
    },
    {
        path: '/shop/info/:shopId',
        name: 'Thông tin Shop',
        exact: true,
        sidebarVisible: false,
        tag: RouteAuth,
        component: ShopInfo
    },
    {
        path: '/order',
        name: 'Vận đơn',
        exact: true,
        icon: 'ordered list',
        sidebarVisible: true,
        tag: RouteAuth,
        component: OrderList
    },
    {
        path: '/order/add',
        name: 'Tạo vận đơn',
        exact: true,
        sidebarVisible: false,
        tag: RouteAuth,
        component: AddOrder
    },
    {
        path: '/order/edit/:id',
        name: 'Tạo vận đơn',
        exact: true,
        sidebarVisible: false,
        tag: RouteAuth,
        component: AddOrder
    },
    {
        path: '/pickup',
        name: 'Chuyến đi lấy',
        exact: true,
        icon: 'list ul',
        sidebarVisible: true,
        tag: RouteAuth,
        component: PickupList
    },
    {
        path: '/pickup/history',
        name: 'Lịch sử lấy hàng',
        exact: true,
        sidebarVisible: false,
        tag: RouteAuth,
        component: PickupHistory
    },
    {
        path: '/delivery',
        name: 'Chuyến đi giao',
        exact: true,
        icon: 'shipping',
        sidebarVisible: true,
        tag: RouteAuth,
        component: DeliveryList
    },
    {
        path: '/delivery/add',
        name: 'Tạo chuyến đi giao',
        exact: true,
        sidebarVisible: false,
        tag: RouteAuth,
        component: AddDelivery
    },
    {
        path: '/delivery/update/:deliveryId',
        name: 'Cập nhật chuyến đi giao',
        exact: true,
        sidebarVisible: false,
        tag: RouteAuth,
        component: UpdateDelivery
    },
    {
        path: '/auth',
        name: 'Auth',
        tag: Route,
        component: Login
    }
]


export const Routing = authCheck => {
    // remove components that aren't application routes, (e.g. github link in sidebar)
    const routes = appRouting.filter(
        a => a.tag || a.component || a.lazy || !a.external
    )
    // render components that are inside Switch (main view)
    const routesRendered = routes.map((a, i) => {
        // get tag for Route.
        // is it "RouteAuth" `protected route` or "Route"?
        const Tag = a.tag
        const {path, exact, strict, component, lazy} = a
        // can visitor access this route?

        const canAccess = authCheck
        // select only props that we need
        const b = {path, exact, strict, component, canAccess, lazy}
        return <Tag key={i} {...b} />
    })

    return (
        <App>
            <Switch>
                {routesRendered}
                <Redirect to="/"/>
            </Switch>
        </App>
    )
}

function getHistory() {
    const basename = process.env.BUILD_DEMO ? '/react-semantic.ui-starter' : ''
    if (process.env.BABEL_ENV === 'ssr') {
        return createMemoryHistory()
    }
    return createBrowserHistory({basename})
}
