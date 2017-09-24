import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Menu, Segment, Button} from 'semantic-ui-react'
import {get} from '../../../api/utils'
import {default as ShopListTable} from './ShopListTable';

class ClientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopList: [],
            selectedMenu: 'menu0'
        }
    }

    componentDidMount() {
        this.getShopList()
    }

    async getShopList() {
        const result = await get('/client/list')
        if (result.ok) {
            const data = result.data
            this.setState({shopList: data.data.items});
        }
    }

    onChangeMenu = (e, { name }) => {
        this.setState({selectedMenu: name});
    }

    render() {

        const {selectedMenu, shopList} = this.state;
        console.log(shopList);

        return (
            <div>
                <Menu attached='top' tabular>
                    <Menu.Item
                        active={selectedMenu === 'menu0'}
                        key={0} name='menu0'
                        onClick={this.onChangeMenu}>Danh sách</Menu.Item>

                    <Menu.Item
                        active={selectedMenu === 'menu1'}
                        key={1} name='menu1'
                        onClick={this.onChangeMenu}>Cần thanh toán</Menu.Item>

                    <Menu.Item
                        active={selectedMenu === 'menu2'}
                        key={2} name='menu2'
                        onClick={this.onChangeMenu}>Bảng kê</Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button content='Lịch sử lấy hàng' icon='right arrow' labelPosition='right'/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment attached='bottom'>
                    <ShopListTable data={shopList} />
                </Segment>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {errors} = state.me.auth
    return {
        errors
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList)
