import React, {Component} from 'react'
import { Button, Segment } from 'semantic-ui-react'
import StorageOrderCard from '../Components/StorageOrderCard'
import SelectOrderList from '../Components/SelectOrderList'
import { get } from '../../../api/utils'
import './styles.scss'

class UpdateDelivery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      districts: [],
      selectList: [],
      orderInDistrict: [],
      arrActiveButton: {},
      
    }
  }

  componentDidMount () {
    this.getDistrictList();
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
        this.getDistrict(arrActiveButton)
        this.setState({
          districts: districts,
          arrActiveButton: arrActiveButton
        });

      }
    })
  }
  async getDistrict(districtsActive){
    const {selectList} =this.state;
    let orderInDistrict= [];
    if(districtsActive.all){
        for(let districtId in districtsActive){
            let result = await get('/order/order-each-district-and-status?status=storage&districtId='+districtId);
            let orders = result.data.data
            for(let i =0; i<orders.length; i++){
              let order = orders[i];
              orderInDistrict.push(order)
            }
        }
    }else{
        for(let districtId in districtsActive){
            if(districtsActive[districtId]){
              let result = await get('/order/order-each-district-and-status?status=storage&districtId='+districtId);
              let orders = result.data.data
              for(let i =0; i<orders.length; i++){
                let order = orders[i];
                orderInDistrict.push(order)
              }
            }
        }
    }
    
    let orders = [];
    if(selectList.length>0 && orderInDistrict.length>0){
      for(let i=0; i<orderInDistrict.length; i++){
        let id = orderInDistrict[i]._id;
        let count = 0;
        for(let k =0; k<selectList.length; k++){
          if(id === selectList[k]._id){
            break;
          }
          count++;
        }
        if(count !== selectList.length) continue;
        orders.push(orderInDistrict[i]);
      }
    }else{
      orders = orderInDistrict
    }
    this.setState({orderInDistrict: orders})
    
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
    this.getDistrict(arrActiveButton)
    this.setState({ 
      arrActiveButton: arrActiveButton
    })
  }

  onClickCard(order){
    const { selectList }  = this.state;
    let orderInDistrict = this.state.orderInDistrict;
    for(let k =0; k<orderInDistrict.length; k++){
      if(order._id === orderInDistrict[k]._id){
        orderInDistrict.splice(k,1);
        break;
      }
    }
    selectList.push(order);
    this.setState({
      selectList: selectList,
      orderInDistrict: orderInDistrict
    })
  }
  onClickDeleteSelectList(order){
    const { orderInDistrict ,arrActiveButton}  = this.state;
    if(arrActiveButton.all){
      orderInDistrict.push(order)
    }else if(arrActiveButton[order.reciever.district._id]){
      orderInDistrict.push(order)
    }

    let selectList = this.state.selectList;
    for(let i=0; i<selectList.length; i++){
      if(order._id === selectList[i]._id){
        selectList.splice(i, 1);
        break;
      }
    }
    this.setState({
      selectList: selectList,
      orderInDistrict: orderInDistrict
    })
  }

  onSaveData =()=>{
    this.setState({selectList: []})
    this.getDistrictList();
  }
  render () {
    console.log(21121221)
    const {selectList,orderInDistrict} =this.state
    return (
      <div>
        <div>
          <Button style={{float: 'right'}} primary >Cập Nhật</Button>
        </div>

        <div className='render-button-districts'>
          {this.renderButtonDistricts()}
        </div>
        <Segment >
            <StorageOrderCard
              onClickCardOrder={(order)=>this.onClickCard(order)}
              orderInDistrict={orderInDistrict} />
        </Segment>
        <Segment >
            <SelectOrderList
              data={selectList} 
              onClickDeleteOrder={(order)=>this.onClickDeleteSelectList(order)}/>
        </Segment>
      </div>
    )
  }
}
export default UpdateDelivery
