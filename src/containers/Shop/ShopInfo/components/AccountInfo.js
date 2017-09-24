import React from 'react'
import {Header, Segment} from 'semantic-ui-react'

class AccountInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Header as='h3' block>
                    Thông tin tài khoản
                </Header>
                <Segment attached>
                    Thông tin tài khoản
                </Segment>
            </div>
        )
    }
}

export default AccountInfo
