// app.js - Shared state and logic for TowPrecision

const API_BASE = '/api';

// State Management
const State = {
  getUsers: async () => {
    const res = await fetch(`${API_BASE}/users`);
    const data = await res.json();
    return data.users;
  },

  getRequests: async () => {
    const res = await fetch(`${API_BASE}/requests`);
    const data = await res.json();
    return data.requests;
  },

  getEarnings: async () => {
    const res = await fetch(`${API_BASE}/earnings`);
    const data = await res.json();
    return data.earnings;
  },

  getCurrentUser: () => JSON.parse(localStorage.getItem('currentUser')),

  setCurrentUser: (user) => localStorage.setItem('currentUser', JSON.stringify(user)),

  login: async (email) => {
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

const TimeTheme = {
  apply: function() {
    const hour = new Date().getHours();
    document.body.classList.remove('day-mode', 'night-mode');
    document.body.classList.add(hour >= 6 && hour < 18 ? 'day-mode' : 'night-mode');
  }
};

const ScrollReveal = {
  init: function() {
    const selector = [
      '.dashboard-shell > *',
      '.dashboard-main > *',
      '.login-card',
      '.login-header',
      '.card',
      '.metrics-grid',
      '.request-card',
      '.driver-item',
      '.timeline-item',
      '.map-preview'
    ].join(', ');

    const elements = Array.from(document.querySelectorAll(selector));
    elements.forEach((el, index) => {
      el.classList.add('scroll-reveal');
      el.classList.add(`delay-${(index % 3) + 1}`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    elements.forEach(el => observer.observe(el));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  TimeTheme.apply();
  ScrollReveal.init();
});
