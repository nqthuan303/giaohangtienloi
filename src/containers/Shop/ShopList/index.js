import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Segment, Button} from 'semantic-ui-react'
import {get, del} from '../../../api/utils'
import {default as ShopListTable} from './ShopListTable';
import {ConfirmModal} from '../../../components';
import {toast} from 'react-toastify';
import {Goto} from '../../../components'

class ClientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmLoading: false,
            shopList: [],
            confirmModal: false,
            selectedMenu: 'menu0'
        }
        this.selectedItem = {};
    }

    componentDidMount() {
        this.getShopList()
    }

    async getShopList() {
        const result = await get('/client/list');

        if (result.ok) {
            const data = result.data;
            this.setState({shopList: data.data});
        }
    }

    onChangeMenu = (e, {name}) => {
        this.setState({selectedMenu: name});
    }

    showConfirmModal = (value) => {
        this.selectedItem = value;
        this.setState({confirmModal: true});
    }

    onModalClose = () => {
        this.setState({confirmModal: false});
    }

    onConfirm = async () => {
        const result = await del('/client/delete/' + this.selectedItem.id);
        this.setState({confirmModal: false});

        if (result.ok) {
            toast.success('Xóa shop thành công!');
            let {shopList} = this.state;
            delete shopList[this.selectedItem['index']];
            this.setState({shopList});
        } else {
            toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    }

    render() {

        const {selectedMenu, shopList, confirmLoading, confirmModal} = this.state;

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
                            <Goto text="Thêm shop" url="/shop/add" />
                            {/*<Button onClick={this.clickAddShop} content='Thêm shop' icon='right arrow'*/}
                                    {/*labelPosition='right'/>*/}
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment attached='bottom'>
                    <ShopListTable
                        onClickDelete={this.showConfirmModal}
                        data={shopList}/>
                </Segment>

                <ConfirmModal
                    onModalClose={this.onModalClose}
                    loading={confirmLoading}
                    onConfirm={this.onConfirm}
                    title="Xóa Shop?"
                    content="Bạn có chắc không??"
                    show={confirmModal}/>
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
