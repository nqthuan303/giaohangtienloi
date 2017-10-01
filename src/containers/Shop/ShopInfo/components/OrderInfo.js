import React from 'react'
import {Menu, Table, Icon} from 'semantic-ui-react'

class OrderInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderList(){
        return []
    }

    render() {
        return (
            <Table celled compact definition>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>Mã VĐ</Table.HeaderCell>
                        <Table.HeaderCell>Ngày tạo</Table.HeaderCell>
                        <Table.HeaderCell>Người nhận</Table.HeaderCell>
                        <Table.HeaderCell>Địa chỉ nhận</Table.HeaderCell>
                        <Table.HeaderCell>Số ĐT</Table.HeaderCell>
                        <Table.HeaderCell>Tiền thu hộ</Table.HeaderCell>
                        <Table.HeaderCell>Trạng thái</Table.HeaderCell>
                        <Table.HeaderCell>Đối xoát</Table.HeaderCell>
                        <Table.HeaderCell>In</Table.HeaderCell>
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
                                    <Icon name='left chevron'/>
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='right chevron'/>
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

export default OrderInfo
