// app.js - Shared state and logic for TowPrecision

const API_BASE = 'http://localhost:3000/api';

// Demo data for testing without Supabase
const DEMO_DATA = {
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

// State Management
const State = {
  getUsers: async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      return data.users;
    } catch (err) {
      console.warn('Using demo users:', err);
      return DEMO_DATA.users;
    }
  },

  getRequests: async () => {
    try {
      const res = await fetch(`${API_BASE}/requests`);
      const data = await res.json();
      return data.requests;
    } catch (err) {
      console.warn('Using demo requests:', err);
      return DEMO_DATA.requests;
    }
  },

  getEarnings: async () => {
    try {
      const res = await fetch(`${API_BASE}/earnings`);
      const data = await res.json();
      return data.earnings;
    } catch (err) {
      console.warn('Using demo earnings:', err);
      return DEMO_DATA.earnings;
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
      // Try demo users
      const user = DEMO_DATA.users.find(u => u.email === email);
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
    if (!res.ok) return null;
    return data.request;
  },

  updateRequestStatus: async (requestId, status) => {
    const res = await fetch(`${API_BASE}/requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) return null;

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
      '.map-preview',
      '.workflow-lane',
      '.wizard-steps',
      '.admin-section'
    ].join(', ');

    const isLogin = document.body.classList.contains('login-page');
    const isDriverApp = document.body.classList.contains('driver-app-page');
    const elements = Array.from(document.querySelectorAll(selector)).filter((el) => {
      if (isLogin && el.closest('.login-card')) return false;
      if (isDriverApp && el.closest('.driver-app-main')) return false;
      return true;
    });
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

const MobileSidebar = {
  init: function() {
    const toggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('collapsed');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  TimeTheme.apply();
  ScrollReveal.init();
  MobileSidebar.init();
});
