import React from 'react'
import PropTypes from 'prop-types'
import {Header, Segment, Form, Input, Select} from 'semantic-ui-react'

const arrStatus = [
    { key: 'active', value: 'active', text: 'Hoạt động' },
    { key: 'inactive', value: 'inactive', text: 'Không hoạt động' },
];

function AccountInfo (props) {
    const {handleChange, data} = props;
    return (
        <div>
            <Header as='h3' block>
                Thông tin liên hệ
            </Header>
            <Segment attached>
                <Form>
                    <Form.Group width="equal">
                        <Form.Field
                            onChange={handleChange}
                            width={8}
                            name='userName'
                            value={data.userName}
                            control={Input}
                            placeholder='Tên đăng nhập' />
                        <Form.Field
                            onChange={handleChange}
                            width={8}
                            name='phone'
                            value={data.phone}
                            control={Input}
                            placeholder='Số điện thoại' />
                    </Form.Group>
                    <Form.Field
                        onChange={handleChange}
                        name='password'
                        value={data.password}
                        control={Input}
                        placeholder='Mật khẩu' />
                    <Form.Field>
                        <Select
                            name="status"
                            value={data.status}
                            onChange={handleChange}
                            fluid selection
                            options={arrStatus}/>
                    </Form.Field>

                    <Form.Field
                        onChange={handleChange}
                        name='email'
                        value={data.email}
                        control={Input} placeholder='Email' />

                    <Form.Field
                        onChange={handleChange}
                        name='website'
                        value={data.website}
                        control={Input} placeholder='Website' />
                </Form>
            </Segment>
        </div>
    );
};

AccountInfo.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func
};

export default AccountInfo
