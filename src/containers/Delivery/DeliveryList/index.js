import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import { Tab, Segment, Button, Icon, Input } from 'semantic-ui-react'
import {Tab,Button, Icon} from 'semantic-ui-react'
import DeliveryTable from './DeliveryTable'
import {withRouter} from 'react-router'

const panes = [
  { menuItem: 'Chưa kết thúc', render: () => <Tab.Pane><DeliveryTable /></Tab.Pane> },
  { menuItem: 'Đã kết thúc', render: () => <Tab.Pane><DeliveryTable /></Tab.Pane> }
]

const AddDelivery = withRouter(({ history }) => (
  <Button
    onClick={() => { history.push('/delivery/add') }}
    floated='left' icon
    labelPosition='left' size='small'>
    <Icon name='add' /> Tạo chuyến đi giao
  </Button>
))
const AutoAddDelivery = withRouter(({ history }) => (
  <Button
    onClick={() => { history.push('/delivery/add') }}
    floated='left' icon
    labelPosition='left' size='small'>
    <Icon name='add' /> Tạo tự động
  </Button>
))

class DeliveryList extends Component {
  componentDidMount () {
  }

  onClickAddOrder = () => {
    console.log(this.props)
  }

  render () {
    return (
      <div>
        <div style={{marginBottom: '20px', display: 'inline-block', width: '100%'}}>
          <AddDelivery />
          <AutoAddDelivery/>
        </div>
        <Tab panes={panes} />
      </div>
    )
  }
}

export default DeliveryList
