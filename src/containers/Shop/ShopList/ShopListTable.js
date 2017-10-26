import React, {Component} from 'react'
import {Table, Icon} from 'semantic-ui-react'
import {Goto} from '../../../components'
import PropTypes from 'prop-types'

class ShopListTable extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static propTypes = {
        data: PropTypes.array.isRequired
    }

    renderRows() {
        const {data, onClickDelete} = this.props;
        return data.map((item, i) => {
            const shopInfoUrl = '/shop/info/' + item._id;

            return (
                <Table.Row key={i}>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell><Goto text={item.name} url={shopInfoUrl}/></Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>{item.status}</Table.Cell>
                    <Table.Cell>{item.createdAt}</Table.Cell>
                    <Table.Cell>
                        <Icon
                            style={{cursor: 'pointer'}}
                            onClick={() => onClickDelete({index: i, id: item._id})} name='delete'/>
                    </Table.Cell>
                </Table.Row>
            );
        });
    }

    render() {
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
                        <Table.HeaderCell>Hoạt động</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.renderRows()}
                </Table.Body>
            </Table>
        )
    }
}

export default ShopListTable
