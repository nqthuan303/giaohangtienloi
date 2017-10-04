import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card} from 'semantic-ui-react'
import { get } from '../../../api/utils'

export default class StorageOrderCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orderInDistrict: [],
    }
  }

  static propTypes = {
    onClickCardOrder: PropTypes.func,
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
  onClickCard (order){
    this.props.onClickCardOrder(order)
  }
  renderOrder () {
    const {orderInDistrict} = this.state
    let result = []
    for (let i = 0; i < orderInDistrict.length; i++) {
      const order = orderInDistrict[i]

      const createdAt = new Date(order.createdAt)
      const orderCreatedAt = createdAt.getDate() + '/' +
      createdAt.getMonth() + ' ' +
      createdAt.getHours() + ':' +
      createdAt.getMinutes()

      result.push(
        <Card
          key={i}
          header={orderCreatedAt}
          meta={order.id}
          description={order.reciever.address}
          onClick={()=>this.onClickCard(order)}
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
