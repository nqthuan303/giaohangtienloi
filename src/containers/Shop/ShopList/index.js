import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'
import { Goto } from '../../../components'
import { get } from '../../../api/utils'

class ClientList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shopList: []
    }
  }

  componentDidMount () {
    this.getShopList()
  }

  async getShopList () {
    const result = await get('/client/list')
    if (result.ok) {
      const data = result.data
      console.log(data.data)
    }
  }

  render () {
    return (
      <Table celled compact definition>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>STT</Table.HeaderCell>
            <Table.HeaderCell>Tên shop</Table.HeaderCell>
            <Table.HeaderCell>SĐT</Table.HeaderCell>
            <Table.HeaderCell>Địa chỉ</Table.HeaderCell>
            <Table.HeaderCell>Đối soát</Table.HeaderCell>
            <Table.HeaderCell>Thanh toán gần nhất</Table.HeaderCell>
            <Table.HeaderCell>Trạng thái</Table.HeaderCell>
            <Table.HeaderCell>Ngày đăng ký</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell><Goto text="Shop 01" url="/shop/info"/></Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

function mapStateToProps (state) {
  const {errors} = state.me.auth
  return {
    errors
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList)
