// js/api.js - Data models and initial mock data
const initialUsers = [
  { id: 'u1', name: 'Eli Martinez', email: 'eli@towprecision.com', role: 'Driver' },
  { id: 'u2', name: 'Sara Malik', email: 'sara@towprecision.com', role: 'Operator' },
  { id: 'u3', name: 'Alex Chen', email: 'alex@towprecision.com', role: 'Administrator' }
];

const initialRequests = [
  { id: 'r1', pickup_location: '123 Main St', destination: '456 Oak Ave', status: 'Completed', user_id: 'u1' }
];

const initialEarnings = [
  { id: 't1', distance: 12.5, fuel_cost: 15.00, estimated_earnings: 45.00, request_id: 'r1' }
];

const State = {
  getUsers: () => JSON.parse(localStorage.getItem('users')) || initialUsers,
  getRequests: () => JSON.parse(localStorage.getItem('requests')) || initialRequests,
  getEarnings: () => JSON.parse(localStorage.getItem('earnings')) || initialEarnings,
  getCurrentUser: () => JSON.parse(localStorage.getItem('currentUser')),
  setUsers: (users) => localStorage.setItem('users', JSON.stringify(users)),
  setRequests: (requests) => localStorage.setItem('requests', JSON.stringify(requests)),
  setEarnings: (earnings) => localStorage.setItem('earnings', JSON.stringify(earnings)),
  setCurrentUser: (user) => localStorage.setItem('currentUser', JSON.stringify(user)),
  init: function() {
    if (!localStorage.getItem('users')) this.setUsers(initialUsers);
    if (!localStorage.getItem('requests')) this.setRequests(initialRequests);
    if (!localStorage.getItem('earnings')) this.setEarnings(initialEarnings);
  }
};
State.init();
