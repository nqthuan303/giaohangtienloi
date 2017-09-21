import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Menu, Segment, Button } from 'semantic-ui-react'
import { get } from '../../api/utils'
import ClientOrderTable from './components/ClientOrderTable'
import PickupTable from './components/PickupTable'

import './PickupList.css'

class PickupList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      districts: [],
      districtId: 'all'
    }
  }

  static propTypes = {
    errors: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.getDistrictList()
  }
  onOrderChange = () => {
    this.getDistrictList()
    this.pickupTableRef.getPickUpList()
  }

  getDistrictList () {
    get('/order/count-order-in-district').then((result) => {
      this.setState({
        districts: result.data.data
      })
    })
  }
  onChangeDistrict = (e, { name }) => {
    this.setState({ districtId: name })
  }

  renderDistrict () {
    const {districts, districtId} = this.state

    return districts.map((district, i) => {
      const orderInDistrict = district.name + ' ( ' + district.count + ' )'
      return (
        <Menu.Item
          key={i + 1}
          name={district._id}
          active={districtId === district._id}
          onClick={this.onChangeDistrict}>
          {orderInDistrict}
        </Menu.Item>
      )
    })
  }

  onDeletePickupSuccess = () => {
    this.clientOrderTableRef.getOrdersEachClient()
    this.getDistrictList()
  }

  render () {
    const { districtId } = this.state
    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item
            active={districtId === 'all'}
            key={0} name='all'
            onClick={this.onChangeDistrict}>Tất cả</Menu.Item>
          {this.renderDistrict()}
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button content='Lịch sử lấy hàng' icon='right arrow' labelPosition='right' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment attached='bottom'>
          <ClientOrderTable
            ref={instance => { this.clientOrderTableRef = instance }}
            onOrderChange={this.onOrderChange}
            districtId={districtId} />
        </Segment>

        <Segment>
          <PickupTable
            onDeletePickupSuccess={this.onDeletePickupSuccess}
            ref={instance => { this.pickupTableRef = instance }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PickupList)
