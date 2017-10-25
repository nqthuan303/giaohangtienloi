import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {get} from '../../../../api/utils'
import {geocodeByAddress} from 'react-places-autocomplete';
import {default as ContactInfo} from './ContactInfo';
import {default as BankInfo} from './BankInfo';
import {default as AccountInfo} from './AccountInfo';
import {default as PaymentInfo} from './PaymentInfo';
import { withRouter } from 'react-router'
import {setApiLoading} from '../../../../actions';

class GeneralInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objData: {
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
                status: 'active'
            },
            districts: []
        }
    }

    componentDidMount() {
        this.getShopInfo();
        this.getDistrictList();
    }

    async getShopInfo(){
        const {shopId} = this.props.match.params;

        const {setApiLoading} = this.props;

        // setApiLoading(true);
        const result = await get('/client/findOne/' + shopId);
        console.log(123)
        // setApiLoading(false);

        this.setState({objData: result.data.data})
    }

    async getDistrictList() {
        // const {setApiLoading} = this.props;

        // setApiLoading(true);
        const result = await get('/district/listForSelect');
        // setApiLoading(false);

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

    onChangeOrderType = () => {
        const {objData} = this.state;
        this.setState({objData: {...objData, isCod: !objData.isCod}});
    }

    onClickUpdate = async () => {
        const {objData} = this.state;
        const {setApiLoading} = this.props;
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
                        <Button
                            onClick={this.onClickUpdate}
                            className="btn-update">
                            Cập nhật
                        </Button>
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

export default connect(null, mapDispatchToProps)(withRouter(GeneralInfo))
