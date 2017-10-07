import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table, Icon} from 'semantic-ui-react'
export default class SelectOrderList extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    onClickDeleteOrder: PropTypes.func
  }
  onClickDelete(order){
    this.props.onClickDeleteOrder(order)
  }
  renderSelect=()=>{
    let result=[];
    let count =1;
    for(let i=0; i<this.props.data.length; i++){
      let order = this.props.data[i];
      const createdAt = new Date(order.createdAt)
      let orderCreatedAt = createdAt.getDate() + '/' +
      createdAt.getMonth() + ' ' +
      createdAt.getHours() + ':' +
      createdAt.getMinutes()
      result.push(
        <Table.Row key={order._id}>
          <Table.Cell>{count} </Table.Cell>
          <Table.Cell>{order.id} </Table.Cell>
          <Table.Cell >{orderCreatedAt}</Table.Cell>
          <Table.Cell >{order.reciever.name}</Table.Cell>
          <Table.Cell >{order.reciever.address}</Table.Cell>
          <Table.Cell >{order.reciever.district.name}</Table.Cell>
          <Table.Cell >
            <Icon style={{cursor: 'pointer'}}
                  name='delete' 
                  onClick={() => this.onClickDelete(order)}/>
          </Table.Cell>
        </Table.Row>
      )
      count++;
    }
    if(result.length===0){
      return <Table.Row key={0}>
                <Table.Cell>Không có dữ liệu!</Table.Cell>
            </Table.Row>
    }
    else {
      return result
    }
  }
  render () {
    return (
        <div>
            <Table celled compact>
                <Table.Body>
                    {this.renderSelect()}
                </Table.Body>
            </Table>
        </div>

    )
  }
}
