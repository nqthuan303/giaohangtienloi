import React from 'react';
import {Grid} from 'semantic-ui-react';
import {get} from '../../../../api/utils'
import {geocodeByAddress} from 'react-places-autocomplete';
import {default as ContactInfo} from './ContactInfo';
import {default as BankInfo} from './BankInfo';
import {default as AccountInfo} from './AccountInfo';
import {default as PaymentInfo} from './PaymentInfo';

class GeneralInfo extends React.Component {
    constructor(props) {
        super(props)
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
                status: 'active'
            },
            districts: []
        }
    }

    componentDidMount() {
        this.getDistrictList()
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
        const { objData } = this.state
        this.setState({objData: {...objData, [name]: value}})
    };

    render() {
        const {objData, districts} = this.state;
        console.log(objData);

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
                        <PaymentInfo />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default GeneralInfo
