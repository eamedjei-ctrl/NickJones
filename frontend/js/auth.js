// js/auth.js - Authentication logic
const Auth = {
  login: async function(email) {
    const users = await State.getUsers();
    const user = users.find(u => u.email === email);
    if (user) {
      State.setCurrentUser(user);
      return user;
    }
    return null;
  },
  logout: function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  },
  checkAuth: function(role) {
    const user = State.getCurrentUser();
    if (!user || (role && user.role !== role)) {
      window.location.href = 'login.html';
      return null;
    }
    return user;
  }
};
