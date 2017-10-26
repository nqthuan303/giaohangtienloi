import React from 'react'
import {Tab} from 'semantic-ui-react'
import {default as ShopForm} from '../components/ShopForm';
import {default as OrderInfo} from './components/OrderInfo';
import {default as PriceInfo} from './components/PriceInfo';

import './styles.css'

const panes = [
    {menuItem: 'Thông tin Shop', render: () => <Tab.Pane><ShopForm /></Tab.Pane>},
    {menuItem: 'Đơn hàng', render: () => <Tab.Pane><OrderInfo /></Tab.Pane>},
    {menuItem: 'Gói cước', render: () => <Tab.Pane><PriceInfo /></Tab.Pane>},
    {menuItem: 'Bảng kê', render: () => <Tab.Pane>Bảng kê</Tab.Pane>},
]

class ShopInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Tab defaultActiveIndex={0} panes={panes}/>
        )
    }
}

export default ShopInfo
