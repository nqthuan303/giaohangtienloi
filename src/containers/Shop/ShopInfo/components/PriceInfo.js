import React from 'react'
import {Table, Button, Icon} from 'semantic-ui-react'
import { withRouter } from 'react-router'
import {get, post, del} from '../../../../api/utils'
import {ConfirmModal} from '../../../../components'
import {default as FormPriceModal} from './FormPriceModal'
import {toast} from 'react-toastify'

class PriceInfo extends React.Component {
    constructor(props) {
        super(props)
        this.shopId = props.match.params.shopId;

        this.state = {
            confirmLoading: false,
            confirmModal: false,
            districts: [],
            prices: [],
            objData: {
                districts: [],
                area: '',
                price: 0
            },
            showModal: false
        }
    }

    componentDidMount() {
        this.getPrice();
        this.getDistrictList();
    }

    async getDistrictList() {
        const result = await get('/district/listForSelect');
        this.setState({districts: result.data})
    }

    async getPrice(){
        const result = await get('/price/list/' + this.shopId);
        const resData = result.data;

        if(resData.status === 'success'){
            this.setState({prices: result.data.data})
        }
    }

    onModalClose = () => {
        this.selectedItem = null;
        this.setState({showModal: false});
    }

    handleChange = (e, { name, value }) => {
        const { objData } = this.state;
        this.setState({objData: {...objData, [name]: value}});
    };

    handleChangeDistrict = (e, { name, value }) => {
        const { objData } = this.state;

        this.setState({
            objData: {
                ...objData,
                districts: value
            }
        })
    }

    onSubmitForm = async () => {
        const {objData} = this.state;
        const client = this.shopId;
        let url = '/price/add';
        const data = {...objData, client};

        if(this.selectedItem){
            url = '/price/update/' + this.selectedItem.id;
        }

        const result = await post(url, data);

        const resData = result.data;

        if(resData.status === 'success'){
            this.setState({showModal: false});
            let {prices} = this.state;
            const dataItem = resData.data;
            let message = '';

            if(this.selectedItem){
                message = 'Cập nhật thành công!'
                prices[this.selectedItem.index] = dataItem
            }else {
                message = 'Thêm thành công!'
                prices.unshift(dataItem);
            }

            this.setState({prices});
            toast.success(message);
        }else {
            toast.error('Đã xảy ra lỗi!')
        }

    }

    onClickEdit (item, index) {
        this.selectedItem = {id: item._id, index};

        this.setState({
            objData: {
                districts: item.districts,
                area: item.area,
                price: item.price
            },
            showModal: true
        })
    }

    onClickDelete (id, index) {
        this.selectedItem = {
            id,
            index
        }
        this.setState({
            confirmModal: true
        })
    }

    confirmDelete = async () => {
        this.setState({confirmLoading: true});
        const result = await del('/price/delete/' + this.selectedItem.id);
        const resData = result.data;

        if(resData.status === 'success'){
            const {prices} = this.state;
            delete prices[this.selectedItem['index']];
            this.setState({
                prices,
                confirmModal: false,
                confirmLoading: false
            });
            toast.success('Xóa khu vực thành công!');
        }else {
            toast.error('Đã xảy ra lỗi trong quá trình xóa!')
        }

    }

    onClickAdd = () => {

        this.setState({
            showModal: true,
            objData: {
                districts: [],
                area: '',
                price: 0
            }
        })
    }


    renderData(){
        const {prices} = this.state;
        return prices.map((item, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell>{item.area}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>{item.strDistrict}</Table.Cell>
                    <Table.Cell>
                        <Icon onClick={() => this.onClickEdit(item, i)} name={'edit'} />
                        <Icon onClick={() => this.onClickDelete(item._id, i)} name={'delete'} />
                    </Table.Cell>
                </Table.Row>
            );
        });
    }

    render() {
        const {showModal, objData, districts, confirmLoading, confirmModal} = this.state;
        return (
            <div>
                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Khu vực</Table.HeaderCell>
                            <Table.HeaderCell>Cước phí</Table.HeaderCell>
                            <Table.HeaderCell>Quận</Table.HeaderCell>
                            <Table.HeaderCell>Lựa chọn</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderData()}
                    </Table.Body>
                </Table>
                <div style={{height: 40}}>
                    <Button onClick={this.onClickAdd} animated="vertical" floated="right">
                        <Button.Content hidden>
                            <Icon name="add" />
                        </Button.Content>
                        <Button.Content visible>
                            Thêm
                        </Button.Content>
                    </Button>
                </div>

                <FormPriceModal
                    show={showModal}
                    districts={districts}
                    onSubmitForm={this.onSubmitForm}
                    data={objData}
                    handleChangeDistrict={this.handleChangeDistrict}
                    handleChange={this.handleChange}
                    onModalClose={this.onModalClose}
                />

                <ConfirmModal
                    onModalClose={this.onModalClose}
                    loading={confirmLoading}
                    onConfirm={this.confirmDelete}
                    title="Xóa khu vực này"
                    content="Bạn có chắc không??"
                    show={confirmModal}/>
            </div>
        )
    }
}

export default withRouter(PriceInfo)
