import React from 'react'
import {Header, Segment} from 'semantic-ui-react'

class ContactInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Header as='h3' block>
                    Thông tin liên hệ
                </Header>
                <Segment attached>
                    Thông tin liên hệ
                </Segment>
            </div>
        )
    }
}

export default ContactInfo
