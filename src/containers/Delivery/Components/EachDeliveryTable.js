import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'semantic-ui-react'
import { get,post } from '../../../api/utils'
import { toast } from 'react-toastify'
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
        closeShowModal: PropTypes.func,
        onSaveData: PropTypes.func
    }
    componentDidMount(){
        this.props.selectedShipper ? this.getShipper(this.props.selectedShipper) : '';
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.confirmSave !== nextProps.confirmSave && nextProps.confirmSave){
            this.saveDelivery();
        }
    }
    saveDelivery(){
        const {shipper, orders} = this.state;
        let arrOrderId = [];
        let delivery = {};
        for(let i=0; i<orders.length; i++){
            arrOrderId.push(orders[i]._id)
        }
        delivery.user = shipper._id;
        delivery.orders = arrOrderId;
        post('/delivery/add', delivery).then((result) => {
            const data = result.data
            if (data.status === 'success') {
                this.props.onSaveData();
                toast.success(data.status);
            }else{
                toast.error("Đã xãy ra lỗi!")
            }
            this.props.closeShowModal();
          })


    }
    async getShipper(shipper){
        const result = await get('/user/findOne?id='+shipper)
        if(result && result.data){
            this.setState({
                shipper: result.data
            })
        }
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
            </Table.Row>
          )
          count++;
        }
        return result;
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
