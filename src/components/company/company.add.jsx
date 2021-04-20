import React from 'react';
import { Form } from 'react-bootstrap';

import companyValidator from '../../utils/validators/company.validator.js';
import InputForm from '../shared/inputs.shared.jsx';
import ButtonForm from '../shared/buttons.shared.jsx';

export default class CompanyAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        errors: {}
      }
      this.onCompanySubmitHandler = this.onCompanySubmitHandler.bind(this);
      this.dismissValidation = this.dismissValidation.bind(this);
    }

    onCompanySubmitHandler(e) {
      e.preventDefault();
      const form = document.forms.companyAdd;
      const company = {
          name: form.name.value,
          description: form.description.value,
          industry: form.industry.value === "-1" ? "" : form.industry.value,
      };
      const errors = companyValidator(company)
      if (JSON.stringify(errors) === "{}") {
        this.props.createCompany(company);
        form.name.value = '';
        form.description.value = '';
        form.industry.value = -1;
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
        <Form horizontal name="companyAdd" onSubmit={this.onCompanySubmitHandler}>
          <InputForm
            typeElement={"text"}
            nameElement={"name"}
            idElement={"name"}
            placeholderElement={"Provide company name"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <InputForm
            typeElement={"select"}
            nameElement={"industry"}
            idElement={"industry"}
            placeholderElement={"Select industry"}
            defaultValue={-1}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
            optionsElement={['Services', 'Agriculture', 'Manufacturing']}
          />
          <InputForm
            typeElement={"text"}
            nameElement={"description"}
            idElement={"description"}
            placeholderElement={"Provide company description"}
            errorsElement={errors}
            dismissHandler= {this.dismissValidation}
          />
          <ButtonForm
            textButton={'Add company'}
            styleButton={'success'}
            type={'submit'}
          />
        </Form>
      );
    }
  }
