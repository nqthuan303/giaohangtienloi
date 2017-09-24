import React from 'react'
import {Header, Segment} from 'semantic-ui-react'

class PaymentInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Header as='h3' block>
                    Hình thức thanh toán
                </Header>
                <Segment attached>
                    Hình thức thanh toán
                </Segment>
            </div>
        )
    }
}

export default PaymentInfo
