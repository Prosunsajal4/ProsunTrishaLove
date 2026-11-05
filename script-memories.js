// Memory photos integration script
(function() {
  'use strict';
  
  // Memory data for the 10 photos
  const MEMORY_IMAGES = [
    {
      id: 1,
      filename: 'WhatsApp Image 2026-08-10 at 6.04.00 PM (2).jpeg',
      date: '10th July 2025',
      category: 'firsts',
      caption: 'The Day We First Met In Person',
      secretNote: '"My hands were trembling with excitement before seeing you, but your smile made me feel instantly at home."'
    },
    {
      id: 2,
      filename: 'WhatsApp Image 2026-08-10 at 6.04.00 PM (1).jpeg',
      date: 'Pujo Celebrations',
      category: 'dates',
      caption: 'Captured During Pujo, Cherished Forever',
      secretNote: '"You wore the most stunning traditional saree and I couldn\'t take my eyes off you for even a second."'
    },
    {
      id: 3,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.58 PM (1).jpeg',
      date: '9th July 2025',
      category: 'firsts',
      caption: 'The Day We Entered Our Relationship (9th July 2025)',
      secretNote: '"The best decision of my life. Those 4-5 patient months of waiting for you led to pure happiness."'
    },
    {
      id: 4,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.58 PM.jpeg',
      date: 'Coffee & Endless Talks',
      category: 'daily',
      caption: 'Warm Cups & Warm Hearts',
      secretNote: '"Talking about our future, our tech careers, and how we\'ll conquer the world together."'
    },
    {
      id: 5,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.57 PM (1).jpeg',
      date: 'Midnight Conversations',
      category: 'daily',
      caption: 'Under the Starlit Sky',
      secretNote: '"When the whole city was asleep, you and I were awake building our own universe."'
    },
    {
      id: 6,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.56 PM (2).jpeg',
      date: 'Special Celebrations',
      category: 'dates',
      caption: 'Birthdays & Big Smiles',
      secretNote: '"Seeing you blow out candles and wishing that all your dreams come true, always."'
    },
    {
      id: 7,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.56 PM.jpeg',
      date: 'Spontaneous Journeys',
      category: 'daily',
      caption: 'Long Drives & Our Favorite Songs',
      secretNote: '"Singing Saiyara at the top of our lungs while the cool wind blew through our hair."'
    },
    {
      id: 8,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.55 PM.jpeg',
      date: 'Surprise Moments',
      category: 'dates',
      caption: 'Little Gifts, Infinite Love',
      secretNote: '"Your little joyful jumps when you receive a surprise is the cutest thing on Earth."'
    },
    {
      id: 9,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.54 PM (2).jpeg',
      date: 'Sweet Memories',
      category: 'daily',
      caption: 'Heartfelt Moments Captured',
      secretNote: '"Your love story is my favorite story, told in every little moment we share."'
    },
    {
      id: 10,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.54 PM.jpeg',
      date: 'Forever Moments',
      category: 'daily',
      caption: 'Endless Love & Beautiful Times',
      secretNote: '"I\'m grateful for every day we get to spend together, creating new memories every single day."'
    }
  ];
  
  // Initialize memories page functionality
  function initMemoriesPage() {
    // Update memory cards with actual images
    updateMemoryCardsWithImages();
    
    // Set up filter functionality
    setupFilterFunctionality();
    
    // Set up lightbox functionality
    setupLightboxFunctionality();
    
    // Set up add memory functionality
    setupAddMemoryFunctionality();
  }
  
  function updateMemoryCardsWithImages() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach((card, index) => {
      const memory = MEMORY_IMAGES[index];
      if (!memory) return;
      
      const imageContainer = card.querySelector('.memory-image-container');
      
      // Replace emoji display with actual image
      if (imageContainer) {
        const img = imageContainer.querySelector('.memory-actual-image') || document.createElement('img');
        img.src = `images/${memory.filename}`;
        img.alt = memory.caption;
        img.className = 'memory-actual-image';
        img.loading = 'lazy';

        if (!img.parentElement) {
          imageContainer.appendChild(img);
        }
        
        // Update data attributes
        card.dataset.category = memory.category;
        
        // Store memory data for lightbox
        card.dataset.memoryId = memory.id;
        card.dataset.memoryDate = memory.date;
        card.dataset.memoryCaption = memory.caption;
        card.dataset.memorySecret = memory.secretNote;
      }
    });
  }
  
  function setupFilterFunctionality() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const memoryCards = document.querySelectorAll('.memory-card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        // Filter memory cards
        memoryCards.forEach(card => {
          const cardCategory = card.dataset.category;
          
          if (filter === 'all' || cardCategory === filter) {
            card.style.display = 'flex';
            // Add animation class
            if (!card.classList.contains('reveal')) {
              card.classList.add('reveal');
            }
          } else {
            card.style.display = 'none';
          }
        });
        
        // Trigger confetti for fun
        if (typeof window.fireConfetti === 'function') {
          window.fireConfetti(25);
        }
        
        // Play soft audio cue if available
        if (typeof RomanticAudio !== 'undefined' && typeof RomanticAudio.playSoftCue === 'function') {
          RomanticAudio.playSoftCue();
        }
      });
    });
  }
  
  function setupLightboxFunctionality() {
    const memoryCards = document.querySelectorAll('.memory-card');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const modalEmoji = document.getElementById('modal-emoji');
    const modalDate = document.getElementById('modal-date');
    const modalCaption = document.getElementById('modal-caption');
    const modalSecret = document.getElementById('modal-secret');
    
    if (!lightbox || !lightboxClose) return;
    
    // Open lightbox when memory card is clicked
    memoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const memoryId = card.dataset.memoryId;
        const memory = MEMORY_IMAGES.find(m => m.id === parseInt(memoryId));
        
        if (memory && lightbox) {
          // Update lightbox content
          modalEmoji.textContent = memory.emoji || '📸';
          modalDate.textContent = memory.date;
          modalCaption.textContent = memory.caption;
          modalSecret.textContent = memory.secretNote;
          
          // Show lightbox
          lightbox.classList.add('active');
          
          // Play confetti and audio cue
          if (typeof window.fireConfetti === 'function') {
            window.fireConfetti(80);
          }
          if (typeof RomanticAudio !== 'undefined' && typeof RomanticAudio.playSuccessChime === 'function') {
            RomanticAudio.playSuccessChime();
          }
        }
      });
    });
    
    // Close lightbox when close button is clicked
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
    
    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
    
    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
        lightbox.classList.remove('active');
      }
    });
  }
  
  function setupAddMemoryFunctionality() {
    const addMemoryBtn = document.getElementById('add-memory-btn');
    const memoryAddModal = document.getElementById('memory-add-modal');
    const memoryAddClose = document.getElementById('memory-add-close');
    const memoryAddForm = document.getElementById('memory-add-form');
    
    if (!addMemoryBtn || !memoryAddModal) return;
    
    // Open modal when add memory button is clicked
    addMemoryBtn.addEventListener('click', () => {
      memoryAddModal.classList.add('active');
      window.fireConfetti(50);
      if (typeof RomanticAudio !== 'undefined' && typeof RomanticAudio.playSoftCue === 'function') {
        RomanticAudio.playSoftCue();
      }
    });
    
    // Close modal when close button is clicked
    memoryAddClose.addEventListener('click', () => {
      memoryAddModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    memoryAddModal.addEventListener('click', (e) => {
      if (e.target === memoryAddModal) {
        memoryAddModal.classList.remove('active');
      }
    });
    
    // Handle form submission
    if (memoryAddForm) {
      memoryAddForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
          emoji: document.getElementById('new-mem-emoji').value,
          date: document.getElementById('new-mem-date').value,
          title: document.getElementById('new-mem-title').value,
          category: document.getElementById('new-mem-category').value,
          secret: document.getElementById('new-mem-secret').value
        };
        
        console.log('New memory submitted:', formData);
        
        // Show success message (in real implementation, this would save to database)
        alert('Memory added successfully! 🎉');
        
        // Close modal
        memoryAddModal.classList.remove('active');
        
        // Fire confetti
        if (typeof window.fireConfetti === 'function') {
          window.fireConfetti(100);
        }
        if (typeof RomanticAudio !== 'undefined' && typeof RomanticAudio.playSuccessChime === 'function') {
          RomanticAudio.playSuccessChime();
        }
      });
    }
  }
  
  // Initialize when DOM is ready
  function init() {
    document.addEventListener('DOMContentLoaded', initMemoriesPage);
    
    // Also run if page already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      initMemoriesPage();
    }
  }
  
  // Start initialization
  init();
})();