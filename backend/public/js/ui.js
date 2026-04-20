// js/ui.js - Shared UI interactions
const UI = {
  initSidebar: function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const closeBtn = document.getElementById('sidebarClose');
    
    if (!sidebar || !toggleBtn) return;

    // Toggle Sidebar from Header
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.toggle('sidebar-collapsed');
    });

    // Toggle Sidebar from within the sidebar (Mobile Hamburger)
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.add('sidebar-collapsed');
      });
    }

    // Mobile specific: Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnToggle = toggleBtn.contains(e.target);
        const isSidebarOpen = !document.body.classList.contains('sidebar-collapsed');

        if (!isClickInsideSidebar && !isClickOnToggle && isSidebarOpen) {
          document.body.classList.add('sidebar-collapsed');
        }
      }
    });

    // Close on link click (mobile)
    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          document.body.classList.add('sidebar-collapsed');
        }
      });
    });
  }
};
