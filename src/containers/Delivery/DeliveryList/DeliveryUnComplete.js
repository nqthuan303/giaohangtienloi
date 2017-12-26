import React, {Component} from 'react';
import { Table, Icon, Modal,Button } from 'semantic-ui-react';
import EachDelivery from './EachDelivery';
import {Goto} from '../../../components'
import { get } from '../../../api/utils';
import './styles.scss'
class DeliveryUnComplete extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listDelivery: [],
      showModal: false,
      delivery: {}
    }
  }
  componentDidMount () {
    this.getDelivery();
  }
  async getDelivery(){
    const data = await get('/delivery/list');
    if(data && data.data){
      const deliverys = data.data;
      let listDelivery =[];
      for(let i =0; i<deliverys.length; i++){
        if(deliverys[i].status==="unCompleted"){
          listDelivery.push(deliverys[i]);
        }
      }
      this.setState({listDelivery: listDelivery})
    }
  }
  closeShowModal =()=>{
    this.setState({
      showModal: false
    })
  }
  onClickEditDelivery(delivery){
    this.setState({
      delivery: delivery,
      showModal: true,
    })
  }
  renderBody(){
    const {listDelivery} = this.state;
    return listDelivery.map((item, i) => {
      const createdAt = new Date(item.createdAt);
      const deliveryCreatedAt = createdAt.getDate() + '/' +
      createdAt.getMonth() + ' ' +
      createdAt.getHours() + ':' +
      createdAt.getMinutes();
      const deliveryUrl = '/delivery/update/' + item._id;
        return (
            <Table.Row key={i}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{deliveryCreatedAt}</Table.Cell>
                <Table.Cell>{item.user.name}</Table.Cell>
                <Table.Cell>{item.orders.length}</Table.Cell>
                <Table.Cell>1212122</Table.Cell>
                <Table.Cell><Goto text={<Icon size="large" name='edit' />} url={deliveryUrl}/> </Table.Cell>
                <Table.Cell><a style={{cursor: "pointer"}} onClick={()=>this.onClickEditDelivery(item)}>Chưa Kết Thúc</a></Table.Cell>
                <Table.Cell><Icon name='print' size='large' link/></Table.Cell>
            </Table.Row>
        );
    });
  }
  render () {
    const {delivery, showModal} = this.state;
    return (
      <div>
        <Table celled compact className="delivery-un-complete-table" style={{textAlign: "center"}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Chuyến Giao</Table.HeaderCell>
                    <Table.HeaderCell>Bắt Đầu</Table.HeaderCell>
                    <Table.HeaderCell>Nhân Viên Giao</Table.HeaderCell>
                    <Table.HeaderCell>Số Đơn</Table.HeaderCell>
                    <Table.HeaderCell>Tổng Thu</Table.HeaderCell>
                    <Table.HeaderCell>Chỉnh Sửa</Table.HeaderCell>
                    <Table.HeaderCell>Trạng Thái</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
                <Table.Body>
                    {this.renderBody()}
                </Table.Body>
        </Table>

        <Modal
          size={'large'}
          open={showModal}
          onClose={this.closeShowModal}>
          <Modal.Header>Chuyến Đi Giao  {delivery.id}</Modal.Header>
          <Modal.Content>
            <EachDelivery
              delivery={delivery}
              closeShowModal={this.closeShowModal}
              onClickDeleteOrder={(deliveryId, orderId)=>this.onClickDeleteOrder(deliveryId, orderId)}
              />
          </Modal.Content>
        </Modal>
    </div>
    )
  }
}

export default DeliveryUnComplete
