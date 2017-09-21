import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Table, Menu, Input, Button} from 'semantic-ui-react'
import { get, post } from '../../../api/utils'

export default class ClientOrderInModal extends Component {
  constructor (props) {
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

  componentDidMount () {
    this.getPickUpList()
  }

  getPickUpList () {
    const {shipperId} = this.props
    get('/pickup/findByShipper/' + shipperId).then((result) => {
      if (result.ok === true) {
        const data = result.data
        this.setState({clientOrders: data.data})
      }
    })
  }

  onClickRow (e, i) {
    let arrShowOrder = Object.assign([], this.state.arrShowOrder)
    arrShowOrder[i] = !this.state.arrShowOrder[i]

    this.setState({
      arrShowOrder: arrShowOrder
    })
  }

  onClickChangeStatus (orderId, statusValue) {
    if (statusValue === 'receiving') {
      this.setStatus([orderId])
    }
  }

  onClickSetStatusMultiOrder (orders) {
    if (orders && orders.length > 0) {
      let orderIds = []
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i]
        const orderstatus = order.orderstatus
        const statusValue = orderstatus.value
        if (statusValue === 'receiving') {
          orderIds.push(order._id)
        }
      }
      if (orderIds.length > 0) {
        this.setStatus(orderIds)
      }
    }
  }

  setStatus (orderIds) {
    this.setState({loading: true})
    post('/order/setStatus?status=storage', orderIds).then((result) => {
      this.setState({loading: false})
      const data = result.data
      if (data.status === 'success') {
        this.getPickUpList()
      }
    })
  }

  renderData () {
    const {clientOrders, arrShowOrder, loading} = this.state
    let result = []
    let count = 0
    for (let i = 0; i < clientOrders.length; i++) {
      const clientOrder = clientOrders[i]
      const client = clientOrder.client
      const clientDistrict = client.district

      const clientAddress = client.address + ', ' + clientDistrict.type + ' ' + clientDistrict.name
      const orders = clientOrder.orders
      count++

      result.push(
        <Table.Row
          key={count}
          style={{cursor: 'pointer'}}>
          <Table.Cell>({orders.length}) {client.name} <Icon name='delete' /></Table.Cell>
          <Table.Cell onClick={(e) => this.onClickRow(e, i)}>{clientAddress}</Table.Cell>
          <Table.Cell onClick={(e) => this.onClickRow(e, i)}>1.200.000</Table.Cell>
          <Table.Cell style={{textAlign: 'right'}} colSpan='3'>
            <Button
              loading={loading}
              onClick={() => this.onClickSetStatusMultiOrder(orders)}>
              Lưu kho
            </Button>
          </Table.Cell>
        </Table.Row>
      )
      if (orders && orders.length > 0 && (arrShowOrder[i] === true)) {
        for (let j = 0; j < orders.length; j++) {
          const order = orders[j]
          const sender = order.sender
          const orderstatus = order.orderstatus
          const statusValue = orderstatus.value
          count++
          result.push(
            <Table.Row key={count}>
              <Table.Cell style={{textAlign: 'right'}}>
                {order.id}
              </Table.Cell>
              <Table.Cell className='border-left-none'>{sender.address}</Table.Cell>
              <Table.Cell className='border-left-none'>625.000</Table.Cell>
              <Table.Cell className='border-left-none'>Sửa</Table.Cell>
              <Table.Cell style={{textAlign: 'right'}} className='border-left-none'>
                <Button
                  loading={loading}
                  onClick={() => this.onClickChangeStatus(order._id, statusValue)}>
                  {orderstatus.name}
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        }
      }
    }
    return result
  }
  render () {
    return (
      <div>
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{textAlign: 'right'}} colSpan='5'>
                <Input placeholder='Mã VD' />
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
