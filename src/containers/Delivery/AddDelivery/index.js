import React, {Component} from 'react'
import { Input, Button, Segment,Select } from 'semantic-ui-react'
import StorageOrderCard from './StorageOrderCard'
import SelectOrderList from './SelectOrderList'
import { get } from '../../../api/utils'
import './styles.css'

class AddDelivery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      districts: [],
      arrActiveButton: {},
      shippers: [],
      selectedShipper: '',
      selectList: []
    }
  }

  componentDidMount () {
    this.getDistrictList();
    this.getShipperList();
  }
  getShipperList () {
    get('/user/getShipper').then((result) => {
      let data = result.data
      data.unshift({key: -1, value: -1, text: 'Chọn shipper'})
      this.setState({
        shippers: result.data
      })
    })
  }
  getDistrictList () {
    get('/order/count-order-each-district-and-status?status=storage').then((result) => {
      let districts= result.data.data
      if(districts){
        let arrActiveButton = {all: false}
        for(let i =0; i<districts.length; i++){
          let id=districts[i]._id
          arrActiveButton[id]= false;
        }
        this.setState({
          districts: districts,
          arrActiveButton: arrActiveButton
        });
      }
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
  onSelectShipper = (value) => {
    this.setState({
      selectedShipper: value
    })
  }
  onClickCard(order){
    const selectList = this.state.selectList;
    selectList.push(order);
    this.setState({
      selectList: selectList
    })
  }
  render () {
    const {arrActiveButton, shippers, selectedShipper,selectList} =this.state
    return (
      <div>
        <div>
        <Select
          value={selectedShipper? selectedShipper: -1}
          onChange={(e, {name, value}) => this.onSelectShipper(value)}
          options={shippers} />

          <Button style={{float: 'right'}} primary>Tạo</Button>
          <Input style={{float: 'right', marginRight: '5px'}} icon='search' placeholder='Mã vận đơn...' />
        </div>

        <div className='render-button-districts'>
          {this.renderButtonDistricts()}
        </div>
        <Segment >
            <StorageOrderCard
              //ref={instance => { this.clientOrderTableRef = instance }}
              //onOrderChange={this.onOrderChange}
              onClickCardOrder={(order)=>this.onClickCard(order)}
              districtsActive={arrActiveButton} />
        </Segment>
        <Segment >
            <SelectOrderList
              data={selectList} />
        </Segment>
      </div>
    )
  }
}
export default AddDelivery
