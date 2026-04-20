// app.js - Shared state and logic for TowPrecision

// Initial Mock Data
const initialUsers = [
  { id: 'u1', name: 'Eli Martinez', email: 'eli@towprecision.com', role: 'Driver' },
  { id: 'u2', name: 'Sara Malik', email: 'sara@towprecision.com', role: 'Operator' },
  { id: 'u3', name: 'Alex Chen', email: 'alex@towprecision.com', role: 'Administrator' }
];

const initialRequests = [
  { 
    id: 'r1', 
    pickup_location: '123 Main St', 
    destination: '456 Oak Ave', 
    status: 'Completed', 
    user_id: 'u1' 
  }
];

const initialEarnings = [
  {
    id: 't1',
    distance: 12.5,
    fuel_cost: 15.00,
    estimated_earnings: 45.00,
    request_id: 'r1'
  }
];

// State Management
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
  },

  login: function(email) {
    const user = this.getUsers().find(u => u.email === email);
    if (user) {
      this.setCurrentUser(user);
      return user;
    }
    return null;
  },

  logout: function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  },

  addRequest: function(request) {
    const requests = this.getRequests();
    const newRequest = {
      id: 'r' + (requests.length + 1),
      ...request,
      status: 'Pending'
    };
    requests.push(newRequest);
    this.setRequests(requests);
    return newRequest;
  },

  updateRequestStatus: function(requestId, status) {
    const requests = this.getRequests();
    const request = requests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
      this.setRequests(requests);
      
      // If completed, add earnings record
      if (status === 'Completed') {
        this.addEarningsRecord(requestId);
      }
    }
  },

  addEarningsRecord: function(requestId) {
    const earnings = this.getEarnings();
    const newEarning = {
      id: 't' + (earnings.length + 1),
      distance: Math.floor(Math.random() * 50) + 1,
      fuel_cost: Math.floor(Math.random() * 30) + 5,
      estimated_earnings: Math.floor(Math.random() * 100) + 50,
      request_id: requestId
    };
    earnings.push(newEarning);
    this.setEarnings(earnings);
  }
};

// Initialize state
State.init();

const TimeTheme = {
  apply: function() {
    const hour = new Date().getHours();
    document.body.classList.remove('day-mode', 'night-mode');
    document.body.classList.add(hour >= 6 && hour < 18 ? 'day-mode' : 'night-mode');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  TimeTheme.apply();
});
