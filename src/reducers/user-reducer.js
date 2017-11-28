const user = (user = null, action) => {
    switch (action.type) {
      case 'LOGIN':
        return action.user;
      case 'LOGOUT':
        return null;
      default:
        return user;
    }
};

export default user;
