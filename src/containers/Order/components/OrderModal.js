import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Table} from 'semantic-ui-react'

export default class OrderModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static propTypes = {
        show: PropTypes.bool,
        onModalClose: PropTypes.func
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.show !== nextProps.show) {
            return true;
        }
        return false;
    }

    render() {
        const {onModalClose, show} = this.props;

        return (
            <Modal onClose={() => onModalClose()} open={show}>
                <Modal.Header>Mã vận đơn 007</Modal.Header>
                <Modal.Content image>
                    <Table compact celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='7'>Thông tin đơn hàng</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell colSpan='3'>
                                    Người nhận: <br/>
                                    - Minh <br/>
                                    - 48 A Nghĩa Phát, p7, Tân Bình <br/>
                                    - 0123 456 789 <br/>
                                </Table.Cell>
                                <Table.Cell colSpan='2'>
                                    - Tiền hàng: 0 đ <br/>
                                    - Tổng phí: 30.000 đ <br/>
                                    + Cước phí: 20.000 đ <br/>
                                    + Phí phụ: 10.000 đ <br/>
                                    - Tổng thu: 30.000 đ <br/>
                                </Table.Cell>
                                <Table.Cell rowSpan='2' colSpan='2'>
                                    COD <br/>
                                    Đã thanh toán <br/>
                                    20/07/2017 14:13
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Yêu cầu</Table.Cell>
                                <Table.Cell colSpan='2'>Giao trước 5 h</Table.Cell>
                                <Table.Cell colSpan='2'>Lây đầm về</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell colSpan='7'>
                                    <b>Thông tin luân chuyển</b>
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell colSpan='7'>
                                    asdfas fasdfas fasdfa dfasdfsdfsdf asdf asdfawfs dfasdfsdfsdf <br/>
                                    asdfas fasdfas fasdfa dfasdfsdfsdf asdf asdfawfs dfasdfsdfsdf <br/>
                                    asdfas fasdfas fasdfa dfasdfsdfsdf asdf asdfawfs dfasdfsdfsdf <br/>
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell colSpan='7'>
                                    <b>Lịch sử cập nhật</b>
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell colSpan='2'>
                                    19/07 11:01
                                </Table.Cell>
                                <Table.Cell>
                                    Trần điều phối
                                </Table.Cell>
                                <Table.Cell>
                                    Cập nhật
                                </Table.Cell>
                                <Table.Cell>

                                </Table.Cell>
                                <Table.Cell colSpan='2'>
                                    Đã trả
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell colSpan='2'>
                                    19/07 11:01
                                </Table.Cell>
                                <Table.Cell>
                                    Trần điều phối
                                </Table.Cell>
                                <Table.Cell>
                                    Cập nhật
                                </Table.Cell>
                                <Table.Cell>

                                </Table.Cell>
                                <Table.Cell colSpan='2'>
                                    Đã trả
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell colSpan='2'>
                                    19/07 11:01
                                </Table.Cell>
                                <Table.Cell>
                                    Trần điều phối
                                </Table.Cell>
                                <Table.Cell>
                                    Cập nhật
                                </Table.Cell>
                                <Table.Cell>

                                </Table.Cell>
                                <Table.Cell colSpan='2'>
                                    Đã trả
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>
                    </Table>
                </Modal.Content>
            </Modal>
        )
    }
}
