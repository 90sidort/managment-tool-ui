export const loginQuery = `query loginUser($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    token
    tokenExpiration
    userId
  }
}`

export const addUserQuery = `mutation addUser($user: CreateUserInput!) {
  userAdd(user: $user){
      _id
      name
      surname
      password
  }
}`