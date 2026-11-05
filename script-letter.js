// Custom script for letter.html animations
(function() {
  'use strict';
  
  // Heartbeat animation for salutation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes heartbeat {
      0% { transform: scale(1); }
      14% { transform: scale(1.1); }
      28% { transform: scale(1); }
      42% { transform: scale(1.1); }
      70% { transform: scale(1); }
    }
    
    .letter-salutation {
      animation: heartbeat 1.5s infinite;
    }
    
    .boy-girl-animations {
      animation: fadeInUp 0.8s ease-out;
    }
    
    .story-card:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 10px 30px rgba(219, 39, 119, 0.2);
    }
  `;
  document.head.appendChild(style);
  
  // Envelope opening animation
  const envelope = document.getElementById('envelope');
  const paper = document.getElementById('parchment-paper');
  
  if (envelope && paper) {
    envelope.addEventListener('click', () => {
      if (!envelope.classList.contains('opened')) {
        envelope.classList.add('opened');
        setTimeout(() => {
          paper.classList.add('visible');
        }, 600);
      }
    });
  }
})();