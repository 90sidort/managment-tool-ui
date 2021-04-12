import React from 'react';

import SkillAdd from "./skill.add.jsx"
import graphQLFetch from '../../utils/graphqlFetch.js';
import { loadSkills, updateSkills, addSkills, deleteSkill } from '../../utils/queries/skill.queries.js';
import withToast from '../toast.wrapper.jsx';
import authContext from '../../context/auth.context.js';
import EditableContainer from '../editable.jsx';
import { Button } from 'react-bootstrap';

class SkillList extends React.Component {
    static contextType = authContext;
    constructor() {
      super();
      this.state = {
        skills: [],
      };
      this.addSkill = this.addSkill.bind(this);
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

    async addSkill(skill) {
      const { showError } = this.props;
      const { token } = this.context;
      const query = addSkills;
      const data = await graphQLFetch(query, skill, showError, token);
      if (data) this.loadSkills();
      else showError('Unable to add skill');
    }

    async deleteSkill(_id) {
      const { showError } = this.props;
      const { token } = this.context;
      const query = deleteSkill;
      const data = await graphQLFetch(query, { _id }, showError, token);
      if (data) {
        if(data.skillDelete === true) this.loadSkills();
        else showError('Unable to delete - skill is used in job offers.');
      } else {
        showError('Unable to delete - server error.');
      }
    }
  
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
                {" "}
                <Button bsStyle="danger" bsSize="xs" onClick={() => this.deleteSkill(skill._id)}>x</Button>
              </li>
            ))}
          </ul>
          <SkillAdd createSkill={this.addSkill} />
        </div>
      );
    }
  }

const SkillListWithToast = withToast(SkillList);
export default SkillListWithToast;