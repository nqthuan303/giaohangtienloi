import React from 'react'
import PropTypes from 'prop-types'
import {Header, Segment, Form, Dropdown, Input, Icon} from 'semantic-ui-react'
import PlacesAutocomplete from 'react-places-autocomplete'

const placesAutocompleteOptions = {
    types: ['address'],
    componentRestrictions: {
        country: 'vn'
    }
}

function ContactInfo (props) {
    const {onChangeAddress, handleChange, data, onSelectAddress, districts} = props;

    const inputProps = {
        value: data.address,
        onChange: onChangeAddress,
        type: 'text',
        placeholder: 'Địa chỉ'
    };

    return (
        <div>
            <Header as='h3' block>
                Thông tin liên hệ
            </Header>
            <Segment attached>
                <Form>
                    <Form.Group width="equal">
                        <Form.Field
                            width={8}
                            onChange={handleChange}
                            name='name'
                            value={data.name}
                            control={Input} placeholder='Tên Shop' />

                        <Form.Field
                            width={8}
                            onChange={handleChange}
                            name='contactName'
                            value={data.contactName}
                            control={Input} placeholder='Người đại diện' />
                    </Form.Group>



                    <Form.Field
                        icon
                        iconPosition='left'
                        onChange={handleChange}
                        name='phone'
                        value={data.phone}
                        control={Input} placeholder='Số điện thoại'>
                        <Icon name='phone' />
                        <input />
                    </Form.Field>

                    <Form.Group width="equal">
                        <Form.Field width={8}>
                            <PlacesAutocomplete
                                classNames={{
                                    autocompleteContainer: 'my-autocomplete-container'
                                }}
                                options={placesAutocompleteOptions}
                                inputProps={inputProps}
                                onSelect={onSelectAddress}/>
                        </Form.Field>
                        <Form.Field width={8}>
                            <Dropdown
                                value={data.district}
                                name="district"
                                onChange={handleChange}
                                placeholder='Quận/Huyện'
                                fluid search selection
                                options={districts}/>
                        </Form.Field>
                    </Form.Group>

                    <Form.Field
                        onChange={handleChange}
                        name='descriptionOfGoods'
                        value={data.descriptionOfGoods}
                        control={Input} placeholder='Mô tả hàng' />
                </Form>
            </Segment>
        </div>
    );
};

ContactInfo.propTypes = {
    onChangeAddress: PropTypes.func,
    data: PropTypes.object,
    districts: PropTypes.array,
    onSelectAddress: PropTypes.func,
    handleChange: PropTypes.func
};

export default ContactInfo
