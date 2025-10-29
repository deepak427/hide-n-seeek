import StartGame from './game/main';

// Mobile optimizations and event handlers
function setupMobileOptimizations() {
  // Prevent context menu on mobile
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  
  // Prevent double-tap zoom on iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Add loaded class for smooth transitions
  document.body.classList.add('loaded');
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileOptimizations();
  StartGame('game-container');
});
