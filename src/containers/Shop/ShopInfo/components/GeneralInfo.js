import React from 'react';
import {Grid} from 'semantic-ui-react';
import {get} from '../../../../api/utils'
import {geocodeByAddress} from 'react-places-autocomplete';
import {default as ContactInfo} from './ContactInfo';
import {default as BankInfo} from './BankInfo';
import {default as AccountInfo} from './AccountInfo';
import {default as PaymentInfo} from './PaymentInfo';
import { withRouter } from 'react-router'

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

    getShopInfo(){
        const {shopId} = this.props.match.params;
        get('/client/findOne/' + shopId).then((result) => {
            this.setState({objData: result.data.data})
        })
    }

    getDistrictList() {
        get('/district/listForSelect').then((result) => {
            this.setState({districts: result.data})
        })
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
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default withRouter(GeneralInfo)
