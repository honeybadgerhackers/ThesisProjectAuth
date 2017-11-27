function loginUser(user, token) {
  return {
    type: 'LOGIN_USER',
    user,
    token,
  };
}

function logoutUser(user, token) {
  return {
    type: 'LOGOUT_USER',
  };
}
