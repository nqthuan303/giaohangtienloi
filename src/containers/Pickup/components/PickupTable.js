import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Table} from 'semantic-ui-react'
import { get, post } from '../../../api/utils'
import {ConfirmModal} from '../../../components'
import { toast } from 'react-toastify'
import PickupDetailModal from './PickupDetailModal'

var pickUpId = ''
var orderIds = []

export default class PickupTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmLoading: false,
      confirmModal: false,
      pickUpsOfShipper: {},
      pickupDetailModal: false,
      shipperId: null,
      shipperName: '',
      arrShowOrder: []
    }
  }

  static propTypes = {
    onDeletePickupSuccess: PropTypes.func
  }

  componentDidMount () {
    this.getPickUpList()
  }

  getPickUpList () {
    get('/pickup/list').then((result) => {
      if (result.ok === true) {
        const data = result.data
        this.setState({pickUpsOfShipper: data.data})
      }
    })
  }

  onModalClose = (value) => {
    this.setState({confirmModal: value})
  }

  onClickDeletePickup (id, orders) {
    const {confirmModal} = this.state
    orderIds = []
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      orderIds.push(order._id)
    }
    pickUpId = id
    this.setState({
      confirmModal: !confirmModal
    })
  }

  confirmDeletePickup = () => {
    this.setState({confirmLoading: true})
    const {confirmModal} = this.state
    const {onDeletePickupSuccess} = this.props

    post('/pickup/delete/' + pickUpId, orderIds).then((result) => {
      const data = result.data
      const status = data.status

      if (status === 'success') {
        onDeletePickupSuccess()
        this.getPickUpList()
        toast.success(data.data.message)
        this.setState({
          confirmModal: !confirmModal,
          confirmLoading: false
        })
      } else {
        toast.error('Error!')
      }
    })
  }

  onClickShipper (shipperId, shipperName) {
    this.setState({
      shipperId: shipperId,
      shipperName: shipperName
    })
    this.onShowPickupDetailModal()
  }

  renderData () {
    const {pickUpsOfShipper} = this.state
    let result = []
    let count = 0
    for (const shipperId in pickUpsOfShipper) {
      const shipperData = pickUpsOfShipper[shipperId]
      const pickUps = shipperData.pickUps
      for (let i = 0; i < pickUps.length; i++) {
        count++
        const pickUp = pickUps[i]

        const createdAt = new Date(pickUp.createdAt)
        const pickUpCreatedAt = createdAt.getDate() + '/' +
          createdAt.getMonth() + ' ' +
          createdAt.getHours() + ':' +
          createdAt.getMinutes()
        result.push(
          <Table.Row key={count}>
            {i === 0 ? <Table.Cell
              className='cursorPointer borderLeft'
              onClick={() => this.onClickShipper(shipperId, shipperData.shipperName)}
              rowSpan={pickUps.length}>
              {shipperData.shipperName}
            </Table.Cell> : null}
            <Table.Cell className='borderLeft'>{pickUpCreatedAt}</Table.Cell>
            <Table.Cell className='borderLeft'>({pickUp.numOfOrder}) {pickUp.clientName}</Table.Cell>
            <Table.Cell className='borderLeft'>{pickUp.clientPhone}</Table.Cell>
            <Table.Cell className='borderLeft'>{pickUp.clientAddress}</Table.Cell>
            <Table.Cell className='borderLeft'>1.200.000</Table.Cell>
            <Table.Cell className='borderLeft'>
              <Icon
                onClick={() => this.onClickDeletePickup(pickUp._id, pickUp.orders)}
                style={{cursor: 'pointer'}} name='delete' />
              <Icon style={{cursor: 'pointer'}} name='print' />
            </Table.Cell>
          </Table.Row>
        )
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

  onShowPickupDetailModal () {
    const {pickupDetailModal} = this.state
    this.setState({
      pickupDetailModal: !pickupDetailModal
    })
  }
  render () {
    const {confirmModal, confirmLoading, pickupDetailModal, shipperId, shipperName} = this.state

    return (
      <div>
        <Table celled compact>
          <Table.Body>
            {this.renderData()}
          </Table.Body>
        </Table>
        <ConfirmModal
          onModalClose={this.onModalClose}
          loading={confirmLoading}
          onConfirm={this.confirmDeletePickup}
          title="Xóa chuyến đi lấy"
          content="Bạn có chắc không??"
          show={confirmModal} />
        <PickupDetailModal
          shipperId={shipperId}
          shipperName={shipperName}
          onShowModal={() => this.onShowPickupDetailModal()}
          show={pickupDetailModal} />
      </div>

    )
  }
}
