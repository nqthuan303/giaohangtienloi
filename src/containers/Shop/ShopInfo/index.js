import React from 'react'
import {Tab} from 'semantic-ui-react'
import {default as GeneralInfo} from './components/GeneralInfo';
import {default as OrderInfo} from './components/OrderInfo';

const panes = [
    {menuItem: 'Thông tin Shop', render: () => <Tab.Pane><GeneralInfo/></Tab.Pane>},
    {menuItem: 'Đơn hàng', render: () => <Tab.Pane><OrderInfo/></Tab.Pane>},
    {menuItem: 'Gói cước', render: () => <Tab.Pane>Gói cước</Tab.Pane>},
    {menuItem: 'Bảng kê', render: () => <Tab.Pane>Bảng kê</Tab.Pane>},
]

class ShopInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Tab panes={panes}/>
        )
    }
}

export default ShopInfo
