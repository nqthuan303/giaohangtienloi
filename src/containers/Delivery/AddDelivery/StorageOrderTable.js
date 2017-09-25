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
    }
  }

  static propTypes = {
    districtsActive: PropTypes.object.isRequired,
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps.districtsActive) !== JSON.stringify(this.props.districtsActive)) {
      console.log(12121)  
        let districtsActive = nextProps.districtsActive
        if(districtsActive.all){
            for(let districtId in districtsActive){
                this.getOrderEachDistrictAndStatus(districtId)
            }
        }else{
            for(let districtId in districtsActive){
                if(districtsActive[districtId]){
                    this.getOrderEachDistrictAndStatus(districtId)
                }
            }
        }
    }
  }
  getOrderEachDistrictAndStatus(districtId) {
    const url = '/order/order-each-district-and-status?status=storage&districtId='+districtId
    console.log(url)
    get(url).then((result) => {
      console.log(result.data)
      
    })
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
    
    return (
      <div>
        {/* <Table celled compact>
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
          show={cancelOrderModal} /> */}
      </div>

    )
  }
}
