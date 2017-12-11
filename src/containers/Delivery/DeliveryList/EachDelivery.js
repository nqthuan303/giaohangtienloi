import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table, Button, Select} from 'semantic-ui-react'
import { get,post } from '../../../api/utils'
import { toast } from 'react-toastify'
import './styles.scss'

class EachDelivery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderStatus: [],
        }
    }

    static propTypes = {
        delivery: PropTypes.object.isRequired,
        closeShowModal: PropTypes.func,
    }
    componentDidMount(){
        this.getOrderStatus();
    }
    componentWillReceiveProps(nextProps) {
    }
    // saveDelivery(){
    //     const {shipper, orders} = this.state;
    //     let arrOrderId = [];
    //     let delivery = {};
    //     for(let i=0; i<orders.length; i++){
    //         arrOrderId.push(orders[i]._id)
    //     }
    //     delivery.user = shipper._id;
    //     delivery.orders = arrOrderId;
    //     post('/delivery/add', delivery).then((result) => {
    //         const data = result.data
    //         if (data.status === 'success') {
    //             this.props.onSaveData();
    //             toast.success(data.status);
    //         }else{
    //             toast.error("Đã xãy ra lỗi!")
    //         }
    //         this.props.closeShowModal();
    //       })


    // }
    closeShowModal = ()=>{
        this.props.closeShowModal();
    }
    async getOrderStatus() {
        const result = await get('/orderstatus/listForSelect');
        if(result && result.data){
            this.setState({orderStatus: result.data})
        }
        
    }
    onSelectOrderStatus(orderId, value){
        console.log(value)
    }
    renderBody=()=>{
        const {orderStatus} = this.state;
        let result=[];
        let count =1;
        for(let i=0; i<this.props.delivery.orders.length; i++){
          const order = this.props.delivery.orders[i];
          const createdAt = new Date(order.createdAt);
          const orderCreatedAt = createdAt.getDate() + '/' +
          createdAt.getMonth() + ' ' +
          createdAt.getHours() + ':' +
          createdAt.getMinutes();
          const phoneNumbers = order.receiver.phoneNumbers;
          let textPhoneNUmbers = ''
          for(let k=0; k<phoneNumbers.length; k++){
            textPhoneNUmbers =textPhoneNUmbers + '    ' + phoneNumbers[k]
          }
          result.push(
            <Table.Row key={order._id}>
                <Table.Cell>{count} </Table.Cell>
                <Table.Cell>{order.id} </Table.Cell>
                <Table.Cell >{orderCreatedAt}</Table.Cell>
                <Table.Cell >{order.receiver.name}</Table.Cell>
                <Table.Cell >{order.receiver.address}</Table.Cell>
                <Table.Cell >{order.receiver.district.name}</Table.Cell>
                <Table.Cell >{textPhoneNUmbers}</Table.Cell>
                <Table.Cell >Tiền</Table.Cell>
                <Table.Cell >
                    <Select
                        //value={order.orderstatus}
                        defaultValue={order.orderstatus}
                        onChange={(e, {name, value}) => this.onSelectOrderStatus(order._id,value)}
                        options={orderStatus} />
                </Table.Cell>
            </Table.Row>
          )
          count++;
        }
        return result;
    }
    
    render() {
        const {delivery} = this.props;
        return (
            <div>
                <Table celled compact className="each-delivery-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>{delivery.user.name} - {delivery.user.phone_number}</Table.HeaderCell>
                            <Table.HeaderCell >Tổng Tiền</Table.HeaderCell>
                            <Table.HeaderCell >100000</Table.HeaderCell>
                            <Table.HeaderCell ></Table.HeaderCell>
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
                <div style={{textAlign: 'center'}}>
                    <Button color='green'>
                        Xác nhận
                    </Button>
                    <Button onClick={this.closeShowModal} color='red'>
                        Hủy
                    </Button>
                </div>
                
            </div>
        )
    }
}

export default EachDelivery