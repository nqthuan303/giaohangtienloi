import React, {Component} from 'react'

import { get, post } from '../../api/utils'
import TempOrder from './components/TempOrder'
import OrderForm from './components/OrderForm'
import './AddOrder.css'
import { toast } from 'react-toastify'

class AddOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      tempOrders: [],
      inProcessIds: []
    }
  }

  componentDidMount () {
    this.getTempOrderList()
  }

  getTempOrderList = () => {
    get('/order/list?status=temp').then((result) => {
      const data = result.data.data
      let inProcessIds = []

      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        inProcessIds.push(item._id)
      }
      this.setState({
        inProcessIds: inProcessIds,
        tempOrders: data
      })
    })
  }

  saveOrder = () => {
    const {inProcessIds} = this.state
    this.setState({loading: true});
    post('/order/setStatus?status=pending', inProcessIds).then((result) => {
      this.setState({loading: false})
      const data = result.data
      if (data.status === 'success') {
        toast.success(data.data.message);

        this.getTempOrderList()
      }
    })
  }

  onSaveTempOrder = (data) => {
    let {tempOrders, inProcessIds} = this.state;
    tempOrders.unshift(data);
    inProcessIds.unshift(data._id);
    this.setState({
        tempOrders,
        inProcessIds
    });
  }

  removeOrder = (id) => {
    let inProcessIds = []
    let tempOrders = []

    for (let i = 0; i < this.state.tempOrders.length; i++) {
      const item = this.state.tempOrders[i]
      if (item._id !== id) {
        tempOrders.push(item)
        inProcessIds.push(item._id)
      }
    }
    this.setState({
      inProcessIds: inProcessIds,
      tempOrders: tempOrders
    })
  }

  render () {
    const { tempOrders, loading } = this.state
    return (
      <div>
        <OrderForm
          loading={loading}
          onSave={this.onSaveTempOrder}
          saveOrder={this.saveOrder}
        />
        <TempOrder removeOrder={this.removeOrder} data={tempOrders} />
      </div>
    )
  }
}
export default AddOrder
