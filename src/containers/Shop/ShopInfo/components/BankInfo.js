import React from 'react'
import {Header, Segment} from 'semantic-ui-react'

class BankInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Header as='h3' block>
                    Tài khoản ngân hàng
                </Header>
                <Segment attached>
                    Tài khoản ngân hàng
                </Segment>
            </div>
        )
    }
}

export default BankInfo
