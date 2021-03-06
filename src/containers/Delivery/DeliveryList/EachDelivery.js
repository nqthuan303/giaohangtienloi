import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table, Button, Select} from 'semantic-ui-react'
import { get } from '../../../api/utils'
// import { toast } from 'react-toastify'
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
        onClickDeleteOrder: PropTypes.func
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
    renderBody=()=>{
        const {orderStatus} = this.state;
        const {delivery} = this.props;
        let result=[];
        let count =1;
        for(let i=0; i<delivery.orders.length; i++){
          const order = delivery.orders[i];
          const createdAt = new Date(order.createdAt);
          const orderCreatedAt = createdAt.getDate() + '/' +
          createdAt.getMonth() + ' ' +
          createdAt.getHours() + ':' +
          createdAt.getMinutes();
          const phoneNumbers = order.reciever.phoneNumbers;
          let textPhoneNumbers = ''
          for(let k=0; k<phoneNumbers.length; k++){
            textPhoneNumbers =textPhoneNumbers + '    ' + phoneNumbers[k]
          }
          result.push(
            <Table.Row key={order._id}>
                <Table.Cell>{count} </Table.Cell>
                <Table.Cell>{order.id} </Table.Cell>
                <Table.Cell >{orderCreatedAt}</Table.Cell>
                <Table.Cell >{textPhoneNUmbers}</Table.Cell>
                <Table.Cell >{order.reciever.name}</Table.Cell>
                <Table.Cell >{order.reciever.address}</Table.Cell>
                <Table.Cell >{order.reciever.district.name}</Table.Cell>
                <Table.Cell >{textPhoneNUmbers}</Table.Cell>
                <Table.Cell >{textPhoneNumbers}</Table.Cell>
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