import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Segment, Button, Icon, Input, Menu } from 'semantic-ui-react'
import OrderTable from './components/OrderTable'
import {withRouter} from 'react-router'
import { get } from '../../api/utils'

const AddOrderButton = withRouter(({ history }) => (
  <Button
    onClick={() => { history.push('/order/add') }}
    floated='left' icon
    labelPosition='left' size='small'>
    <Icon name='add' /> Tạo vận đơn
  </Button>
))

class OrderList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ordersInStatus: [],
      orderOptions: {},
      activeItem: 'all'
    }
  }

  static propTypes = {
    errors: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.getOrdersInStatus()
  }

  getOrdersInStatus () {
    get('/order/count-order-in-status').then((result) => {
      this.setState({
        ordersInStatus: result.data
      })
    })
  }

  onChangeStatusTab = (e, { name }) => {
    let options = {}
    if (name !== 'all') {
      options = {orderStatusId: name}
    }
    this.setState({orderOptions: options})
    this.setState({ activeItem: name })
  }

  renderStatus () {
    const {ordersInStatus, activeItem} = this.state

    return ordersInStatus.map((item, i) => {
      const orderInDistrict = item.name + ' ( ' + item.count + ' )'
      return (
        <Menu.Item
          key={i + 1}
          name={item._id}
          active={activeItem === item._id}
          onClick={this.onChangeStatusTab}>
          {orderInDistrict}
        </Menu.Item>
      )
    })
  }

  render () {
    const { activeItem, orderOptions } = this.state

    return (
      <div>
        <div style={{marginBottom: '20px', display: 'inline-block', width: '100%'}}>
          <AddOrderButton />
        </div>

        <Menu attached='top' tabular>
          <Menu.Item
            onClick={this.onChangeStatusTab}
            active={activeItem === 'all'}
            key={0} name='all'>Tất cả</Menu.Item>
          {this.renderStatus()}
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input style={{float: 'right', marginRight: '5px'}} icon='search' placeholder='Mã vận đơn...' />
              <Input style={{float: 'right'}} icon='location arrow' placeholder='Địa chỉ...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment attached='bottom'>
          <OrderTable
            onOrderDeleted={() => this.getOrdersInStatus()}
            options={orderOptions} />
        </Segment>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {errors} = state.me.auth
  return {
    errors
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
