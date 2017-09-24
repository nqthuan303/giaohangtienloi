import React from 'react'
import {Grid, Header, Segment} from 'semantic-ui-react'
import {default as ContactInfo} from './ContactInfo';
import {default as BankInfo} from './BankInfo';
import {default as AccountInfo} from './AccountInfo';
import {default as PaymentInfo} from './PaymentInfo';

class GeneralInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <ContactInfo />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <AccountInfo />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={8}>
                        <BankInfo />
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
