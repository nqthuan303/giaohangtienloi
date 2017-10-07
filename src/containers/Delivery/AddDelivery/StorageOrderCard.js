import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card} from 'semantic-ui-react'

export default class StorageOrderCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  static propTypes = {
    onClickCardOrder: PropTypes.func,
    orderInDistrict: PropTypes.array.isRequired
  }
  
  onClickCard (order){
    this.props.onClickCardOrder(order)
  }
  renderOrder () {
    const {orderInDistrict} = this.props
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
