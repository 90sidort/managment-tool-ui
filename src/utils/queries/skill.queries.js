export const loadSkills = `
  query getSkills {
    skill {
      _id
      name
  }
}`

export const updateSkills = `
mutation updateSkill($_id: ID!, $name: String!) {
  skillUpdate(_id: $_id, name:$name) {
    name
    _id
  }
}`