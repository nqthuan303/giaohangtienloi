import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'redux-form'
import {Grid, Button, Select, Form, Dropdown, Input} from 'semantic-ui-react'
import {get, post} from '../../../api/utils'
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete'
import {toast} from 'react-toastify'

let clients = {}

const orderTypes = [
    {key: 'cod', value: 'cod', text: 'COD'},
    {key: 'ung', value: 'ung', text: 'Ứng'}
]

const placesAutocompleteOptions = {
    types: ['address'],
    componentRestrictions: {
        country: 'vn'
    }
}

class OrderForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            objData: {
                reciever: {
                    address: ''
                },
                sender: {
                    address: '',
                    phoneNumbers: '',
                    district: '',
                    isCod: false
                }
            },
            getGoodsBack: false,
            districts: [],
            clientOption: [],
            addPhoneNumber: false
        }
    }

    componentDidMount() {
        this.getDistrictList()
        this.getClientList()
    }

    componentWillReceiveProps(nextProps) {
        const {loading} = this.props

        if (loading !== nextProps.loading) {
            this.setState({loading: nextProps.loading})
        }
    }

    onChangeGetGooodsBack = () => {
        this.setState({
            getGoodsBack: !this.state.getGoodsBack
        })
    }

    onSubmitForm = async (e) => {
        const {objData} = this.state;
        const {onSave} = this.props;

        this.setState({loading: true});
        const result = await post('/order/add', objData);
        this.setState({loading: false});
        const data = result.data;

        if(data.status === 'success'){
            toast.success('Thêm đơn hàng thành công');
            onSave(data.data);
        }
    }

    handleChange = (e, {name, value}) => {
        const {objData} = this.state

        if (name.indexOf('.') === -1) {
            this.setState({objData: {...objData, [name]: value}})
        } else {
            const arrName = name.split('.')
            const parent = arrName[0]
            const child = arrName[1]

            this.setState({
                objData:
                    {...objData, [parent]: {...objData[parent], [child]: value}}
            })
        }
    };

    onChangeRecieverAddress = (address) => {
        const {objData} = this.state

        this.setState({
            objData: {
                ...objData,
                reciever: {
                    ...objData.reciever, address: address
                }
            }
        })
    }

    onSelectRecieverAddress = (address) => {
        const {objData} = this.state

        geocodeByAddress(address, (err, {lat, lng}) => {
            if (err) {
                return
            }
            this.setState({
                objData: {
                    ...objData,
                    reciever: {
                        ...objData.reciever,
                        address: address,
                        lat: lat,
                        lng: lng
                    }
                }
            })
        })
    }

    onSelectSenderAddress = (address) => {
        const {objData} = this.state

        geocodeByAddress(address, (err, {lat, lng}) => {
            if (err) {
                return
            }
            this.setState({
                objData: {
                    ...objData,
                    sender: {
                        ...objData.sender,
                        address: address,
                        lat: lat,
                        lng: lng
                    }
                }
            })
        })
    }

    onRemovePhoneNumber = () => {
        const {objData} = this.state
        const phoneNumbers = objData.reciever.phoneNumbers
        if (phoneNumbers) {
            phoneNumbers.splice(1, 1)

            this.setState({
                objData: {...objData, reciever: {...objData.reciever, phoneNumbers: phoneNumbers}}
            })
        }

        this.setState({addPhoneNumber: false})
    }

    onAddPhoneNumber = () => {
        this.setState({addPhoneNumber: true})
    }

    onChangePhoneNumber(e, index) {
        const value = e.target.value
        const {objData} = this.state
        const phoneNumbers = objData.reciever.phoneNumbers || []

        if (phoneNumbers[index]) {
            phoneNumbers[index] = value
        } else {
            phoneNumbers.push(value)
        }

        this.setState({
            objData: {...objData, reciever: {...objData.reciever, phoneNumbers: phoneNumbers}}
        })
    }

    onChangeSenderAddress = (address) => {
        this.setState({
            objData: {
                ...this.state.objData,
                sender: {
                    ...this.state.objData.sender, address: address
                }
            }
        })
    }

    getDistrictList() {
        get('/district/listForSelect').then((result) => {
            this.setState({districts: result.data})
        })
    }

    getClientList() {
        get('/client/listForSelect').then((result) => {
            const datas = result.data
            let clientOption = []
            for (let i = 0; i < datas.length; i++) {
                const data = datas[i]
                clients[data.key] = data
                clientOption.push({
                    key: data.key,
                    value: data.value,
                    text: data.text
                })
            }
            this.setState({clientOption: clientOption})
        })
    }

    onSelectClient = (e, {name, value}) => {
        const {objData} = this.state

        if (value === objData.client) {
            return
        }
        const clientSelected = clients[value]

        this.setState({
            objData: {
                ...objData,
                client: value,
                sender: {
                    phoneNumbers: clientSelected.phone,
                    address: clientSelected.address,
                    district: clientSelected.district,
                    isCod: clientSelected.isCod
                }
            }
        })
    }

    onChangeOrderType = (e, {name, value}) => {
        const isCod = (value === 'cod');
        const {objData} = this.state;
        const {sender} = objData;

        this.setState({
            objData: {...objData, sender: {
                ...sender, isCod: isCod
            }}
        });
    }

    render() {
        const {
            objData,
            addPhoneNumber, clientOption,
            loading, districts, getGoodsBack
        } = this.state

        const senderInputProps = {
            value: objData.sender.address,
            onChange: this.onChangeSenderAddress,
            type: 'text',
            placeholder: 'Địa chỉ người gửi'
        }

        const recieverInputProps = {
            value: objData.reciever.address,
            onChange: this.onChangeRecieverAddress,
            type: 'text',
            placeholder: 'Địa chỉ'
        }
        const orderType = objData.sender.isCod ? 'cod': 'ung';

        return (
            <Form loading={loading} onSubmit={this.onSubmitForm}>
                <Form.Group widths='equal'>

                    <Form.Field width={2}>
                        <Dropdown
                            onChange={this.onSelectClient}
                            name='client'
                            fluid search selection
                            placeholder='Người gửi' options={clientOption}/>
                    </Form.Field>

                    <Form.Field
                        onChange={this.handleChange}
                        name='sender.phoneNumbers' width={2}
                        value={objData.sender.phoneNumbers}
                        control={Input} placeholder='SĐT người gửi'/>

                    <Form.Field width={3}>
                        <PlacesAutocomplete
                            value={objData.sender.address}
                            classNames={{
                                autocompleteContainer: 'my-autocomplete-container'
                            }}
                            options={placesAutocompleteOptions}
                            inputProps={senderInputProps}
                            onSelect={this.onSelectSenderAddress}/>
                    </Form.Field>
                    <Form.Field width={3}>
                        <Dropdown
                            onChange={this.handleChange}
                            value={objData.sender.district}
                            name='sender.district'
                            placeholder='Quận/Huyện'
                            fluid search selection options={districts}/>
                    </Form.Field>
                    <Form.Field width={3}>
                        <Select
                            onChange={this.onChangeOrderType}
                            placeholder='Chọn loại đơn'
                            value={orderType}
                            options={orderTypes}/>
                    </Form.Field>
                    <Form.Field width={3}>
                        <Button
                            type='button'
                            toggle
                            onClick={() => this.props.saveOrder()}
                            content='Kết thúc'
                            icon='save'
                            labelPosition='right'/>
                    </Form.Field>
                </Form.Group>
                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <p style={{fontWeight: 'bold'}}>1. Người nhận</p>
                        <Form.Field width={12}>
                            <Form.Input
                                name="reciever.name"
                                label='Họ tên'
                                placeholder='Họ tên'
                                onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field width={12}>
                            <label>Số điện thoại</label>
                            <Input
                                action={{icon: 'add', type: 'button', onClick: this.onAddPhoneNumber}}
                                onChange={(e) => this.onChangePhoneNumber(e, 0)}
                                name="reciever.phoneNumbers"
                                placeholder='Số điện thoại'/>
                        </Form.Field>

                        {addPhoneNumber
                            ? <Form.Field width={12}>
                                <label>Số điện thoại 1</label>
                                <Input
                                    action={{icon: 'minus', type: 'button', onClick: this.onRemovePhoneNumber}}
                                    onChange={(e) => this.onChangePhoneNumber(e, 1)}
                                    name="reciever.phoneNumbers"
                                    placeholder='Số điện thoại 1'/>
                            </Form.Field> : ''}

                        <Form.Group width="equal">
                            <Form.Field width={8}>
                                <label>Địa chỉ</label>
                                <PlacesAutocomplete
                                    value={objData.reciever.address}
                                    classNames={{
                                        autocompleteContainer: 'my-autocomplete-container'
                                    }}
                                    options={placesAutocompleteOptions}
                                    inputProps={recieverInputProps}
                                    onSelect={this.onSelectRecieverAddress}/>
                            </Form.Field>
                            <Form.Field width={8}>
                                <label>Quận/Huyện</label>
                                <Dropdown
                                    name="reciever.district"
                                    onChange={this.handleChange}
                                    placeholder='Chọn Quận/Huyện'
                                    fluid search selection
                                    options={districts}/>
                            </Form.Field>
                        </Form.Group>

                        <p style={{fontWeight: 'bold'}}>2. Hàng hóa</p>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Form.Input
                                    name="goodsName"
                                    onChange={this.handleChange}
                                    label='Tên hàng' placeholder='Tên hàng'/>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    name='goodsValue'
                                    onChange={this.handleChange}
                                    label='Trị giá hàng'
                                    placeholder='Trị giá hàng'/>
                            </Form.Field>
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Field width={8}>
                                <Form.Radio toggle onChange={this.onChangeGetGooodsBack}/>
                            </Form.Field>
                            <Form.Field width={8}>
                                <Form.Input name="goodsBackDesc" disabled={!getGoodsBack} placeholder='Lấy hàng về'/>
                            </Form.Field>

                        </Form.Group>

                        <Form.Field>
                            <Form.Input
                                name='require'
                                onChange={this.handleChange}
                                label='Yêu cầu lúc giao'
                                placeholder='(Không bắt buộc)'/>
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <p style={{fontWeight: 'bold'}}>3. Cước phí</p>
                        <Form.Field>
                            Phí vận chuyển: 123
                        </Form.Field>
                        <Form.Field inline>
                            <label>Phí phụ</label>
                            <Input
                                icon='money' iconPosition='left'
                                label={{basic: true, content: 'đ'}}
                                labelPosition='right'
                            />

                        </Form.Field>
                        <p><i>Điều chỉnh theo đơn hàng thực tế</i></p>
                        <Form.Field>
                            <label>Tổng phí: 2000</label>
                        </Form.Field>
                        <p style={{fontWeight: 'bold'}}>4. Hình thức thu tiền</p>

                        <Button
                            content='Tạo vận đơn'
                            icon='checkmark'
                            labelPosition='right'/>
                        <Button type='button' content='Quay lại' icon='cancel' labelPosition='right'/>
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}

OrderForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    saveOrder: PropTypes.func,
    loading: PropTypes.bool
}

const x = reduxForm({
    form: 'order'
})(OrderForm)

export default x
