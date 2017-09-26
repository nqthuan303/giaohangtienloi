import React from 'react'
import PropTypes from 'prop-types'
import {Header, Segment, Form, Input} from 'semantic-ui-react'

function BankInfo (props) {
    const {handleChange, data} = props;
    return (
        <div>
            <Header as='h3' block>
                Tài khoản ngân hàng
            </Header>
            <Segment attached>
                <Form>
                    <Form.Field
                        onChange={handleChange}
                        name='bankName'
                        value={data.bankName}
                        control={Input} placeholder='Ngân hàng' />

                    <Form.Field
                        onChange={handleChange}
                        name='bankBranch'
                        value={data.bankBranch}
                        control={Input} placeholder='Chi nhánh' />

                    <Form.Field
                        onChange={handleChange}
                        name='bankAccount'
                        value={data.bankAccount}
                        control={Input} placeholder='Chủ tài khoản' />

                    <Form.Field
                        onChange={handleChange}
                        name='bankNumber'
                        value={data.bankNumber}
                        control={Input} placeholder='Số tài khoản' />
                </Form>
            </Segment>
        </div>
    );
};

BankInfo.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func
};

export default BankInfo
