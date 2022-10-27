const userResponse = {
  id: 1,
  username: 'Guilherme',
  role: 'admin',
  email: 'guilhermevkvet22@gmail.com',
};

const tokenResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjY5MDAwNDZ9.LrSHbH1_vIzLFI0owtXV9cVs4nQgx0OOYIyxWuzZXTo',
};

const invalidField = {
  message: 'All fields must be filled',
};

const invalidUser = {
  message: 'Incorrect email or password',
};

const validateUser = {
  role: "admin"
};

export { userResponse, tokenResponse, invalidField, invalidUser, validateUser };