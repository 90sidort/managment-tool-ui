import React from 'react';

export default function withElAdd(OriginalComponent) {
    return class ElAddWrapper extends React.Component {
      constructor(props) {
        super(props);
      }
  
      dismissValidation(name) {
        const newErrors = {...this.state.errors}
        delete newErrors[name]
        this.setState({ errors: newErrors });
      }
  
      render() {
        return (
          <React.Fragment>
            <OriginalComponent
              {...this.props}
            />
          </React.Fragment>
        );
      }
    };
  }