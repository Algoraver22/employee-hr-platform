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