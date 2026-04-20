// js/api.js - Data models and initial mock data
const API_BASE = '/api';

// Demo data for testing without Supabase
const DEMO_DATA_API = {
  users: [
    { id: 'u1', name: 'Eli Martinez', email: 'eli@towprecision.com', role: 'Driver' },
    { id: 'u2', name: 'Sara Malik', email: 'sara@towprecision.com', role: 'Operator' },
    { id: 'u3', name: 'Alex Chen', email: 'alex@towprecision.com', role: 'Administrator' }
  ],
  requests: [
    { id: 'r1', pickup_location: '123 Main St', destination: '456 Oak Ave', status: 'Completed', user_id: 'u1' }
  ],
  earnings: [
    { id: 't1', distance: 12.5, fuel_cost: 15.00, estimated_earnings: 45.00, request_id: 'r1' }
  ]
};

const State = {
  getUsers: async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      return data.users;
    } catch (err) {
      console.warn('Using demo users:', err);
      return DEMO_DATA_API.users;
    }
  },

  getRequests: async () => {
    try {
      const res = await fetch(`${API_BASE}/requests`);
      const data = await res.json();
      return data.requests;
    } catch (err) {
      console.warn('Using demo requests:', err);
      return DEMO_DATA_API.requests;
    }
  },

  getEarnings: async () => {
    try {
      const res = await fetch(`${API_BASE}/earnings`);
      const data = await res.json();
      return data.earnings;
    } catch (err) {
      console.warn('Using demo earnings:', err);
      return DEMO_DATA_API.earnings;
    }
  },

  getCurrentUser: () => JSON.parse(localStorage.getItem('currentUser')),

  setCurrentUser: (user) => localStorage.setItem('currentUser', JSON.stringify(user)),

  login: async (email) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        State.setCurrentUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.warn('API login failed, trying demo:', err);
      const user = DEMO_DATA_API.users.find(u => u.email === email);
      if (user) {
        State.setCurrentUser(user);
        return user;
      }
    }
    return null;
  },

  logout: function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  },

  addRequest: async (request) => {
    const res = await fetch(`${API_BASE}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    const data = await res.json();
    return data.request;
  },

  updateRequestStatus: async (requestId, status) => {
    const res = await fetch(`${API_BASE}/requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    
    // If completed, add earnings record
    if (status === 'Completed') {
      await State.addEarningsRecord(requestId);
    }
    return data.request;
  },

  addEarningsRecord: async (requestId) => {
    const distance = Math.floor(Math.random() * 50) + 1;
    const fuel_cost = Math.floor(Math.random() * 30) + 5;
    const estimated_earnings = Math.floor(Math.random() * 100) + 50;
    const res = await fetch(`${API_BASE}/earnings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ distance, fuel_cost, estimated_earnings, request_id: requestId })
    });
    const data = await res.json();
    return data.earning;
  }
};
State.init();
