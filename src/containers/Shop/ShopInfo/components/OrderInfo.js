import React from 'react'
import {Table} from 'semantic-ui-react'
import {get} from '../../../../api/utils'
import { withRouter } from 'react-router'

class OrderInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.getOrders();
    }

    async getOrders() {
        const {shopId} = this.props.match.params;
        const result = await get('/client/order-info/' + shopId);
        const resResult = result.data;

        if(resResult.status === 'success'){
            const data = resResult.data;
            this.setState({orders: data});
        }

    }

    renderList(){
        const {orders} = this.state;
        return orders.map((item, i) => {
            const {reciever, orderstatus} = item;
            const {phoneNumbers} = reciever;

            return (
                <Table.Row key={i}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{item.createdAt}</Table.Cell>
                    <Table.Cell>{reciever.name}</Table.Cell>
                    <Table.Cell>{reciever.address}</Table.Cell>
                    <Table.Cell>{phoneNumbers[0]}</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>{orderstatus.name}</Table.Cell>
                    <Table.Cell>Doi xoat</Table.Cell>
                    <Table.Cell>In</Table.Cell>
                </Table.Row>
            );
        })
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
            </Table>
        )
    }
}

export default withRouter(OrderInfo)
