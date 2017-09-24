import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
import { Dropdown, Input, Button } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
// import OrderInStore from '../components/OrderInStore'
// import TempOrder from '../components/TempOrder'
import { get } from '../../../api/utils'

class AddDelivery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      districts: [],
      active: false
    }
  }

  componentDidMount () {
    this.getDistrictList();
  }

  getDistrictList () {
    get('/order/count-order-in-district?status=storage').then((result) => {
      console.log(result)
      this.setState({
        districts: result.data.data,
      });
    })
  }

  renderButtonDistricts =()=> {
    const {districts, active} = this.state

    let buttonDistricts = [];
    buttonDistricts.push(<Button 
      toggle 
      active={active} 
      onClick={this.onClickButtonDistricts}>
      Tất Cả
    </Button>)
    for (let i = 0; i < districts.length; i++) {
      const district = districts[i]
      buttonDistricts.push(
        <Button 
          toggle 
          active={active} 
          onClick={this.onClickButtonDistricts}>
          {district.name}
      </Button>
      )
    }
    return buttonDistricts
  }
  onClickButtonDistricts =()=>{
    this.setState({ active: !this.state.active })    
  }
  render () {
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

        <div style={{marginBottom: '20px', display: 'inline-block', width: '100%'}}>
          
      </div>
        {this.renderButtonDistricts}
      </div>
    )
  }
}
export default AddDelivery
