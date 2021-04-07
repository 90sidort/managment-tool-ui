export const loginQuery = `query loginUser($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    token
    tokenExpiration
    userId
  }
}`