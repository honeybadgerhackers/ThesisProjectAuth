const user = (user = null, action) => {
    switch (action.type) {
      case 'LOGIN':
        console.log('user', action);
        return action.user;
      case 'LOGOUT':
        return null;
      default:
        return user;
    }
};

export default user;
