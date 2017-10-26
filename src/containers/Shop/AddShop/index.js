import React from 'react'
import {Tab} from 'semantic-ui-react'
import {default as ShopForm} from '../components/ShopForm';

class AddShop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <ShopForm />
        )
    }
}

export default AddShop
