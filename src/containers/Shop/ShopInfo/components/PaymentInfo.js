import React from 'react'
import PropTypes from 'prop-types'
import {Header, Segment, Checkbox, Form} from 'semantic-ui-react'

function PaymentInfo (props) {
    const {onChangeOrderType, data} = props;
    return (
        <div>
            <Header as='h3' block>
                Tài khoản ngân hàng
            </Header>
            <Segment attached>
                <Form>
                    <Form.Field>
                        <Checkbox onChange={onChangeOrderType} checked={data.isCod} radio label='COD' />
                    </Form.Field>

                    <Form.Field>
                        <Checkbox onChange={onChangeOrderType} checked={!data.isCod} radio label='Tiền mặt' />
                    </Form.Field>
                </Form>
            </Segment>
        </div>
    );
};

PaymentInfo.propTypes = {
    data: PropTypes.object,
    onChangeOrderType: PropTypes.func
};

export default PaymentInfo



