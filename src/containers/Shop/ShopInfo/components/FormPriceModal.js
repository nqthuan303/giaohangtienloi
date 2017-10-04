import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Input, Dropdown} from 'semantic-ui-react'

function FormPriceModal (props) {
    const {
        show, onModalClose,
        handleChange, data,
        onSubmitForm, districts,
        handleChangeDistrict
    } = props;

    return (
        <Modal size={'tiny'} onClose={onModalClose} open={show}>
            <Modal.Header>Thêm gói cước</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group width="equal">
                        <Form.Field
                            width={8}
                            label={'Khu vực'}
                            onChange={handleChange}
                            name='area'
                            value={data.area}
                            control={Input} placeholder='Nhập khu vực' />

                        <Form.Field
                            width={8}
                            label={'Cước phí'}
                            onChange={handleChange}
                            name='price'
                            value={data.price}
                            control={Input} placeholder='Nhập cước phí' />
                    </Form.Group>

                    <Form.Field>
                        <label>Quận/Huyện</label>
                        <Dropdown
                            name="districts"
                            value={data.districts}
                            onChange={handleChangeDistrict}
                            placeholder='Chọn Quận/Huyện'
                            fluid search selection multiple
                            options={districts}/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button type='button' onClick={onModalClose} negative>Hủy</Button>
                <Button onClick={onSubmitForm} color='green'>Lưu</Button>
            </Modal.Actions>
        </Modal>
    );
};

FormPriceModal.propTypes = {
    data: PropTypes.object.isRequired,
    districts: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleChangeDistrict: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired
};

export default FormPriceModal

