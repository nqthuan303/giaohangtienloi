import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Table, Menu} from 'semantic-ui-react'

class TempOrder extends Component {
  static propTypes = {
    data: PropTypes.array
  }
  constructor (props) {
    super(props)
    this.state = {
      orderModal: false
    }
  }

  renderList () {
    const {data} = this.props

    return data.map((item, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell>{item._id}</Table.Cell>
          <Table.Cell>September 14, 2013</Table.Cell>
          <Table.Cell>{item.client.name}</Table.Cell>
          <Table.Cell>{item.address}</Table.Cell>
          <Table.Cell>{item.reciever_phone}</Table.Cell>
          <Table.Cell>No</Table.Cell>
          <Table.Cell>{item.orderstatus.name}</Table.Cell>
          <Table.Cell>
            <Icon onClick={() => this.props.removeOrder(item._id)} style={{cursor: 'pointer'}} name='delete' />
            <Icon style={{cursor: 'pointer'}} name='edit' />
            <Icon style={{cursor: 'pointer'}} name='print' />
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  render () {
    return (
      <Table celled compact definition>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Mã VĐ</Table.HeaderCell>
            <Table.HeaderCell>Ngày tạo</Table.HeaderCell>
            <Table.HeaderCell>Shop</Table.HeaderCell>
            <Table.HeaderCell>Địa chỉ nhận</Table.HeaderCell>
            <Table.HeaderCell>Số ĐT</Table.HeaderCell>
            <Table.HeaderCell>Thu tiền</Table.HeaderCell>
            <Table.HeaderCell>Trạng thái</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.renderList()}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='10'>
              <Menu size="mini" floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='left chevron' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='right chevron' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

    )
  }
}

TempOrder.propTypes = {
  removeOrder: PropTypes.func.isRequired
}

export default TempOrder
