import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Table, Menu} from 'semantic-ui-react'
import OrderModal from './OrderModal'
import {ConfirmModal} from '../../../components'
import {del, get} from '../../../api/utils'
import {toast} from 'react-toastify'

export default class OrderTableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderModal: false,
            clickedId: '',
            orders: [],
            confirmModal: false
        }
    }

    static propTypes = {
        options: PropTypes.object.isRequired,
        onOrderDeleted: PropTypes.func.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options !== this.props.options) {
            this.getOrderList(nextProps.options)
        }
    }

    componentDidMount() {
        this.getOrderList()
    }

    showOrderModal = () => {
        this.setState({
            orderModal: !this.state.orderModal
        })
    }

    showDeleteModal(id) {
        // const {confirmModal} = this.state

        this.setState({
            clickedId: id,
            confirmModal: true
        })
    }

    confirmDeleteOrder = () => {
        const {clickedId} = this.state
        const {options, onOrderDeleted} = this.props
        this.setState({confirmLoading: true})

        del('/order/delete/' + clickedId).then((result) => {
            const data = result.data.data
            const status = result.data.status
            if (status === 'success') {
                toast.success(data.message)
                this.setState({
                    confirmModal: false,
                    confirmLoading: false
                })
                onOrderDeleted()
                this.getOrderList(options)
            } else {
                toast.error('Error!')
            }
        })
    }

    getOrderList(options) {
        const url = this.buildUrl('/order/list', options)
        get(url).then((result) => {
            this.setState({orders: result.data.data})
        })
    }

    buildUrl(url, options) {
        if (options) {
            for (let key in options) {
                if (url.includes('?')) {
                    url += '&' + key + '=' + options[key]
                } else {
                    url += '?' + key + '=' + options[key]
                }
            }
        }
        return url
    }

    onModalClose = (value) => {
        this.setState({confirmModal: value})
    }

    renderList() {
        const {orders} = this.state

        return orders.map((item, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>September 14, 2013</Table.Cell>
                    <Table.Cell>{item.client.name}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                    <Table.Cell>{item.reciever_phone}</Table.Cell>
                    <Table.Cell>No</Table.Cell>
                    <Table.Cell>{item.orderstatus.name}</Table.Cell>
                    <Table.Cell>
                        <Icon
                            onClick={this.showOrderModal}
                            style={{cursor: 'pointer'}} name='eye'/>
                        <Icon name='edit'/>
                        <Icon
                            style={{cursor: 'pointer'}}
                            onClick={() => this.showDeleteModal(item._id)} name='delete'/>
                        <Icon name='print'/>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    render() {
        const {confirmModal, confirmLoading} = this.state

        return (
            <div>
                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Mã VĐ</Table.HeaderCell>
                            <Table.HeaderCell>Ngày tạo</Table.HeaderCell>
                            <Table.HeaderCell>Shop</Table.HeaderCell>
                            <Table.HeaderCell>Địa chỉ nhận</Table.HeaderCell>
                            <Table.HeaderCell>Số ĐT</Table.HeaderCell>
                            <Table.HeaderCell>Thu tiền</Table.HeaderCell>
                            <Table.HeaderCell>Trạng thái</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderList()}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='10'>
                                <Menu size="mini" floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='left chevron'/>
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='right chevron'/>
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <OrderModal
                    onModalClose={this.showOrderModal}
                    show={this.state.orderModal}/>
                <ConfirmModal
                    onModalClose={this.onModalClose}
                    loading={confirmLoading}
                    onConfirm={this.confirmDeleteOrder}
                    title="Xóa vận đơn"
                    content="Bạn có chắc không??"
                    show={confirmModal}/>
            </div>

        )
    }
}
