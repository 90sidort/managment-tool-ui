import React from 'react';
import { Form } from 'react-bootstrap';

import locValidator from '../../utils/validators/loc.validator.js'
import InputForm from '../shared/inputs.shared.jsx';
import ButtonForm from '../shared/buttons.shared.jsx';

export default class LocAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        errors: {}
      }
      this.onLocSubmitHandler = this.onLocSubmitHandler.bind(this);
      this.dismissValidation = this.dismissValidation.bind(this);
    }

    onLocSubmitHandler(e) {
      e.preventDefault();
      const form = document.forms.locAdd;
      const location = {
          address: form.address.value,
          postcode: form.postcode.value,
          city: form.city.value,
          country: form.country.value,
          cid: this.props.cid,
      };
      const errors = locValidator(location)
      if (JSON.stringify(errors) === "{}") {
        this.props.createLocation(location);
        form.address.value = '';
        form.postcode.value = '';
        form.city.value = '';
        form.country.value = '';
      } else this.setState({errors})
    }

    dismissValidation(name) {
      const newErrors = {...this.state.errors}
      delete newErrors[name]
      this.setState({ errors: newErrors });
    }

    render() {
      const { errors } = this.state;
      return (
        <Form horizontal name="locAdd" onSubmit={this.onLocSubmitHandler}>
          <InputForm
            typeElement={"text"}
            nameElement={"address"}
            idElement={"address"}
            placeholderElement={"Provide address"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <InputForm
            typeElement={"text"}
            nameElement={"postcode"}
            idElement={"postcode"}
            placeholderElement={"Provide postcode"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <InputForm
            typeElement={"text"}
            nameElement={"city"}
            idElement={"city"}
            placeholderElement={"Provide city"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <InputForm
            typeElement={"text"}
            nameElement={"country"}
            idElement={"country"}
            placeholderElement={"Provide country"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <ButtonForm
            textButton={'Add location'}
            styleButton={'success'}
            type={'submit'}
          />
        </Form>
      );
    }
  }
