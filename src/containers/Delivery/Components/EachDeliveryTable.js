import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Select, Table, Button} from 'semantic-ui-react'
import { get } from '../../../api/utils'
import './styles.css'

class EachDeliveryTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shipper:{
                name: '',
                phone_number: ''
            },
            orderStatusList: [],
            orders: this.props.selectList,
        }
    }

    static propTypes = {
        selectList: PropTypes.array.isRequired,
        selectedShipper: PropTypes.string.isRequired,
        confirmSave: PropTypes.bool.isRequired,
    }
    componentDidMount(){
        this.props.selectedShipper ? this.getShipper(this.props.selectedShipper) : '';
        this.getOrderStatus();
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.show !== this.state.show) {
        //     this.setState({show: nextProps.show})
        // }
    }
    async getShipper(shipper){
        const result = await get('/user/findOne?id='+shipper)
        if(result.data){
            this.setState({
                shipper: result.data
            })
        }
    }
    async getOrderStatus(){
        const result = await get('/orderStatus/listForSelect');
        if(result.data){
            this.setState({
                orderStatusList: result.data
            })
        }
    }
    onChangeOrderStatus(index,value){
        let orders = this.state.orders;
        orders[index].orderstatus = value;
        this.setState({
            orders: orders
        })
    }
    renderBody=()=>{
        let result=[];
        let count =1;
        for(let i=0; i<this.props.selectList.length; i++){
          const order = this.props.selectList[i];
          const createdAt = new Date(order.createdAt);
          const orderCreatedAt = createdAt.getDate() + '/' +
          createdAt.getMonth() + ' ' +
          createdAt.getHours() + ':' +
          createdAt.getMinutes();
          const phoneNumbers = order.reciever.phoneNumbers;
          let textPhoneNUmbers = ''
          for(let k=0; k<phoneNumbers.length; k++){
            textPhoneNUmbers =textPhoneNUmbers + '    ' + phoneNumbers[k]
          }
          result.push(
            <Table.Row key={order._id}>
              <Table.Cell>{count} </Table.Cell>
              <Table.Cell>{order.id} </Table.Cell>
              <Table.Cell >{orderCreatedAt}</Table.Cell>
              <Table.Cell >{order.reciever.name}</Table.Cell>
              <Table.Cell >{order.reciever.address}</Table.Cell>
              <Table.Cell >{order.reciever.district.name}</Table.Cell>
              <Table.Cell >{textPhoneNUmbers}</Table.Cell>
              <Table.Cell >Tiền</Table.Cell>
              <Table.Cell >
                <Select
                    value={order.orderstatus}
                    onChange={(e, {name, value}) => this.onChangeOrderStatus(i,value)}
                    options={this.state.orderStatusList} />
              </Table.Cell>
            </Table.Row>
          )
          count++;
        }
        return result;
    }
    onClickAllDone=()=>{
        let orderStatusList = this.state.orderStatusList;
        let orders = this.state.orders;
        let idDone = '';
        for(let i=0; i<orderStatusList.length; i++){
            if(orderStatusList[i].name === "done"){
                idDone = orderStatusList[i].value;
                break;
            }
        }
        for(let i=0; i<orders.length; i++){
            orders[i].orderstatus = idDone;
        }
        this.setState({
            orders: orders
        })
    }
    onClickAllShipping =()=>{
        let orderStatusList = this.state.orderStatusList;
        let orders = this.state.orders;
        let idShipping = '';
        for(let i=0; i<orderStatusList.length; i++){
            if(orderStatusList[i].name === "shipping"){
                idShipping = orderStatusList[i].value;
                break;
            }
        }
        for(let i=0; i<orders.length; i++){
            orders[i].orderstatus = idShipping;
        }
        this.setState({
            orders: orders
        })
    }
    render() {
        const {shipper} = this.state
        return (
            <div>
                <Table celled compact className="each-delivery-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>{shipper.name} - {shipper.phone_number}</Table.HeaderCell>
                            <Table.HeaderCell >Tổng Tiền</Table.HeaderCell>
                            <Table.HeaderCell >100000</Table.HeaderCell>
                            <Table.HeaderCell >
                                <Button primary size="small" onClick={this.onClickAllDone}>Đã Giao</Button>
                                <Button primary size="small" onClick={this.onClickAllShipping}>Đang Giao</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Mã VĐ</Table.HeaderCell>
                            <Table.HeaderCell>Ngày Tạo</Table.HeaderCell>
                            <Table.HeaderCell>Người Nhận</Table.HeaderCell>
                            <Table.HeaderCell>Địa Chỉ</Table.HeaderCell>
                            <Table.HeaderCell>Quận</Table.HeaderCell>
                            <Table.HeaderCell>SĐT</Table.HeaderCell>
                            <Table.HeaderCell>Tiền Thu</Table.HeaderCell>
                            <Table.HeaderCell>Trạng Thái</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                        <Table.Body>
                            {this.renderBody()}
                        </Table.Body>
                </Table>
            </div>
        )
    }
}

export default EachDeliveryTable
