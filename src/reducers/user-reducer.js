const user = (user, action) => {
    switch (action.type) {
      case 'LOGIN':
        return user;
      case 'LOGOUT':
        return null;
      default:
        return user;
    }
};

const mapStateToProps 

export default user;
