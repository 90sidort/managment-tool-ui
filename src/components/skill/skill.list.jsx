import SkillAdd from "./skill.add"

export default class SkillList extends React.Component {
    constructor() {
      super();
      this.state = {
        skills: [],
      };
      this.createSkill = this.createSkill.bind(this);
    }
  
    componentDidMount() {
      this.loadSkills();
    }
  
    async loadSkills() {
      const query = `query {
        skill {
          _id
          name
        }
      }`;
      const response = await fetch(window.ENV.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      this.setState({ skills: result.data.skill });
    }
  
    async createSkill(skill) {
      const query = `mutation addNewSkill($skill: SkillInput!) { skillAdd(skill: $skill) {name _id}} `;
  
      const response = await fetch(window.ENV.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { skill } }),
      });
      const result = await response.json();
  
      this.loadSkills();
    }
  
    render() {
      return (
        <div>
          <h2>Skills</h2>
          <ul>
            {this.state.skills.map((skill) => (
              <li key={skill._id}>{skill.name}</li>
            ))}
          </ul>
          <SkillAdd createSkill={this.createSkill} />
        </div>
      );
    }
  }