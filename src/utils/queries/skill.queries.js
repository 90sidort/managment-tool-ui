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

export const addSkills = `
  mutation addNewSkill($skill: SkillInput!) {
    skillAdd(skill: $skill) {
      name _id
    }
  }
`

export const deleteSkill = `
  mutation deletSkill($_id: ID!) {
	  skillDelete(_id: $_id )
}`