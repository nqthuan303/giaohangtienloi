import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {get, post} from '../../../api/utils/index'
import {geocodeByAddress} from 'react-places-autocomplete';
import {default as ContactInfo} from './ContactInfo';
import {default as BankInfo} from './BankInfo';
import {default as AccountInfo} from './AccountInfo';
import {default as PaymentInfo} from './PaymentInfo';
import { withRouter } from 'react-router'
import {setApiLoading} from '../../../actions/index';
import {toast} from 'react-toastify'

class ShopForm extends React.Component {
    constructor(props) {
        super(props);
        this.shopId = this.props.match.params.shopId;
        this.state = {
            objData: this.initData(),
            districts: []
        }
    }

    initData(){
        return {
            name: '',
            email: '',
            userName: '',
            password: '',
            contactName: '',
            phone: '',
            address: '',
            lat: '',
            lng: '',
            district: '',
            bankName: '',
            descriptionOfGoods: '',
            bankBranch: '',
            bankAccount: '',
            bankNumber: '',
            website: '',
            isCod: false,
            status: true
        }
    }

    componentDidMount() {
        if(this.shopId){
            this.getShopInfo();
        }
        this.getDistrictList();
    }

    async getShopInfo(){
        const result = await get('/client/findOne/' + this.shopId);
        this.setState({objData: result.data.data})
    }

    async getDistrictList() {
        const result = await get('/district/listForSelect');
        this.setState({districts: result.data})
    }

    onChangeAddress = (address) => {
        const {objData} = this.state;
        this.setState({
            objData: { ...objData, address: address }
        });
    }

    onSelectAddress = (address) => {
        const {objData} = this.state
        geocodeByAddress(address, (err, { lat, lng }) => {
            if (err) { return }
            this.setState({
                objData: {
                    ...objData,
                    address: address,
                    lat: lat,
                    lng: lng
                }
            });
        })
    }

    handleChange = (e, { name, value }) => {
        const { objData } = this.state;
        this.setState({objData: {...objData, [name]: value}});
    };

    handleStatus = (e, {name, value}) => {
        const {objData} = this.state;
        this.setState({objData: {...objData, [name]: value === 'active' ? true: false}});
    }

    onChangeOrderType = () => {
        const {objData} = this.state;
        this.setState({objData: {...objData, isCod: !objData.isCod}});
    }

    onClickSave = async () => {
        const {objData} = this.state;
        const url = this.shopId ? '/client/update/' + this.shopId: '/client/add';
        const result = await post(url, objData);
        const resData = result.data;

        if(resData.status === 'success'){
            const message = (this.shopId ? 'Cập nhật': 'Thêm') + ' thành công!';
            this.setState({objData: this.initData()});
            toast.success(message);
        }else {
            toast.error('Đã xảy ra lỗi!!');
        }
    }

    render() {
        const {objData, districts} = this.state;

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <ContactInfo
                            data={objData}
                            districts={districts}
                            onSelectAddress={this.onSelectAddress}
                            handleChange={this.handleChange}
                            onChangeAddress={this.onChangeAddress} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <AccountInfo
                            handleStatus={this.handleStatus}
                            data={objData}
                            handleChange={this.handleChange}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={8}>
                        <BankInfo
                            data={objData}
                            handleChange={this.handleChange}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <PaymentInfo
                            data={objData}
                            onChangeOrderType={this.onChangeOrderType}
                        />
                        <div style={{marginTop: 10}}>
                            <Button type='button' content='Quay lại' icon='reply' labelPosition='right'/>
                            <Button type='button' content="Lưu" icon='checkmark' labelPosition='right' onClick={this.onClickSave} />
                        </div>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setApiLoading: bindActionCreators(setApiLoading, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(withRouter(ShopForm))
