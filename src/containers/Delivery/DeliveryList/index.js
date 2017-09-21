import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import { Tab, Segment, Button, Icon, Input } from 'semantic-ui-react'
import {Tab} from 'semantic-ui-react'
import DeliveryTable from './DeliveryTable'
// import {withRouter} from 'react-router'

const panes = [
  { menuItem: 'Chưa kết thúc', render: () => <Tab.Pane><DeliveryTable /></Tab.Pane> },
  { menuItem: 'Đã kết thúc', render: () => <Tab.Pane><DeliveryTable /></Tab.Pane> }
]

// const GoToButton = withRouter(({ history }) => (
//   <Button
//     onClick={() => { history.push('/delivery/add') }}
//     floated='left' icon
//     labelPosition='left' size='small'>
//     <Icon name='add' /> Tạo chuyến đi giao
//   </Button>
// ))

class DeliveryList extends Component {
  componentDidMount () {
  }

  onClickAddOrder = () => {
    console.log(this.props)
  }

  render () {
    return (
      <div>
        {/* <div style={{marginBottom: '20px', display: 'inline-block', width: '100%'}}>
          <GoToButton />
        </div> */}

        <Tab panes={panes} />
      </div>
    )
  }
}

export default DeliveryList
