import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Table, Select, Button, Input,Card} from 'semantic-ui-react'
import { get, post } from '../../../api/utils'
import { toast } from 'react-toastify'

import {ConfirmModal} from '../../../components'

export default class ClientOrderTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orderInDistrict: [],
    }
  }

  static propTypes = {
    districtsActive: PropTypes.object.isRequired,
  }
  componentDidMount(){
    this.getDistrict(this.props.districtsActive)
  }
  componentWillReceiveProps(nextProps) {
    let districtsActive = nextProps.districtsActive
    this.getDistrict(districtsActive)
  }
  getDistrict(districtsActive){
    this.setState({orderInDistrict:[]})
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
  getOrderEachDistrictAndStatus(districtId) {
    const url = '/order/order-each-district-and-status?status=storage&districtId='+districtId
    get(url).then((result) => {
      let orderInDistrict = this.state.orderInDistrict
      let orders = result.data.data
      for(let i =0; i<orders.length; i++){
        let order = orders[i];
        orderInDistrict.push(order)
      }
      this.setState({orderInDistrict:orderInDistrict})
    })
  }

  renderOrder () {
    const {orderInDistrict} = this.state
    let result = []
    let count = 0
    for (let i = 0; i < orderInDistrict.length; i++) {
      const order = orderInDistrict[i]

      const updateAt = new Date(order.updateAt)
      const orderUpdateAt = updateAt.getDate() + '/' +
      updateAt.getMonth() + ' ' +
      updateAt.getHours() + ':' +
      updateAt.getMinutes()
      count++

      result.push(
        <Card
          key={i}
          header={orderUpdateAt}
          meta={order.id}
          description={order.reciever.address}
        />
      )
    }
    return result
  }
  render () {
    return (
      <div>
        <Card.Group itemsPerRow={8} stackable={true} className="order-inStore-container">
        {this.renderOrder()}
        </Card.Group>
        {/* <ConfirmModal
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
