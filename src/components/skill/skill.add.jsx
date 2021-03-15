export default class SkillAdd extends React.Component {
    constructor() {
      super();
      this.onSkillSubmitHandler = this.onSkillSubmitHandler.bind(this);
    }
    onSkillSubmitHandler(e) {
      e.preventDefault();
      const form = document.forms.skillAdd;
      const skill = {
        name: form.name.value,
      };
      this.props.createSkill(skill);
      form.name.value = '';
    }
    render() {
      return (
        <form name="skillAdd" onSubmit={this.onSkillSubmitHandler}>
          <input type="text" name="name" placeholder="skill" />
          <button>Add skill</button>
        </form>
      );
    }
  }