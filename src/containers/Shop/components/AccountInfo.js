import React from 'react'
import PropTypes from 'prop-types'
import {Header, Segment, Form, Input, Select, Icon} from 'semantic-ui-react'

const arrStatus = [
    { key: 'active', value: 'active', text: 'Hoạt động' },
    { key: 'inactive', value: 'inactive', text: 'Không hoạt động' },
];

function AccountInfo (props) {
    const {handleChange, data, handleStatus} = props;
    return (
        <div>
            <Header as='h3' block>
                Thông tin tài khoản
            </Header>
            <Segment attached>
                <Form>
                    <Form.Group width="equal">
                        <Form.Field
                            icon
                            iconPosition='left'
                            width={8}
                            onChange={handleChange}
                            name='userName'
                            value={data.userName}
                            control={Input}
                            placeholder='Tên đăng nhập'>
                            <Icon name='user circle' />
                            <input />
                        </Form.Field>
                        <Form.Field
                            icon
                            iconPosition='left'
                            onChange={handleChange}
                            type="password"
                            width={8}
                            name='password'
                            value={data.password}
                            control={Input}
                            placeholder='Mật khẩu'>
                            <Icon name='key' />
                            <input />
                        </Form.Field>
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
                        <Icon name='mail outline' />
                        <input />
                    </Form.Field>

                    <Form.Field
                        icon
                        iconPosition='left'
                        onChange={handleChange}
                        name='website'
                        value={data.website}
                        control={Input} placeholder='Website'>
                        <Icon name='linkify' />
                        <input />
                    </Form.Field>
                    <Form.Field>
                        <Select
                            name="status"
                            value={data.status ? 'active': 'inactive'}
                            onChange={handleStatus}
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
