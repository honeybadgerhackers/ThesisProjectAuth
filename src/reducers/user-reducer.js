const user = (user, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return user;
      case 'LOGOUT_USER':
        return null;
      default:
        return user;
    }
};

export default user;
