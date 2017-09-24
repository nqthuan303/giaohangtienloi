import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Header, Icon, Modal, Button} from 'semantic-ui-react'

class ConfirmModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    static propTypes = {
        show: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        onConfirm: PropTypes.func.isRequired,
        loading: PropTypes.bool,
        confirmLabel: PropTypes.string,
        cancelLabel: PropTypes.string,
        onModalClose: PropTypes.func.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show !== this.state.show) {
            this.setState({show: nextProps.show})
        }
    }


    showModal = () => {
        const {show} = this.state
        this.setState({show: !show})
        this.props.onModalClose(!show)
    }

    render() {
        const {
            title,
            content,
            onConfirm,
            loading,
            confirmLabel,
            cancelLabel
        } = this.props
        const {show} = this.state
        return (
            <Modal
                size={'mini'}
                open={show}
                onClose={this.showModal}>
                <Header icon='archive' content={title}/>
                <Modal.Content>
                    {content}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.showModal} color='red'>
                        <Icon name='remove'/> {cancelLabel || 'Hủy'}
                    </Button>
                    <Button loading={loading} onClick={onConfirm} color='green'>
                        <Icon name='checkmark'/> {confirmLabel || 'Xác nhận'}
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ConfirmModal
