import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button} from 'semantic-ui-react'
import ClientOrderInModal from './ClientOrderInModal'

export default class PickupDetailModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      clientOrders: []
    }
  }

  static propTypes = {
    show: PropTypes.bool,
    shipperId: PropTypes.string,
    shipperName: PropTypes.string,
    onShowModal: PropTypes.func
  }

  render () {
    const {shipperId, shipperName} = this.props

    return (
      <Modal
        onClose={() => this.props.onShowModal()}
        open={this.props.show}>
        <Modal.Header>{shipperName}</Modal.Header>
        <Modal.Content>
          <ClientOrderInModal shipperId={shipperId} />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.onShowModal} negative>Ok</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
