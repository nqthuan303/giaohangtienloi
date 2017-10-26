import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Table, Input, Button} from 'semantic-ui-react'
import {get, post} from '../../../api/utils'

export default class ClientOrderInModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            clientOrders: [],
            arrShowOrder: []
        }
    }

    static propTypes = {
        shipperId: PropTypes.string
    }

    componentDidMount() {
        this.getPickUpList();
    }

    async getPickUpList() {
        const {shipperId} = this.props;
        const result = await get('/pickup/findByShipper/' + shipperId);
        if (result.ok === true) {
            const data = result.data;
            this.setState({clientOrders: data.data})
        }
    }

    onClickRow(e, i) {
        let arrShowOrder = Object.assign([], this.state.arrShowOrder)
        arrShowOrder[i] = !this.state.arrShowOrder[i]

        this.setState({
            arrShowOrder: arrShowOrder
        })
    }

    onClickChangeStatus(orderId, statusValue) {
        let status;
        if (statusValue === 'preparePickup') {
            status = 'pickup';
        } else if (statusValue === 'pickup') {
            status = 'storage';
        }
        this.setStatus([orderId], status);
    }

    onClickSetStatusMultiOrder(orders, status) {
        console.log(orders);
        if (orders && orders.length > 0) {
            let orderIds = []
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i]
                orderIds.push(order._id);
            }
            if (orderIds.length > 0) {
                this.setStatus(orderIds, status)
            }
        }
    }

    async setStatus(orderIds, status) {
        this.setState({loading: true})
        const result = await post('/order/setStatus?status=' + status, orderIds);
        this.setState({loading: false})
        const data = result.data
        if (data.status === 'success') {
            this.getPickUpList()
        }
    }

    renderData() {
        const {clientOrders, arrShowOrder, loading} = this.state
        let result = []
        let count = 0
        for (let i = 0; i < clientOrders.length; i++) {
            const clientOrder = clientOrders[i]
            const client = clientOrder.client
            const clientDistrict = client.district

            const clientAddress = client.address + ', ' + clientDistrict.type + ' ' + clientDistrict.name
            const orders = clientOrder.orders
            count++;

            result.push(
                <Table.Row
                    key={count}
                    style={{cursor: 'pointer'}}>
                    <Table.Cell>({orders.length}) {client.name} <Icon name='delete'/></Table.Cell>
                    <Table.Cell onClick={(e) => this.onClickRow(e, i)}>{clientAddress}</Table.Cell>
                    <Table.Cell onClick={(e) => this.onClickRow(e, i)}>1.200.000</Table.Cell>
                    <Table.Cell style={{textAlign: 'right'}} colSpan='3'>
                        <Button
                            loading={loading}
                            onClick={() => this.onClickSetStatusMultiOrder(orders, 'storage')}>
                            Lưu kho
                        </Button>
                    </Table.Cell>
                </Table.Row>
            )
            if (orders && orders.length > 0 && (arrShowOrder[i] === true)) {
                for (let j = 0; j < orders.length; j++) {
                    const order = orders[j]
                    const sender = order.sender
                    const orderstatus = order.orderstatus;
                    const statusValue = orderstatus.value;
                    count++
                    result.push(
                        <Table.Row key={count}>
                            <Table.Cell style={{textAlign: 'right'}}>
                                {order.id}
                            </Table.Cell>
                            <Table.Cell className='border-left-none'>{sender.address}</Table.Cell>
                            <Table.Cell className='border-left-none'>625.000</Table.Cell>
                            <Table.Cell className='border-left-none'>{orderstatus.name}</Table.Cell>
                            <Table.Cell style={{textAlign: 'right'}} className='border-left-none'>
                                {statusValue === 'preparePickup' ?
                                    <Button
                                        loading={loading}
                                        onClick={() => this.onClickChangeStatus(order._id, statusValue)}>
                                        Lấy hàng
                                    </Button> : null}
                                {statusValue === 'pickup' ?
                                    <Button
                                        loading={loading}
                                        onClick={() => this.onClickChangeStatus(order._id, statusValue)}>
                                        Lưu kho
                                    </Button> : null}
                            </Table.Cell>
                        </Table.Row>
                    )
                }
            }
        }
        return result
    }

    render() {
        return (
            <div>
                <Table celled compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{textAlign: 'right'}} colSpan='5'>
                                <Input placeholder='Mã VD'/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderData()}
                    </Table.Body>
                </Table>
            </div>

        )
    }
}
