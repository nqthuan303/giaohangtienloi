import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input} from 'semantic-ui-react'
import {Field} from 'redux-form'

const renderField = (props) => {
    const {componentProps, input, meta: { touched, error, warning }} = props;
    console.log(componentProps);

    return (
        <Form.Field
            {...componentProps}
            {...input}
            control={Input}
        >
        </Form.Field>
    )

}

function FormInput (props) {
    const {componentProps, name, value} = props;

    return (
        <Field
            props={{componentProps}}
            name={name}
            value={value}
            component={renderField}
        />
    );
};

FormInput.propTypes = {
    fieldProps: PropTypes.object
};

export default FormInput
