import React from 'react';

import SkillAdd from "./skill.add.jsx"
import graphQLFetch from '../../utils/graphqlFetch.js';
import { loadSkills, updateSkills } from '../../utils/queries/skill.queries.js';
import withToast from '../toast.wrapper.jsx';
import authContext from '../../context/auth.context.js';
import EditableContainer from '../editable.jsx';

class SkillList extends React.Component {
    static contextType = authContext;
    constructor() {
      super();
      this.state = {
        skills: [],
      };
      // this.createSkill = this.createSkill.bind(this);
      this.updateSkill = this.updateSkill.bind(this);
    }
  
    componentDidMount() {
      this.loadSkills();
    }
  
    async loadSkills() {
      const { showError } = this.props;
      const { token } = this.context;
      const query = loadSkills;
      const data = await graphQLFetch(query, {}, showError, token);
      if (data) {
        this.setState({ skills: data.skill });
      } else {
        showError('Unable to load data');
      }
    }
  
    async updateSkill(_id, name){
      const { showError } = this.props;
      const { token } = this.context;
      const query = updateSkills;
      const data = await graphQLFetch(query, { _id, name }, showError, token);
      if (data) {
        this.loadSkills();
      } else {
        showError('Unable to change skill');
      }
    } 
    
    // async createSkill(skill) {
    //   const query = `mutation addNewSkill($skill: SkillInput!) { skillAdd(skill: $skill) {name _id}} `;
  
    //   const response = await fetch(window.ENV.UI_API_ENDPOINT, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ query, variables: { skill } }),
    //   });
    //   const result = await response.json();
  
    //   this.loadSkills();
    // }
  
    render() {
      return (
        <div>
          <h2>Skills</h2>
          <small>Double click on skill to enable edit mode</small>
          <hr/>
          <ul>
            {this.state.skills.map((skill) => (
              <li key={skill._id}>
                <EditableContainer original={skill.name} updateskill={this.updateSkill} id={skill._id}>{skill.name}</EditableContainer>
              </li>
            ))}
          </ul>
          {/* <SkillAdd createSkill={this.createSkill} /> */}
        </div>
      );
    }
  }

const SkillListWithToast = withToast(SkillList);
export default SkillListWithToast;