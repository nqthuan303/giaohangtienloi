import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
import { Dropdown, Input, Button, Segment } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
// import OrderInStore from '../components/OrderInStore'
import StorageOrderTable from './StorageOrderTable'
import { get } from '../../../api/utils'
import './styles.css'

class AddDelivery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      districts: [],
      arrActiveButton: {}
    }
  }

  componentDidMount () {
    this.getDistrictList();
  }

  getDistrictList () {
    get('/order/count-order-each-district-and-status?status=storage').then((result) => {
      let districts= result.data.data
      let arrActiveButton = {all: false}
      for(let i =0; i<districts.length; i++){
        let id=districts[i]._id
        arrActiveButton[id]= false;
      }
      this.setState({
        districts: districts,
        arrActiveButton: arrActiveButton
      });
    })
  }

  renderButtonDistricts (){
    const {districts, arrActiveButton} = this.state
    let buttonDistricts = [];
    buttonDistricts.push(<Button 
      toggle 
      active={arrActiveButton.all}
      key='all'
      onClick={()=>this.onClickButtonDistricts('all')}>
      Tất Cả
    </Button>)
    for (let i = 0; i < districts.length; i++) {
      const district = districts[i]
      buttonDistricts.push(
        <Button
          key={district._id}
          toggle 
          active={arrActiveButton[district._id]} 
          onClick={()=>this.onClickButtonDistricts(district._id)}>
          {district.name} ({district.count})
      </Button>
      )
    }
    return buttonDistricts
  }
  onClickButtonDistricts (id){
    let arrActiveButton = this.state.arrActiveButton
    arrActiveButton[id] = !this.state.arrActiveButton[id]
    this.setState({ 
      arrActiveButton: arrActiveButton
    })    
  }
  render () {
    
    const {arrActiveButton} =this.state
    const clientOption = [{
      key: 1,
      value: '1',
      text: 'nguoi 1'
    }]
    return (
      <div>
        <div>
          <Dropdown
            onChange={this.onSelectClient}
            name='shipper'
            search selection
            placeholder='Shipper' options={clientOption} />
          <Button style={{float: 'right'}} primary>Tạo</Button>
          <Input style={{float: 'right', marginRight: '5px'}} icon='search' placeholder='Mã vận đơn...' />
        </div>

        <div className='render-button-districts'>
          {this.renderButtonDistricts()}
        </div>
        <Segment attached='bottom'>
            <StorageOrderTable
              //ref={instance => { this.clientOrderTableRef = instance }}
              //onOrderChange={this.onOrderChange}
              districtsActive={arrActiveButton} />
        </Segment>
      </div>
    )
  }
}
export default AddDelivery
