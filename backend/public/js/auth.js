// js/auth.js - Authentication logic
const DEMO_USERS = {
  'eli@towprecision.com': { id: 'u1', name: 'Eli Martinez', email: 'eli@towprecision.com', role: 'Driver' },
  'sara@towprecision.com': { id: 'u2', name: 'Sara Malik', email: 'sara@towprecision.com', role: 'Operator' },
  'alex@towprecision.com': { id: 'u3', name: 'Alex Chen', email: 'alex@towprecision.com', role: 'Administrator' }
};

const Auth = {
  login: async function(email) {
    try {
      const users = await State.getUsers();
      const user = users.find(u => u.email === email);
      if (user) {
        State.setCurrentUser(user);
        return user;
      }
    } catch (err) {
      console.warn('API failed, using demo mode:', err);
      // Fallback to demo users
      const user = DEMO_USERS[email];
      if (user) {
        State.setCurrentUser(user);
        return user;
      }
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
