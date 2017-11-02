import React, {Component} from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { get } from '../../../api/utils'
import './styles.scss'
class DeliveryComplete extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listDelivery: []
    }
  }
  componentDidMount () {
    this.getDelivery();
  }
  async getDelivery(){
    const data = await get('/delivery/list');
    if(data.data){
      const deliverys = data.data;
      let listDelivery =[];
      for(let i =0; i<deliverys.length; i++){
        if(deliverys[i].status==="completed"){
          listDelivery.push(deliverys[i]);
        }
      }
      this.setState({listDelivery: listDelivery})
    }
  }
  renderBody(){
    const {listDelivery} = this.state;
    return listDelivery.map((item, i) => {
      const createdAt = new Date(item.createdAt);
      const deliveryCreatedAt = createdAt.getDate() + '/' +
      createdAt.getMonth() + ' ' +
      createdAt.getHours() + ':' +
      createdAt.getMinutes();

      const updateAt = new Date(item.updateAt);
      const deliveryUpdateAt = updateAt.getDate() + '/' +
      updateAt.getMonth() + ' ' +
      updateAt.getHours() + ':' +
      updateAt.getMinutes();

      return (
          <Table.Row key={i}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{deliveryCreatedAt}</Table.Cell>
              <Table.Cell>{item.user.name}</Table.Cell>
              <Table.Cell>{item.orders.length}</Table.Cell>
              <Table.Cell>1212122</Table.Cell>
              <Table.Cell>deliveryUpdateAt</Table.Cell>
              <Table.Cell><Icon name='print' size='large' link/></Table.Cell>
          </Table.Row>
      );
    });
  }
  render () {
    return (
      <div>
        <Table celled compact className="delivery-complete-table" style={{textAlign: "center"}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Chuyến Giao</Table.HeaderCell>
                    <Table.HeaderCell>Bắt Đầu</Table.HeaderCell>
                    <Table.HeaderCell>Nhân Viên Giao</Table.HeaderCell>
                    <Table.HeaderCell>Số Đơn</Table.HeaderCell>
                    <Table.HeaderCell>Tổng Thu</Table.HeaderCell>
                    <Table.HeaderCell>Kết Thúc</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
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

export default DeliveryComplete
