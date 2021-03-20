import React from 'react'
import graphQLFetch from '../../utils/graphqlFetch'

export default class JobPanel extends React.Component {
    constructor(){
        super()
        this.state = {
            job: {}
        }
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (prevId !== id) {
          this.loadData();
        }
      }

      async loadData() {
        const _id = this.props.match.params.id
        console.log(_id);
        const query = `
        query getJob($_id: ID, $currency: String, $status: String) {
            job(_id: $_id, currency: $currency, status: $status) {
              _id
              description
            }
          }`;
          const data = await graphQLFetch(query, { _id });
          if (data) {
            console.log(data.job);
            this.setState({ job: data.job[0] });
          } else {
            this.setState({ job: {} });
          }
      }

    render(){
        console.log(this.state);
        const desc = this.state.job.description
        return (
            <div>
                <p>Placeholder {desc}</p>
            </div>
        )
    }
}