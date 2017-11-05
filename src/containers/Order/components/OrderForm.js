import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'redux-form'
import {Grid, Button, Select, Form, Dropdown, Input, Radio, TextArea} from 'semantic-ui-react'
import {get, post} from '../../../api/utils'
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete'
import {toast} from 'react-toastify'
import './OrderForm.css';

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
            priceList: [],
            whoPay: '',
            loading: false,
            objData: {
                bonusFee: 0,
                reciever: {
                    address: ''
                },
                sender: {
                    address: '',
                    phoneNumbers: '',
                    district: '',
                    isCod: false
                },
                goods: {},
                shipFee: 0
            },
            getGoodsBack: false,
            districts: [],
            wards: [],
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

    componentDidUpdate(prevProps, prevState){
        const {objData, priceList} = this.state;
        const {objData: prevObjData, priceList: prevPriceList} = prevState;

        if(priceList.length > 0 && objData.reciever.district){
            if(
                (objData.reciever.district !== prevObjData.reciever.district)||
                (JSON.stringify(priceList) !== JSON.stringify(prevPriceList))
            ){
                this.getShipFee();
            }
        }
    }

    getShipFee(){
        const {objData, priceList} = this.state;
        const {reciever} = objData;
        const {district} = reciever;
        let shipFee = 0;
        for(let i=0; i< priceList.length; i++){
            const objPrice = priceList[i];
            const districtInPrice = objPrice.districts;
            if(districtInPrice.indexOf(district) !== -1){
                shipFee = objPrice.price;
                break;
            }
        }
        this.setState({objData: {...objData, shipFee}});
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

    onChangeDistrict = (e, {name, value}) => {
        const {objData} = this.state;
        this.getWardList(value);
        this.setState({objData: {...objData, [name]: value}});
    }

    async getWardList(districtId){
        const result = await get('/ward/listForSelect?districtId=' + districtId);
        const res = result.data;

        if(res.status === 'success'){
            const {data} = res;
            console.log(data);
            this.setState({wards: data});
        }
    }

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
        const clientSelected = clients[value];
        this.getPrice(value);
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
        });
    }

    async getPrice(shopId){
        const result = await get('/price/list/' + shopId);
        if(result.ok){
            const resData = result.data;
            const data = resData.data;
            this.setState({priceList: data});
        }
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

    changeWhoPay = (e, { value }) => {
        this.setState({whoPay: value});
    }

    render() {
        const {
            objData, whoPay,
            addPhoneNumber, clientOption,
            loading, districts, wards
        } = this.state;

        const {goods} = objData;

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
                                autocompleteContainer: 'my-autocomplete-container',
                                root: 'sender-address'
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

                        <Form.Field inline>
                            <label style={{width: '100px'}}>Số điện thoại (*)</label>
                            <Input
                                style={{width: '70%'}}
                                action={{icon: 'add', type: 'button', onClick: this.onAddPhoneNumber}}
                                onChange={(e) => this.onChangePhoneNumber(e, 0)}
                                name="reciever.phoneNumbers"
                                placeholder='Số điện thoại'/>
                        </Form.Field>

                        {addPhoneNumber
                            ? <Form.Field inline>
                                <label style={{width: '100px'}}>Số điện thoại 1</label>
                                <Input
                                    style={{width: '70%'}}
                                    action={{icon: 'minus', type: 'button', onClick: this.onRemovePhoneNumber}}
                                    onChange={(e) => this.onChangePhoneNumber(e, 1)}
                                    name="reciever.phoneNumbers"
                                    placeholder='Số điện thoại 1'/>
                            </Form.Field> : ''}

                        <Form.Field inline>
                            <label style={{width: '100px'}}>Họ tên (*)</label>
                            <Input
                                style={{width: '70%'}}
                                name="reciever.name"
                                placeholder='Họ tên'
                                onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field inline>
                            <label style={{width: '100px'}}>Địa chỉ (*)</label>
                            <PlacesAutocomplete
                                value={objData.reciever.address}
                                classNames={{
                                    root: 'reciever-address',
                                    autocompleteContainer: 'my-autocomplete-container'
                                }}
                                options={placesAutocompleteOptions}
                                inputProps={recieverInputProps}
                                onSelect={this.onSelectRecieverAddress}/>
                        </Form.Field>

                        <Form.Group>
                            <label style={{width: '110px'}}></label>
                            <Form.Field width={5}>
                                <Dropdown
                                    name="reciever.district"
                                    onChange={this.onChangeDistrict}
                                    placeholder='Quận/Huyện'
                                    fluid search selection
                                    options={districts}/>
                            </Form.Field>
                            <Form.Field width={6}>
                                <Dropdown
                                    name="reciever.ward"
                                    onChange={this.handleChange}
                                    placeholder='Phường/Xã'
                                    fluid search selection
                                    options={wards}/>
                            </Form.Field>
                        </Form.Group>


                        <p style={{fontWeight: 'bold'}}>2. Hàng hóa</p>

                        <Form.Field inline>
                            <label style={{width: '100px'}}>Khối lượng (*)</label>
                            <Input
                                style={{width: '70%'}}
                                name="goods.weight"
                                placeholder='Khối lượng'
                                onChange={this.handleChange}/>

                        </Form.Field>
                        <Form.Group>
                            <label style={{width: '110px', paddingLeft: '5px', fontWeight: 'bold'}}>Quy đổi</label>
                            <Form.Field
                                width={3}
                                type="number"
                                onChange={this.handleChange}
                                name='goods.length'
                                value={goods.length}
                                control={Input} placeholder='Dài'/>
                            <Form.Field
                                width={3}
                                type="number"
                                onChange={this.handleChange}
                                name='goods.width'
                                value={goods.width}
                                control={Input} placeholder='Rộng'/>
                            <Form.Field
                                width={3}
                                type="number"
                                onChange={this.handleChange}
                                name='goods.height'
                                value={goods.height}
                                control={Input} placeholder='Cao'/>
                        </Form.Group>

                        <Form.Field inline>
                            <label style={{width: '100px'}}>Yêu cầu</label>
                            <Input
                                style={{width: '70%'}}
                                name='require'
                                onChange={this.handleChange}
                                placeholder='(Không bắt buộc)'/>
                        </Form.Field>

                        <Form.Group inline>
                            <label style={{width: '100px'}}></label>
                            <Form.Field>
                                <Radio
                                    label='Đổi hàng'
                                    name='whoPay'
                                    value='sender'
                                    checked={whoPay === 'sender'}
                                    onChange={this.changeWhoPay}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Chỉ lấy hàng'
                                    name='whoPay'
                                    value='reciever'
                                    checked={whoPay === 'reciever'}
                                    onChange={this.changeWhoPay}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Field inline>
                            <label style={{width: '100px'}}>Ghi chú</label>
                            <TextArea
                                style={{width: '70%'}}
                                name='note'
                                type="textarea"
                                onChange={this.handleChange} />
                        </Form.Field>


                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <p style={{fontWeight: 'bold'}}>3. Cước phí</p>
                        <Form.Field inline>
                            <label>Phí phụ</label>
                            <Input

                                type="number"
                                name="bonusFee"
                                onChange={this.handleChange}
                                icon='money' iconPosition='left'
                                label={{basic: true, content: 'đ'}}
                                labelPosition='right'
                            />
                        </Form.Field>
                        <p>Phí vận chuyển: {objData.shipFee}</p>
                        <Form.Field>
                            <label>Tổng phí: {Number(objData.shipFee) + Number(objData.bonusFee)}</label>
                        </Form.Field>
                        <p style={{fontWeight: 'bold'}}>4. Thu tiền</p>
                        <Form.Field inline>
                            <label>Tiền hàng</label>
                            <Input
                                type="number"
                                name='goods.value'
                                onChange={this.handleChange}
                                icon='money'
                                iconPosition='left'
                                label={{basic: true, content: 'đ'}}
                                labelPosition='right'
                            />
                        </Form.Field>

                        <Form.Group inline>
                            <Form.Field>
                                <label>Trả cước</label>
                                <Radio
                                    label='Người gửi'
                                    name='whoPay'
                                    value='sender'
                                    checked={whoPay === 'sender'}
                                    onChange={this.changeWhoPay}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Người nhận'
                                    name='whoPay'
                                    value='reciever'
                                    checked={whoPay === 'reciever'}
                                    onChange={this.changeWhoPay}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Field>
                            <label>Thu khách: 0</label>
                        </Form.Field>

                        <Button
                            content='Tạo vận đơn'
                            icon='checkmark'
                            labelPosition='right'/>
                        <Button type='button' content='Quay lại' icon='reply' labelPosition='right'/>
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
