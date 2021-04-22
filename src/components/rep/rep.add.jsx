import React from 'react';
import { Form } from 'react-bootstrap';

import repValidator from '../../utils/validators/rep.validator.js';
import InputForm from '../shared/inputs.shared.jsx';
import ButtonForm from '../shared/buttons.shared.jsx';

export default class CompanyAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        errors: {}
      }
      this.onRepSubmitHandler = this.onRepSubmitHandler.bind(this);
      this.dismissValidation = this.dismissValidation.bind(this);
    }

    onRepSubmitHandler(e) {
        const { cid } = this.props
      e.preventDefault();
      const form = document.forms.addRep;
      const rep = {
          representative : {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                cid
            },
      };
      const errors = repValidator(rep.representative)
      if (JSON.stringify(errors) === "{}") {
        this.props.createRep(rep);
        form.name.value = '';
        form.email.value = '';
        form.phone.value = '';
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
        <Form horizontal name="addRep" onSubmit={this.onRepSubmitHandler}>
          <InputForm
            typeElement={"text"}
            nameElement={"name"}
            idElement={"name"}
            placeholderElement={"Provide representative name"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <InputForm
            typeElement={"text"}
            nameElement={"email"}
            idElement={"email"}
            placeholderElement={"Provide representative email"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <InputForm
            typeElement={"text"}
            nameElement={"phone"}
            idElement={"phone"}
            placeholderElement={"Provide representative phone"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <ButtonForm
            textButton={'Add representative'}
            styleButton={'success'}
            type={'submit'}
          />
        </Form>
      );
    }
  }
