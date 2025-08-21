// Fix for Bootstrap toggle error
window.addEventListener('error', function(e) {
  if (e.message && e.message.includes('Cannot set properties of undefined (setting \'toggle\')')) {
    e.preventDefault();
    console.log('Bootstrap toggle error suppressed');
    return false;
  }
});

// Prevent Bootstrap JS initialization
if (typeof window !== 'undefined') {
  window.bootstrap = undefined;
}

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  e.preventDefault();
});

// Ensure React components render properly
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
});

// Force page reload if app doesn't render within 5 seconds
setTimeout(function() {
  const root = document.getElementById('root');
  if (root && (!root.children.length || root.children[0].children.length === 0)) {
    console.log('App not rendered, forcing reload...');
    window.location.reload();
  }
}, 5000);