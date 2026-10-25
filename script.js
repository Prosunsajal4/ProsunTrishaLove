// ========================================
// PROSUN & TRISHA — PREMIUM INTERACTIVITY
// Maximum Quality Animations & Polish
// ========================================

(function () {
  'use strict';

  // ---------------- Custom Cursor ----------------
  function initCursor() {
    const dot = document.createElement('div');
    const outline = document.createElement('div');
    dot.className = 'cursor-dot';
    outline.className = 'cursor-outline';
    document.body.appendChild(dot);
    document.body.appendChild(outline);
    document.body.classList.add('cursor-active');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    // Smooth follow for outline
    function animateOutline() {
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;
      outlineX += distX * 0.2;
      outlineY += distY * 0.2;
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effects on interactive elements
    const interactables = document.querySelectorAll('a, button, .quiz-option, .memory-card, .card, .envelope, .skill-card, .timeline-content');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(2.2)';
        dot.style.background = 'transparent';
        dot.style.border = '2px solid var(--pink-primary)';
        outline.style.transform = 'translate(-50%, -50%) scale(0.7)';
        outline.style.borderColor = 'transparent';
        outline.style.background = 'rgba(219, 39, 119, 0.15)';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
        dot.style.background = 'var(--pink-primary)';
        dot.style.border = 'none';
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.borderColor = 'var(--pink-primary)';
        outline.style.background = 'transparent';
      });
    });
  }

  // ---------------- Floating Hearts ----------------
  function initFloatingHearts() {
    const container = document.createElement('div');
    container.className = 'floating-hearts';
    document.body.appendChild(container);

    const colors = ['rgba(219, 39, 119, 0.18)', 'rgba(225, 29, 72, 0.15)', 'rgba(245, 158, 11, 0.12)', 'rgba(236, 72, 153, 0.14)'];
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💘', '💓', '💞'];

    function spawnHeart() {
      const heart = document.createElement('div');
      heart.className = 'heart-shape';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = (100 + Math.random() * 20) + 'vh';
      heart.style.fontSize = (16 + Math.random() * 30) + 'px';
      heart.style.animationDuration = (4 + Math.random() * 6) + 's';
      heart.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(heart);

      setTimeout(() => heart.remove(), 10000);
    }

    setInterval(spawnHeart, 600);
    // initial burst
    for (let i = 0; i < 18; i++) setTimeout(spawnHeart, i * 200);
  }

  // ---------------- Confetti ----------------
  function initConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    window.__confettiContainer = container;

    const colors = ['#db2777', '#e11d48', '#f59e0b', '#fbcfe8', '#fff', '#fb923c'];

    window.fireConfetti = function (count = 120) {
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '-10px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.opacity = Math.random();
        p.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(p);

        const tx = (Math.random() - 0.5) * 200;
        const ty = window.innerHeight + 100;
        const dur = 1200 + Math.random() * 1200;
        const pAnim = p.animate(
          [
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) rotate(${720 + Math.random() * 720}deg)`, opacity: 0 }
          ],
          { duration: dur, easing: 'cubic-bezier(0.2, 0, 0.2, 1)' }
        );
        pAnim.onfinish = () => p.remove();
      }
    };
  }

  // ---------------- Intersection Observer (reveals) ----------------
  function initReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .timeline-item, .skill-card, .memory-card, .card').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // ---------------- Counter Animation ----------------
  function initCounters() {
    const stats = document.querySelectorAll('.stat-value[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute('data-target');
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          const update = () => {
            current += increment;
            if (current < target) {
              el.textContent = Math.floor(current);
              requestAnimationFrame(update);
            } else {
              el.textContent = target;
            }
          };
          update();
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(el => counterObserver.observe(el));
  }

  // ---------------- Typing Effect (for hero objective) ----------------
  function typeWriter(element, text, speed = 35) {
    element.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  function initTyping() {
    const obj = document.querySelector('.hero-objective');
    if (!obj) return;
    const original = obj.textContent;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter(obj, original, 40);
          observer.unobserve(obj);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(obj);
  }

  // ---------------- Navbar scroll state ----------------
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  // ---------------- Mobile nav toggle ----------------
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // ---------------- Back to Top ----------------
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) btn.classList.add('visible');
      else btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------------- Theme Toggle ----------------
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    let dark = false;
    btn.addEventListener('click', () => {
      dark = !dark;
      if (dark) {
        document.documentElement.style.setProperty('--bg', '#121212');
        document.documentElement.style.setProperty('--text', '#f5f5f5');
        document.documentElement.style.setProperty('--border', '#333');
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79"/></svg>';
      } else {
        document.documentElement.style.removeProperty('--bg');
        document.documentElement.style.removeProperty('--text');
        document.documentElement.style.removeProperty('--border');
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
      }
    });
  }

  // ---------------- Quiz ----------------
  function initQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const questions = [
      {
        q: "When did we first meet? 💕",
        hint: "Hint: It was July 2025! 💝",
        options: ["10th July 2025", "5th June 2025", "20th August 2025", "1st September 2025"],
        correct: 0,
        feedback: "Yes! Our first meet was on 10th July 2025. The day our story stepped out of chats and into real life. 💑",
        icon: "💑"
      },
      {
        q: "How long did you wait to hear a YES from me? 🥰",
        hint: "Hint: Think about months! ⏳",
        options: ["4-5 Months", "1-2 Months", "6 Months", "8 Months"],
        correct: 0,
        feedback: "You waited patiently for 4-5 months for me to say YES. Your patience means everything. 💖",
        icon: "⏳"
      },
      {
        q: "What's my favorite thing about you? 🥰",
        hint: "Hint: What makes my heart skip a beat? 🤔",
        options: ["Your kindness", "Your height", "Your coding skills", "Your laugh"],
        correct: 0,
        feedback: "Your kindness is what makes my heart skip a beat every single day. 💗",
        icon: "🤔"
      },
      {
        q: "When did I say \"Yes\"? 📅",
        hint: "Hint: It was also July! 🎉",
        options: ["9th July 2025", "15th June 2025", "3rd August 2025", "20th July 2025"],
        correct: 0,
        feedback: "9th July 2025 - the most beautiful chapter of our story began that day. 📅",
        icon: "📅"
      },
      {
        q: "Do you promise to love me forever? 💍",
        hint: "Hint: Think with your heart ❤️",
        options: ["Yes, Always!", "Maybe...", "I'll try", "Not sure"],
        correct: 0,
        feedback: "Yes, Always! Forever and always, Trisha. ❤️",
        icon: "💍"
      }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    const qText = document.getElementById('question-text');
    const hintEl = document.querySelector('.hint');
    const optsEl = document.getElementById('quiz-options');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback');
    const fIcon = document.getElementById('feedback-icon');
    const fTitle = document.getElementById('feedback-title');
    const fMsg = document.getElementById('feedback-msg');
    const nextBtn = document.getElementById('next-btn');
    const complete = document.getElementById('quiz-complete');

    function load() {
      const q = questions[current];
      qText.textContent = q.q;
      hintEl.textContent = q.hint;
      optsEl.innerHTML = '';
      q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-option';
        b.textContent = opt;
        b.dataset.answer = i;
        b.addEventListener('click', () => select(b, i));
        optsEl.appendChild(b);
      });
      submitBtn.textContent = 'Submit 💕';
      submitBtn.style.display = 'block';
      nextBtn.style.display = 'none';
      feedback.style.display = 'none';
      answered = false;
    }

    function select(btn, index) {
      if (answered) return;
      document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      btn.classList.add('selected');
      btn.dataset.selected = index;
    }

    submitBtn.addEventListener('click', () => {
      if (answered) return;
      const sel = document.querySelector('.quiz-option.selected');
      if (!sel) { alert('Please select an answer first! 💕'); return; }
      answered = true;
      const u = +sel.dataset.selected;
      const q = questions[current];

      if (u === q.correct) {
        score++;
        fIcon.textContent = q.icon;
        fTitle.textContent = 'Correct! ✅';
        fMsg.textContent = q.feedback;
        feedback.style.background = 'linear-gradient(135deg, #dcfce7, #bbf7d0)';
        feedback.style.borderColor = '#22c55e';
        feedback.style.color = '#166534';
        fireConfetti(40);
      } else {
        fIcon.textContent = '💔';
        fTitle.textContent = 'Not quite!';
        fMsg.textContent = q.feedback + ' But I still love you. ❤️';
        feedback.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)';
        feedback.style.borderColor = '#ef4444';
        feedback.style.color = '#991b1b';
      }
      feedback.style.display = 'block';
      submitBtn.style.display = 'none';
      nextBtn.style.display = 'block';
    });

    nextBtn.addEventListener('click', () => {
      current++;
      if (current < questions.length) load();
      else showComplete();
    });

    function showComplete() {
      container.style.display = 'none';
      complete.style.display = 'block';
      fireConfetti(160);
    }

    load();
  }

  // ---------------- Letter Envelope ----------------
  function initLetter() {
    const envelope = document.getElementById('envelope');
    const content = document.getElementById('letter-content');
    if (!envelope || !content) return;

    envelope.addEventListener('click', () => {
      const opening = !envelope.classList.contains('flap-open');
      envelope.classList.toggle('flap-open');
      content.classList.toggle('show');
      if (opening) {
        setTimeout(() => fireConfetti(140), 500);
      }
    });
  }

  // ---------------- Music Player ----------------
  function initMusic() {
    const audio = document.getElementById('audio');
    const btn = document.getElementById('play-btn');
    const icon = document.getElementById('play-icon');
    const visual = document.getElementById('music-visual');
    if (!audio || !btn || !visual) return;

    let playing = false;

    btn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        icon.textContent = '▶';
        btn.innerHTML = '<span id="play-icon">▶</span> Play Our Song';
        visual.classList.remove('playing');
      } else {
        const p = audio.play();
        if (p !== undefined) p.catch(() => {
          alert('To hear our song, please add your audio.mp3 file to the project folder! 🎵');
        });
        icon.textContent = '⏸';
        btn.innerHTML = '<span id="play-icon">⏸</span> Pause Our Song';
        visual.classList.add('playing');
      }
      playing = !playing;
    });

    audio.addEventListener('ended', () => {
      playing = false;
      btn.innerHTML = '<span id="play-icon">▶</span> Play Our Song';
      visual.classList.remove('playing');
    });

    // Simple equalizer visualization
    const eq = document.createElement('div');
    eq.style.cssText = 'display:flex;gap:4px;justify-content:center;margin-top:16px;';
    for (let i = 0; i < 5; i++) {
      const bar = document.createElement('div');
      bar.style.cssText = 'width:6px;height:24px;background:var(--pink-light);border-radius:3px;opacity:0.6;transition:height 0.15s;';
      bar.id = 'eq-' + i;
      eq.appendChild(bar);
    }
    visual.parentNode.insertBefore(eq, visual.nextSibling);

    let eqRunning = false;
    function updateEq() {
      if (!playing || !eqRunning) return;
      for (let i = 0; i < 5; i++) {
        const h = 8 + Math.random() * 40;
        document.getElementById('eq-' + i).style.height = h + 'px';
      }
      requestAnimationFrame(updateEq);
    }
    audio.addEventListener('play', () => { eqRunning = true; updateEq(); });
    audio.addEventListener('pause', () => { eqRunning = false; });
    audio.addEventListener('ended', () => { eqRunning = false; });
  }

  // ---------------- Memory Card light hover handled in CSS ----------------

  // ---------------- Initialize everything ----------------
  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initFloatingHearts();
    initConfetti();
    initReveals();
    initCounters();
    initTyping();
    initNavbar();
    initMobileNav();
    initBackToTop();
    initThemeToggle();
    initQuiz();
    initLetter();
    initMusic();
  });

  // Expose confetti globally in case inline scripts need it
  window.fireConfetti = window.fireConfetti || function () {};

})();