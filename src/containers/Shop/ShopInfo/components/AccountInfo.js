import React from 'react'
import PropTypes from 'prop-types'
import {Header, Segment, Form, Input, Select, Icon} from 'semantic-ui-react'

const arrStatus = [
    { key: 'active', value: 'active', text: 'Hoạt động' },
    { key: 'inactive', value: 'inactive', text: 'Không hoạt động' },
];

function AccountInfo (props) {
    const {handleChange, data} = props;
    return (
        <div>
            <Header as='h3' block>
                Thông tin tài khoản
            </Header>
            <Segment attached>
                <Form>
                    <Form.Group width="equal">
                        <Form.Field
                            width={8}
                            name='userName'
                            value={data.userName}
                            control={Input}
                            placeholder='Tên đăng nhập' />
                        <Form.Field
                            onChange={handleChange}
                            type="password"
                            width={8}
                            name='password'
                            value={data.password}
                            control={Input}
                            placeholder='Mật khẩu' />
                    </Form.Group>
                    <Form.Field
                        icon
                        iconPosition='left'
                        onChange={handleChange}
                        name='email'
                        value={data.email}
                        placeholder='Email'
                        control={Input}
                    >
                        <Icon name='at' />
                        <input />
                    </Form.Field>

                    <Form.Field
                        onChange={handleChange}
                        name='website'
                        value={data.website}
                        control={Input} placeholder='Website' />
                    <Form.Field>
                        <Select
                            name="status"
                            value={data.status}
                            onChange={handleChange}
                            fluid selection
                            options={arrStatus}/>
                    </Form.Field>
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
