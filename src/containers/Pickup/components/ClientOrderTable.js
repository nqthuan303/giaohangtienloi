import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Table, Select, Button, Input} from 'semantic-ui-react'
import { get, post } from '../../../api/utils'
import { toast } from 'react-toastify'

import {ConfirmModal} from '../../../components'

export default class ClientOrderTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      arrShowOrder: [],
      shippers: [],
      clients: [],
      selectedData: {},
      confirmLoading: false,
      cancelOrderModal: false,
      cancelOrderIds: []
    }
  }

  static propTypes = {
    districtId: PropTypes.string,
    onOrderChange: PropTypes.func
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.districtId !== this.props.districtId) {
      this.getOrdersEachClient({districtId: nextProps.districtId})
    }
  }

  componentDidMount () {
    this.getShipperList()
    this.getOrdersEachClient()
  }

  getOrdersEachClient (options) {
    const url = this.buildUrl('/client/orders-each-client', options)

    get(url).then((result) => {
      const code = result.data.code
      if (code === 0) {
        const data = result.data.data
        const arrShowOrder = new Array(data.length).fill(false)
        this.setState({
          clients: data,
          arrShowOrder: arrShowOrder
        })
      }
    })
  }

  buildUrl (url, options) {
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

  getShipperList () {
    get('/user/getShipper').then((result) => {
      let data = result.data
      data.unshift({key: -1, value: -1, text: 'Chọn shipper'})
      this.setState({
        shippers: result.data
      })
    })
  }

  onClickRow (e, i) {
    let arrShowOrder = Object.assign([], this.state.arrShowOrder)
    arrShowOrder[i] = !this.state.arrShowOrder[i]

    this.setState({
      arrShowOrder: arrShowOrder
    })
  }

  onSelectShipper = (clientIndex, value) => {
    const {clients} = this.state
    let selectedData = this.state.selectedData

    const client = clients[clientIndex]
    const orders = client.orders
    let orderIds = []

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      orderIds.push(order._id)
    }
    selectedData[clientIndex] = {user: value, orders: orderIds, client: client._id}

    this.setState({
      selectedData: selectedData
    })
  }

  async hangdleAddPickup (selectedShipper) {
    const savePickup = await post('/pickup/add', selectedShipper)

    if (savePickup.ok === true) {
      toast.success('Tạo chuyến đi giao thành công!!!')
      this.getOrdersEachClient()
      this.props.onOrderChange()
    }
  }

  showCancelOrderModal (orders) {
    let orderIds = []
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      orderIds.push(order._id)
    }
    this.setState({
      cancelOrderModal: true,
      cancelOrderIds: orderIds
    })
  }

  async confirmCancelOrder () {
    const {cancelOrderIds} = this.state
    this.setState({confirmLoading: true})

    const setCancel = await post('/order/setStatus?status=cancel', cancelOrderIds)
    if (setCancel.ok === true) {
      this.setState({
        confirmLoading: false,
        cancelOrderModal: false
      })
      toast.success('Hủy đơn hàng thành công!!!')
      this.getOrdersEachClient()
      this.props.onOrderChange()
    }
  }

  onChangeCancelReason = (event) => {
    const value = event.target.value
    console.log(value)
  }

  onModalClose = (value) => {
    this.setState({cancelOrderModal: value})
  }

  renderClient () {
    const {arrShowOrder, shippers, clients, selectedData} = this.state
    let result = []
    let count = 0
    for (let i = 0; i < clients.length; i++) {
      const selectedShipper = selectedData[i]
      const client = clients[i]
      const orders = client.orders

      if (orders.length === 0) {
        continue
      }

      const createdAt = new Date(client.createdAt)
      const clientCreatedAt = createdAt.getDate() + '/' +
        createdAt.getMonth() + ' ' +
        createdAt.getHours() + ':' +
        createdAt.getMinutes()
      count++

      const clientDistrict = client.district
      const clientAddress = client.address + ', ' + clientDistrict.type + ' ' + clientDistrict.name

      result.push(
        <Table.Row
          key={count}
          style={{cursor: 'pointer'}}>
          <Table.Cell onClick={(e) => this.onClickRow(e, i)}>{clientCreatedAt}</Table.Cell>
          <Table.Cell>
            {client.name + ' (' + orders.length + ')'}
            <Icon
              onClick={() => this.showCancelOrderModal(orders)}
              style={{cursor: 'pointer'}}
              name='delete'
            />
          </Table.Cell>
          <Table.Cell onClick={(e) => this.onClickRow(e, i)}>{clientAddress}</Table.Cell>
          <Table.Cell onClick={(e) => this.onClickRow(e, i)}>1.200.000</Table.Cell>
          <Table.Cell><Icon name='print' /></Table.Cell>
          <Table.Cell>
            <Select
              value={selectedShipper ? selectedShipper.user : -1}
              onChange={(e, {name, value}) => this.onSelectShipper(i, value)}
              options={shippers} />
            {(selectedShipper && selectedShipper.user !== -1)
              ? <Button
                onClick={() => this.hangdleAddPickup(selectedShipper)}
                content="Ok"
                style={{marginLeft: '5px'}}
                size='medium'
              /> : ''}
          </Table.Cell>
        </Table.Row>
      )
      if (orders && orders.length > 0 && (arrShowOrder[i] === true)) {
        for (let j = 0; j < orders.length; j++) {
          const order = orders[j]
          count++

          result.push(
            <Table.Row key={count}>
              <Table.Cell colSpan='2' style={{textAlign: 'right'}}>
                {order.id}
                <Icon
                  onClick={() => this.showCancelOrderModal([{_id: order._id}])}
                  style={{cursor: 'pointer'}}
                  name='delete' />
              </Table.Cell>
              <Table.Cell className='border-left-none'>{order.sender.address}</Table.Cell>
              <Table.Cell className='border-left-none'>625.000</Table.Cell>
              <Table.Cell className='border-left-none'>Sửa</Table.Cell>
              <Table.Cell className='border-left-none'>xxx</Table.Cell>
            </Table.Row>
          )
        }
      }
    }
    if (result.length === 0) {
      result.push(
        <Table.Row key={0}>
          <Table.Cell>Không có dữ liệu!</Table.Cell>
        </Table.Row>
      )
    }
    return result
  }
  render () {
    const {confirmLoading, cancelOrderModal} = this.state

    const confirmContent = <Input
      style={{width: '100%'}}
      onChange={this.onChangeCancelReason}
      placeholder='Lý ho hủy' />
    return (
      <div>
        <Table celled compact>
          <Table.Body>
            {this.renderClient()}
          </Table.Body>
        </Table>
        <ConfirmModal
          onModalClose={this.onModalClose}
          loading={confirmLoading}
          onConfirm={() => this.confirmCancelOrder()}
          title="Hủy vận đơn"
          content={confirmContent}
          show={cancelOrderModal} />
      </div>

    )
  }
}
