export const loginUser = (user) => {
  return {
    type: 'LOGIN',
    user,
  };
};

export const logoutUser = (user) => {
  return {
    type: 'LOGOUT',
  };
};
