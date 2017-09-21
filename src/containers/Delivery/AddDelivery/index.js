// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import { Grid, Button, Tab, Select, Table, Form, Dropdown, Input } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
// import OrderInStore from '../components/OrderInStore'
// import TempOrder from '../components/TempOrder'
// import { get } from '../../../api/utils'

// class AddDelivery extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       districts: []
//     }
//   }

//   componentDidMount () {
//     this.getDistrictList()
//   }

//   getDistrictList () {
//     get('/district/listForSelect').then((result) => {
//       this.setState({districts: result.data})
//     })
//   }

//   renderPanel () {
//     const {districts} = this.state

//     let panes = [{ menuItem: 'Tất cả', render: () => <Tab.Pane><OrderInStore /></Tab.Pane> }]
//     for (let i = 0; i < districts.length; i++) {
//       const district = districts[i]
//       panes.push(
//         { menuItem: district.text, render: () => <Tab.Pane><OrderInStore /></Tab.Pane> }
//       )
//     }
//     return panes
//   }

//   render () {
//     return (
//       <div>
//         <Tab style={{marginBottom: '20px'}} panes={this.renderPanel()} />
//         <TempOrder />
//       </div>
//     )
//   }
// }
// export default AddDelivery
