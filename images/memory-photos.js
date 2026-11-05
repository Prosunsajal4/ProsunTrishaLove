// Script to handle memory photos integration
(function() {
  'use strict';
  
  // Memory images data - replace placeholder URLs with actual image paths
  const MEMORY_IMAGES = [
    {
      id: 1,
      filename: 'WhatsApp Image 2026-08-10 at 6.04.00 PM (2).jpeg',
      date: '10th July 2025',
      category: 'firsts',
      emoji: '🌹',
      caption: 'The Day We First Met In Person',
      secretNote: '"My hands were trembling with excitement before seeing you, but your smile made me feel instantly at home."'
    },
    {
      id: 2,
      filename: 'WhatsApp Image 2026-08-10 at 6.04.00 PM (1).jpeg',
      date: 'Pujo Celebrations',
      category: 'dates',
      emoji: '🌸',
      caption: 'Captured During Pujo, Cherished Forever',
      secretNote: '"You wore the most stunning traditional saree and I couldn\'t take my eyes off you for even a second."'
    },
    {
      id: 3,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.58 PM (1).jpeg',
      date: '9th July 2025',
      category: 'firsts',
      emoji: '💍',
      caption: 'The Day We Entered Our Relationship (9th July 2025)',
      secretNote: '"The best decision of my life. Those 4-5 patient months of waiting for you led to pure happiness."'
    },
    {
      id: 4,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.58 PM.jpeg',
      date: 'Coffee & Endless Talks',
      category: 'daily',
      emoji: '☕',
      caption: 'Warm Cups & Warm Hearts',
      secretNote: '"Talking about our future, our tech careers, and how we\'ll conquer the world together."'
    },
    {
      id: 5,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.57 PM (1).jpeg',
      date: 'Midnight Conversations',
      category: 'daily',
      emoji: '🌙',
      caption: 'Under the Starlit Sky',
      secretNote: '"When the whole city was asleep, you and I were awake building our own universe."'
    },
    {
      id: 6,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.56 PM (2).jpeg',
      date: 'Special Celebrations',
      category: 'dates',
      emoji: '🎂',
      caption: 'Birthdays & Big Smiles',
      secretNote: '"Seeing you blow out candles and wishing that all your dreams come true, always."'
    },
    {
      id: 7,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.56 PM.jpeg',
      date: 'Spontaneous Journeys',
      category: 'daily',
      emoji: '🚗',
      caption: 'Long Drives & Our Favorite Songs',
      secretNote: '"Singing Saiyara at the top of our lungs while the cool wind blew through our hair."'
    },
    {
      id: 8,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.55 PM.jpeg',
      date: 'Special Moments',
      category: 'dates',
      emoji: '🎁',
      caption: 'Gift Moments & Happy Times',
      secretNote: '"Every moment with you is a treasure I hold close to my heart."'
    },
    {
      id: 9,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.54 PM (2).jpeg',
      date: 'Sweet Memories',
      category: 'daily',
      emoji: '❤️',
      caption: 'Heartfelt Moments Captured',
      secretNote: '"Your love story is my favorite story, told in every little moment we share."'
    },
    {
      id: 10,
      filename: 'WhatsApp Image 2026-08-10 at 6.03.54 PM.jpeg',
      date: 'Forever Moments',
      category: 'daily',
      emoji: '💕',
      caption: 'Endless Love & Beautiful Times',
      secretNote: '"I\'m grateful for every day we get to spend together, creating new memories every single day."'
    }
  ];
  
  function getMemoryImageUrl(memoryId) {
    const memory = MEMORY_IMAGES.find(m => m.id === memoryId);
    if (!memory) return null;
    return `images/${memory.filename}`;
  }
  
  function updateMemoryCardsWithImages() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach((card, index) => {
      const memory = MEMORY_IMAGES[index];
      if (!memory) return;
      
      const imageContainer = card.querySelector('.memory-image-container');
      const emojiDisplay = card.querySelector('.memory-emoji-display');
      
      if (imageContainer && emojiDisplay) {
        // Replace emoji with actual image
        const img = document.createElement('img');
        img.src = getMemoryImageUrl(memory.id);
        img.alt = memory.caption;
        img.className = 'memory-actual-image';
        img.loading = 'lazy';
        
        imageContainer.innerHTML = '';
        imageContainer.appendChild(img);
        
        // Update data attributes for filtering
        card.dataset.category = memory.category;
      }
    });
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateMemoryCardsWithImages);
  } else {
    updateMemoryCardsWithImages();
  }
  
  // Make function available globally
  window.MemoryImages = {
    getImageUrl: getMemoryImageUrl,
    updateCards: updateMemoryCardsWithImages,
    memories: MEMORY_IMAGES
  };
})();