// ========================================================
// PROSUN & TRISHA — PREMIUM ROMANTIC ENGINE
// Next-Level Visuals, Audio Synthesizer & Interactivity
// ========================================================

(function () {
  'use strict';

  // ---------------- Relationship Milestones ----------------
  // First Conversation: November 19, 2024
  // Relationship Started: July 9, 2025
  // First In-Person Meet: July 10, 2025
  const START_DATE = new Date('July 9, 2025 00:00:00').getTime();
  const ANNIVERSARY_REVEAL_DATE = new Date(2026, 10, 9, 0, 0, 0, 0).getTime();
  const PROPOSAL_ACCEPTED_KEY = 'prosun-trisha-proposal-accepted';

  // ---------------- Anniversary Reveal Gate ----------------
  function initAnniversaryGate() {
    const gate = document.getElementById('anniversary-gate');
    if (!gate) return;

    const countdown = {
      days: document.getElementById('gate-days'),
      hours: document.getElementById('gate-hours'),
      minutes: document.getElementById('gate-minutes'),
      seconds: document.getElementById('gate-seconds')
    };
    const surprise = document.getElementById('anniversary-surprise');
    let revealed = false;

    function reveal() {
      if (revealed) return;
      revealed = true;
      document.body.classList.remove('anniversary-locked');
      gate.classList.add('revealed');
      if (surprise) surprise.removeAttribute('hidden');
      window.dispatchEvent(new Event('anniversary-revealed'));
      window.setTimeout(showProposalGate, 900);
      window.setTimeout(() => {
        if (typeof window.fireConfetti === 'function') window.fireConfetti(220);
      }, 350);
      window.setTimeout(() => gate.remove(), 4200);
    }

    function updateCountdown() {
      const remaining = ANNIVERSARY_REVEAL_DATE - Date.now();
      if (remaining <= 0) {
        reveal();
        return;
      }

      const days = Math.floor(remaining / 86400000);
      const hours = Math.floor((remaining % 86400000) / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      countdown.days.textContent = String(days).padStart(2, '0');
      countdown.hours.textContent = String(hours).padStart(2, '0');
      countdown.minutes.textContent = String(minutes).padStart(2, '0');
      countdown.seconds.textContent = String(seconds).padStart(2, '0');
    }

    if (surprise) surprise.setAttribute('hidden', '');
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  // ---------------- Midnight Proposal Gate ----------------
  function showProposalGate() {
    if (document.getElementById('proposal-gate') || localStorage.getItem(PROPOSAL_ACCEPTED_KEY) === 'yes') return;

    const gate = document.createElement('section');
    gate.id = 'proposal-gate';
    gate.className = 'proposal-gate';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-labelledby', 'proposal-title');
    gate.innerHTML = `
      <div class="proposal-card">
        <div class="proposal-ring" aria-hidden="true">💍</div>
        <p class="proposal-kicker">One very important question</p>
        <h2 id="proposal-title">Trisha, will you marry me? 💖</h2>
        <p class="proposal-copy">I choose you in every timeline, every adventure, and every silly little moment. There is only one answer my heart is waiting for.</p>
        <div class="proposal-actions">
          <button class="btn btn-primary" id="proposal-yes">Yes, forever! 💍</button>
          <button class="btn btn-outline proposal-no" id="proposal-no" disabled aria-disabled="true">No</button>
        </div>
        <p class="proposal-error" id="proposal-error" role="status">The “No” button is taking a tiny love break. Please choose the forever answer. 💕</p>
      </div>
    `;
    document.body.appendChild(gate);
    document.body.classList.add('proposal-locked');

    const yesButton = gate.querySelector('#proposal-yes');
    yesButton.addEventListener('click', () => {
      localStorage.setItem(PROPOSAL_ACCEPTED_KEY, 'yes');
      document.body.classList.remove('proposal-locked');
      gate.classList.add('accepted');
      window.fireConfetti(180);
      RomanticAudio.playSuccessChime();
      window.setTimeout(() => gate.remove(), 850);
    });
  }

  function initProposalGate() {
    if (localStorage.getItem(PROPOSAL_ACCEPTED_KEY) === 'yes') return;
    if (Date.now() >= ANNIVERSARY_REVEAL_DATE && !document.getElementById('anniversary-gate')) {
      showProposalGate();
    }
  }

  // ---------------- Catch Our Future Hearts ----------------
  function initHeartGardenGame() {
      const garden = document.getElementById('heart-garden');
      const scoreEl = document.getElementById('garden-score');
      const timeEl = document.getElementById('garden-time');
      const startButton = document.getElementById('garden-start');
      const messageEl = document.getElementById('garden-message');
      if (!garden || !scoreEl || !timeEl || !startButton || !messageEl) return;

      let score = 0;
      let timeLeft = 30;
      let timerId = null;
      let spawnId = null;

      function placeHeart() {
        const heart = document.createElement('button');
        heart.className = 'garden-heart';
        heart.type = 'button';
        heart.textContent = ['💖', '💕', '💗', '💘'][Math.floor(Math.random() * 4)];
        heart.setAttribute('aria-label', 'Catch this heart');
        heart.style.left = `${8 + Math.random() * 84}%`;
        heart.style.top = `${8 + Math.random() * 78}%`;
        heart.addEventListener('click', () => {
          score++;
          scoreEl.textContent = String(score);
          heart.remove();
          RomanticAudio.playSoftCue();
          placeHeart();
        }, { once: true });
        garden.appendChild(heart);
        window.setTimeout(() => heart.remove(), 1800);
      }

      function finishGame() {
        window.clearInterval(timerId);
        window.clearInterval(spawnId);
        garden.querySelectorAll('.garden-heart').forEach((heart) => heart.remove());
        messageEl.textContent = score >= 15
          ? 'You caught a whole constellation of our love! 🌟'
          : 'Every heart you caught belongs to our forever. Try again for an even bigger bouquet! 💐';
        startButton.disabled = false;
        startButton.textContent = 'Play Again 💕';
      }

      startButton.addEventListener('click', () => {
        window.clearInterval(timerId);
        window.clearInterval(spawnId);
        score = 0;
        timeLeft = 30;
        scoreEl.textContent = '0';
        timeEl.textContent = '30';
        messageEl.textContent = 'Catch as many hearts as you can before our date begins! ✨';
        startButton.disabled = true;
        startButton.textContent = 'Our hearts are dancing...';
        placeHeart();
        spawnId = window.setInterval(placeHeart, 700);
        timerId = window.setInterval(() => {
          timeLeft--;
          timeEl.textContent = String(timeLeft);
          if (timeLeft <= 0) finishGame();
        }, 1000);
      });
  }

  // Dynamically calculate the NEXT anniversary date (October 25th)
  function getNextAnniversaryDate() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(`July 9, ${year} 00:00:00`);
    if (now.getTime() >= target.getTime()) {
      target = new Date(`July 9, ${year + 1} 00:00:00`);
    }
    return target.getTime();
  }

  // ---------------- Live Love Counters ----------------
  function initLoveTimers() {
    // 1. Time Together (Counting Up from July 9, 2025)
    const upDays = document.getElementById('countup-days');
    const upHours = document.getElementById('countup-hours');
    const upMins = document.getElementById('countup-mins');
    const upSecs = document.getElementById('countup-secs');

    // 2. Countdown to Next Anniversary (Counting Down)
    const downDays = document.getElementById('countdown-days');
    const downHours = document.getElementById('countdown-hours');
    const downMins = document.getElementById('countdown-mins');
    const downSecs = document.getElementById('countdown-secs');

    // 3. Live Metrics (Heartbeats, Calls, Sunsets)
    const metricHeartbeats = document.getElementById('metric-heartbeats');
    const metricDays = document.getElementById('metric-days');
    const metricSmiles = document.getElementById('metric-smiles');

    function updateTimers() {
      const now = Date.now();

      // Together Counter
      if (upDays && upHours && upMins && upSecs) {
        const elapsed = Math.max(0, now - START_DATE);
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((elapsed % (1000 * 60)) / 1000);

        upDays.textContent = String(days).padStart(2, '0');
        upHours.textContent = String(hours).padStart(2, '0');
        upMins.textContent = String(mins).padStart(2, '0');
        upSecs.textContent = String(secs).padStart(2, '0');

        if (metricDays) metricDays.textContent = days.toLocaleString();
        if (metricHeartbeats) {
          // Approx 75 bpm
          const totalMinutes = Math.floor(elapsed / (1000 * 60));
          const beats = Math.floor(totalMinutes * 75);
          metricHeartbeats.textContent = beats.toLocaleString();
        }
        if (metricSmiles) {
          const smiles = Math.floor(days * 12 + hours);
          metricSmiles.textContent = smiles.toLocaleString() + '+';
        }
      }

      // Next Anniversary Countdown
      if (downDays && downHours && downMins && downSecs) {
        const nextAnniv = getNextAnniversaryDate();
        const diff = Math.max(0, nextAnniv - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        downDays.textContent = String(days).padStart(2, '0');
        downHours.textContent = String(hours).padStart(2, '0');
        downMins.textContent = String(mins).padStart(2, '0');
        downSecs.textContent = String(secs).padStart(2, '0');
      }
    }

    updateTimers();
    setInterval(updateTimers, 1000);
  }

  // ---------------- Romantic Canvas Particle Universe ----------------
  function initRomanticCanvas() {
    let canvas = document.getElementById('romantic-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'romantic-canvas';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(36, Math.floor(window.innerWidth / 35));

    class RomanticParticle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.size = 12 + Math.random() * 18;
        this.speedY = 0.5 + Math.random() * 1.2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.rotation = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 1.5;
        this.opacity = 0.15 + Math.random() * 0.35;
        // Types: 'petal', 'heart', 'stardust'
        const types = ['petal', 'heart', 'petal', 'stardust'];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.02 + Math.random() * 0.02;
      }
      update() {
        this.y -= this.speedY;
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * 0.9 + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'heart') {
          ctx.fillStyle = '#db2777';
          ctx.font = `${this.size}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('💕', 0, 0);
        } else if (this.type === 'stardust') {
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size / 2);
          grad.addColorStop(0, '#fbcfe8');
          grad.addColorStop(0.5, '#f472b6');
          grad.addColorStop(1, 'rgba(244,114,182,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Rose Petal
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
          ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new RomanticParticle());
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    function loop() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ---------------- Tap / Click Heart Bursts ----------------
  function initClickHeartFX() {
    const emojis = ['💕', '💖', '💗', '💝', '✨', '🌸', '❤️'];

    window.addEventListener('click', (e) => {
      // Don't trigger if clicked directly on input or interactive form
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const count = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'click-heart-fx';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
        el.style.setProperty('--dx', (Math.random() - 0.5) * 80 + 'px');
        el.style.setProperty('--rot', (Math.random() - 0.5) * 45 + 'deg');
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
      }
    });
  }

  // ---------------- Confetti Cannon ----------------
  function initConfetti() {
    let container = document.querySelector('.confetti-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'confetti-container';
      document.body.appendChild(container);
    }

    const colors = ['#db2777', '#e11d48', '#f59e0b', '#fbcfe8', '#ffffff', '#fb7185', '#a855f7'];

    window.fireConfetti = function (count = 100) {
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '-12px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        container.appendChild(p);

        const tx = (Math.random() - 0.5) * 260;
        const ty = window.innerHeight + 50;
        const dur = 1400 + Math.random() * 1400;

        const anim = p.animate(
          [
            { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) rotate(${720 + Math.random() * 720}deg) scale(0.6)`, opacity: 0 }
          ],
          { duration: dur, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
        );
        anim.onfinish = () => p.remove();
      }
    };
  }

  // ---------------- Custom Cursor (Touch Safe) ----------------
  function initCursor() {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.createElement('div');
    const outline = document.createElement('div');
    dot.className = 'cursor-dot';
    outline.className = 'cursor-outline';
    document.body.appendChild(dot);
    document.body.appendChild(outline);
    document.body.classList.add('cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.22;
      outlineY += (mouseY - outlineY) * 0.22;
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const hoverables = document.querySelectorAll('a, button, .card, .memory-card, .quiz-option, .wax-seal, .envelope-box');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        outline.style.width = '56px';
        outline.style.height = '56px';
        outline.style.backgroundColor = 'rgba(219, 39, 119, 0.15)';
        outline.style.borderColor = 'var(--pink-primary)';
      });
      el.addEventListener('mouseleave', () => {
        outline.style.width = '38px';
        outline.style.height = '38px';
        outline.style.backgroundColor = 'transparent';
        outline.style.borderColor = 'var(--pink-primary)';
      });
    });
  }

  // ---------------- Theme Toggle with LocalStorage ----------------
  function initTheme() {
    const savedTheme = localStorage.getItem('pt-theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const toggleBtns = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      updateThemeIcon(btn, savedTheme);
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        if (next === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('pt-theme', next);
        toggleBtns.forEach((b) => updateThemeIcon(b, next));
      });
    });

    function updateThemeIcon(btn, theme) {
      if (!btn) return;
      if (theme === 'dark') {
        btn.innerHTML = '<span title="Switch to Daylight Mode">☀️</span>';
      } else {
        btn.innerHTML = '<span title="Switch to Candlelight Mode">🌙</span>';
      }
    }
  }

  // ---------------- Scroll Progress Beam ----------------
  function initScrollProgress() {
    let bar = document.getElementById('scroll-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'scroll-progress';
      document.body.appendChild(bar);
    }

    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = progress + '%';
    });
  }

  // ---------------- Mobile Navigation ----------------
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = links.classList.toggle('active');
      toggle.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close when clicking link
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (links.classList.contains('active') && !links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ---------------- Navbar Scroll Styling ----------------
  function initNavbarScroll() {
    const nav = document.getElementById('navbar') || document.querySelector('.navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  // ---------------- Back to Top Button ----------------
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) btn.classList.add('visible');
      else btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------- Intersection Observer Reveals ----------------
  function initReveals() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .timeline-item, .memory-card, .card').forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // ---------------- Romantic Audio Engine (Synthesizer & Player) ----------------
  const RomanticAudio = (function () {
    let audioCtx = null;
    let isPlaying = false;
    let melodyTimer = null;
    let masterGain = null;
    let currentVolume = parseFloat(localStorage.getItem('pt-volume') || '0.75');
    if (!Number.isFinite(currentVolume)) currentVolume = 0.75;
    currentVolume = Math.min(1, Math.max(0, currentVolume));
    let currentSoundscape = 'saiyara';
    let realAudio = null;

    // Real "Saiyaara" movie song, streamed through the YouTube IFrame API
    const SAIYAARA_VIDEO_ID = 'BSJa1UytM8w'; // Saiyaara title song (YRF)
    let ytPlayer = null;
    let ytApiPromise = null;
    let ytPlayerPromise = null;
    let ytUnavailable = false;
    let ytWatchdogTimer = null;

    
    // 4 Distinct Soundscape Melody Tracks
    const TRACKS = {
      saiyara: [
        { f: 523.25, d: 550 }, // C5
        { f: 587.33, d: 450 }, // D5
        { f: 659.25, d: 850 }, // E5
        { f: 587.33, d: 350 }, // D5
        { f: 523.25, d: 550 }, // C5
        { f: 493.88, d: 450 }, // B4
        { f: 440.00, d: 850 }, // A4
        { f: 493.88, d: 350 }, // B4
        { f: 523.25, d: 550 }, // C5
        { f: 659.25, d: 550 }, // E5
        { f: 783.99, d: 1050 }, // G5
        { f: 659.25, d: 550 }, // E5
        { f: 587.33, d: 750 }   // D5
      ],
      rain: [
        { f: 440.00, d: 500 }, // A4
        { f: 523.25, d: 500 }, // C5
        { f: 659.25, d: 700 }, // E5
        { f: 783.99, d: 500 }, // G5
        { f: 698.46, d: 600 }, // F5
        { f: 659.25, d: 500 }, // E5
        { f: 587.33, d: 600 }, // D5
        { f: 523.25, d: 800 }  // C5
      ],
      starlit: [
        { f: 659.25, d: 600 }, // E5
        { f: 783.99, d: 600 }, // G5
        { f: 987.77, d: 900 }, // B5
        { f: 880.00, d: 500 }, // A5
        { f: 783.99, d: 600 }, // G5
        { f: 659.25, d: 600 }, // E5
        { f: 587.33, d: 500 }, // D5
        { f: 659.25, d: 900 }  // E5
      ],
      sunset: [
        { f: 392.00, d: 500 }, // G4
        { f: 493.88, d: 500 }, // B4
        { f: 587.33, d: 600 }, // D5
        { f: 783.99, d: 800 }, // G5
        { f: 659.25, d: 500 }, // E5
        { f: 523.25, d: 500 }, // C5
        { f: 659.25, d: 600 }, // E5
        { f: 783.99, d: 800 }  // G5
      ]
    };

    // Lazily create (or resume) the Web Audio context + master gain bus
    function ensureContext() {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audioCtx = new Ctx();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = currentVolume;
        masterGain.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    }

    // Master volume (0..1) — persisted and applied live
    function setVolume(vol) {
      const parsed = parseFloat(vol);
      currentVolume = Number.isFinite(parsed)
        ? Math.min(1, Math.max(0, parsed))
        : 0.75;
      try {
        localStorage.setItem('pt-volume', String(currentVolume));
      } catch (e) {}
      if (masterGain) masterGain.gain.value = currentVolume;
      if (realAudio) realAudio.volume = currentVolume;
      if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
        try {
          ytPlayer.setVolume(Math.round(currentVolume * 100));
        } catch (e) {}
      }
    }

    // Switch melody theme, restarting instantly if the synth is already playing
    function setSoundscape(name) {
      if (!TRACKS[name]) return;
      const previous = currentSoundscape;
      currentSoundscape = name;

      if (name === 'saiyara') {
        // Hand playback over to the real Saiyaara song if music is already running
        if (isPlaying && previous !== 'saiyara' && !isYouTubePlaying()) {
          stopMelody();
          if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
            isPlaying = true;
            syncUI(true);
            ytPlayer.playVideo();
          }
        }
      } else {
        // Pause the real song and continue with the instrumental soundscape
        const wasPlaying = isPlaying || isYouTubePlaying();
        if (isYouTubePlaying()) {
          try {
            ytPlayer.pauseVideo();
          } catch (e) {}
        }
        if (wasPlaying && (!realAudio || realAudio.paused)) {
          stopMelody();
          isPlaying = true;
          startMelody();
          syncUI(true);
        }
      }
    }

    function playChime(freq, duration, gainVal = 0.08) {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        // Warm celestial music box tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        // Soft harmonic overtone
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);

        // Lowpass filter for smooth warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, audioCtx.currentTime);

        const g2 = audioCtx.createGain();
        g2.gain.value = 0.25;

        g.gain.setValueAtTime(0, audioCtx.currentTime);
        g.gain.linearRampToValueAtTime(gainVal, audioCtx.currentTime + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(filter);
        osc2.connect(g2);
        g2.connect(filter);
        filter.connect(g);
        g.connect(masterGain || audioCtx.destination);

        osc.start();
        osc2.start();
        osc.stop(audioCtx.currentTime + duration);
        osc2.stop(audioCtx.currentTime + duration);
      } catch (e) {}
    }

    function startMelody() {
      ensureContext();
      stopMelody();
      let index = 0;
      const track = TRACKS[currentSoundscape] || TRACKS.saiyara;

      function step() {
        if (!isPlaying) return;
        const note = track[index];
        // Main melodic voice
        playChime(note.f, (note.d / 1000) * 1.5, 0.075);
        // Acoustic sub-voice
        playChime(note.f * 0.5, (note.d / 1000) * 1.8, 0.035);

        index = (index + 1) % track.length;
        melodyTimer = setTimeout(step, note.d);
      }
      step();
    }

    function startFallbackMelody() {
      stopYouTubeWatchdog();
      ensureContext();
      isPlaying = true;
      startMelody();
      syncUI(true);
    }

    function stopMelody() {
      if (melodyTimer) clearTimeout(melodyTimer);
      melodyTimer = null;
    }

    function stopYouTubeWatchdog() {
      if (ytWatchdogTimer) clearInterval(ytWatchdogTimer);
      ytWatchdogTimer = null;
    }

    function startYouTubeWatchdog() {
      stopYouTubeWatchdog();
      let previousTime = null;
      let stalledChecks = 0;
      ytWatchdogTimer = setInterval(() => {
        if (!ytPlayer || currentSoundscape !== 'saiyara' || !isPlaying) {
          stopYouTubeWatchdog();
          return;
        }
        try {
          const state = ytPlayer.getPlayerState();
          const currentTime = ytPlayer.getCurrentTime();
          if (state !== 1) {
            ytUnavailable = true;
            ytPlayer.pauseVideo();
            stopYouTubeWatchdog();
            startFallbackMelody();
            return;
          }
          if (previousTime !== null && currentTime <= previousTime + 0.05) stalledChecks++;
          else stalledChecks = 0;
          previousTime = currentTime;
          if (stalledChecks >= 2) {
            ytUnavailable = true;
            ytPlayer.pauseVideo();
            stopYouTubeWatchdog();
            startFallbackMelody();
          }
        } catch (error) {
          ytUnavailable = true;
          stopYouTubeWatchdog();
          startFallbackMelody();
        }
      }, 3000);
    }

    // Play a cheerful chime sound for quiz correct answer
    function playSuccessChime() {
      ensureContext();
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => playChime(f, 0.4, 0.08), i * 90);
      });
    }

    // Play a gentle soft chime for hint/interaction
    function playSoftCue() {
      ensureContext();
      playChime(440, 0.3, 0.04);
      setTimeout(() => playChime(523.25, 0.4, 0.05), 100);
    }

    // ---- YouTube backend (real Saiyaara movie song) ----
    function loadYouTubeApi() {
      if (ytApiPromise) return ytApiPromise;
      ytApiPromise = new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve(window.YT);
          return;
        }
        let settled = false;
        const finish = (val) => {
          if (settled) return;
          settled = true;
          resolve(val);
        };
        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (typeof previous === 'function') previous();
          finish(window.YT);
        };
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        tag.onerror = () => {
          ytApiPromise = null;
          finish(null);
        };
        document.head.appendChild(tag);
        setTimeout(() => {
          if (settled) return;
          ytApiPromise = null; // let the next click retry
          finish(window.YT && window.YT.Player ? window.YT : null);
        }, 9000);
      });
      return ytApiPromise;
    }

    function ensureYouTubePlayer() {
      if (ytUnavailable) return Promise.resolve(null);
      if (ytPlayer && ytPlayer.getPlayerState) return Promise.resolve(ytPlayer);
      if (ytPlayerPromise) return ytPlayerPromise;

      ytPlayerPromise = (async () => {
        const YT = await loadYouTubeApi();
        if (!YT || !YT.Player) {
          ytUnavailable = true;
          return null;
        }

        let host = document.getElementById('yt-saiyara-player');
        if (!host) {
          host = document.createElement('div');
          host.id = 'yt-saiyara-player';
          host.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
          document.body.appendChild(host);
        }

        const player = await new Promise((resolve) => {
          let settled = false;
          const done = (value) => {
            if (settled) return;
            settled = true;
            resolve(value);
          };
          try {
            new YT.Player(host, {
              width: '1',
              height: '1',
              videoId: SAIYAARA_VIDEO_ID,
              playerVars: {
                autoplay: 1,
                controls: 0,
                playsinline: 1,
                mute: 1,
                rel: 0,
                modestbranding: 1,
                loop: 1,
                playlist: SAIYAARA_VIDEO_ID
              },
              events: {
                onReady: (e) => {
                  try {
                    e.target.setVolume(Math.round(currentVolume * 100));
                    e.target.mute();
                  } catch (err) {}
                  done(e.target);
                },
                onStateChange: (e) => {
                  // Only drive the UI while the YouTube backend is the active one
                  if (currentSoundscape !== 'saiyara' || !window.YT) return;
                  const State = window.YT.PlayerState;
                  if (e.data === State.PLAYING) {
                    isPlaying = true;
                    syncUI(true);
                    startYouTubeWatchdog();
                  } else if (e.data === State.PAUSED || e.data === State.ENDED) {
                    isPlaying = false;
                    stopYouTubeWatchdog();
                    syncUI(false);
                  }
                },
                onError: () => {
                  ytUnavailable = true;
                  if (currentSoundscape === 'saiyara') {
                    startFallbackMelody();
                  } else {
                    isPlaying = false;
                    syncUI(false);
                  }
                  done(null);
                }
              }
            });
          } catch (err) {
            done(null);
          }
          setTimeout(() => done(null), 10000);
        });

        if (!player) {
          ytUnavailable = true;
          ytPlayerPromise = null;
          return null;
        }
        ytPlayer = player;
        return ytPlayer;
      })();

      return ytPlayerPromise;
    }

    async function autoplaySaiyaara() {
      if (currentSoundscape !== 'saiyara' || document.body.classList.contains('anniversary-locked')) return;
      const yt = await ensureYouTubePlayer();
      if (!yt || typeof yt.playVideo !== 'function') return;
      try {
        yt.mute();
        yt.playVideo();
        isPlaying = true;
        syncUI(true);
        startYouTubeWatchdog();
      } catch (e) {
        isPlaying = false;
        syncUI(false);
      }
    }

    function activateSaiyaaraAudio() {
      if (!ytPlayer || currentSoundscape !== 'saiyara') return;
      try {
        ytPlayer.unMute();
        ytPlayer.setVolume(Math.round(currentVolume * 100));
        ytPlayer.playVideo();
        isPlaying = true;
        syncUI(true);
        window.setTimeout(() => {
          if (!isPlaying || currentSoundscape !== 'saiyara' || !ytPlayer) return;
          try {
            const state = ytPlayer.getPlayerState();
            const currentTime = ytPlayer.getCurrentTime();
            if (state === 1 && currentTime < 0.5) {
              ytPlayer.pauseVideo();
              ytUnavailable = true;
              startFallbackMelody();
            }
          } catch (e) {}
        }, 1800);
      } catch (e) {}
    }

    function isYouTubePlaying() {
      try {
        return !!(ytPlayer && ytPlayer.getPlayerState && ytPlayer.getPlayerState() === 1);
      } catch (e) {
        return false;
      }
    }

    function openSaiyaaraOnYouTube() {
      const url = `https://www.youtube.com/watch?v=${SAIYAARA_VIDEO_ID}`;
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) window.location.href = url;
    }

    function handoffSaiyaaraForNavigation() {
      if (currentSoundscape !== 'saiyara' || !isPlaying) return;
      let seconds = 0;
      try {
        if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
          seconds = Math.max(0, Math.floor(ytPlayer.getCurrentTime()));
        }
      } catch (error) {
        seconds = 0;
      }

      const url = `https://www.youtube.com/watch?v=${SAIYAARA_VIDEO_ID}${seconds ? `&t=${seconds}s` : ''}`;
      const playerWindow = window.open(url, 'prosun-trisha-saiyaara');
      if (!playerWindow) openSaiyaaraOnYouTube();
    }

    async function toggle() {
      ensureContext();
      realAudio = document.getElementById('audio');

      // Preferred backend: the real "Saiyaara" movie song, streamed from YouTube
      if (currentSoundscape === 'saiyara' && !ytUnavailable) {
        const yt = await ensureYouTubePlayer();
        if (yt && typeof yt.playVideo === 'function') {
          stopMelody();
          if (realAudio && !realAudio.paused) realAudio.pause();

          if (isYouTubePlaying()) {
            try {
              yt.pauseVideo();
            } catch (e) {}
            isPlaying = false;
            stopYouTubeWatchdog();
            syncUI(false);
          } else {
            isPlaying = true;
            syncUI(true);
            startYouTubeWatchdog();
            try {
              yt.playVideo();
            } catch (e) {}
            // Fall back to the local melody when YouTube reports a stalled player.
            setTimeout(() => {
              try {
                if (!ytPlayer || currentSoundscape !== 'saiyara' || !isPlaying) return;
                const state = ytPlayer.getPlayerState();
                if (state !== 1) {
                  ytUnavailable = true;
                  yt.pauseVideo();
                  startFallbackMelody();
                }
              } catch (e) {
                ytUnavailable = true;
                startFallbackMelody();
              }
            }, 2500);
          }
          return;
        }
      }

      if (currentSoundscape === 'saiyara' && ytUnavailable) {
        openSaiyaaraOnYouTube();
        return;
      }

      if (!isPlaying) {
        // Try a real local audio file first if one is actually loadable.
        // (A 404'd <source> leaves networkState at 3 = NETWORK_NO_SOURCE and
        //  a play() promise that never settles — so guard both.)
        const audioSrc = realAudio ? (realAudio.currentSrc || realAudio.src) : '';
        const localPlayable =
          audioSrc && !realAudio.error && realAudio.networkState !== 3;
        if (localPlayable) {
          try {
            realAudio.volume = currentVolume;
            await Promise.race([
              realAudio.play(),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error('local audio start timeout')), 3000)
              )
            ]);
            isPlaying = true;
            syncUI(true);
            return;
          } catch (e) {
            // Local file unavailable — fall through to the synth engine
            try {
              realAudio.pause();
            } catch (err) {}
          }
        }
        startFallbackMelody();
      } else {
        if (realAudio && !realAudio.paused) {
          realAudio.pause();
        }
        stopMelody();
        isPlaying = false;
        syncUI(false);
      }
    }

    function syncUI(active) {
      // Global floating audio dock button
      const dockBtns = document.querySelectorAll('#dock-play-btn, .audio-toggle-btn');
      dockBtns.forEach((btn) => {
        btn.innerHTML = active ? '⏸' : '▶';
        if (active) btn.classList.add('playing');
        else btn.classList.remove('playing');
      });

      // Turntable and visualizer in music.html
      const disc = document.getElementById('vinyl-disc');
      const visual = document.getElementById('music-visual');
      const mainBtn = document.getElementById('play-btn');
      const playIcon = document.getElementById('play-icon');

      if (disc) disc.classList.toggle('playing', active);
      if (visual) visual.classList.toggle('playing', active);
      if (playIcon) playIcon.textContent = active ? '⏸' : '▶';
      document.querySelectorAll('.equalizer-bar').forEach(b => b.classList.toggle('playing', active));
      if (mainBtn) {
        mainBtn.innerHTML = active ? '<span>⏸</span> Pause Our Song' : '<span>▶</span> Play Our Song';
      }
    }

    return {
      toggle,
      autoplaySaiyaara,
      activateSaiyaaraAudio,
      setVolume,
      setSoundscape,
      playSuccessChime,
      playSoftCue,
      handoffSaiyaaraForNavigation,
      getState: () => isPlaying
    };
  })();

  window.RomanticAudio = RomanticAudio;

  // ---------------- Global Floating Audio Dock ----------------
  function initFloatingAudioDock() {
    let dock = document.getElementById('floating-sound-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.className = 'floating-sound-dock';
      dock.id = 'floating-sound-dock';
      dock.innerHTML = `
        <button class="dock-play-btn" id="dock-play-btn" aria-label="Toggle Romantic Music">▶</button>
        <div class="dock-text">
          <span>Our Love Song ♫</span>
          <span class="dock-subtext" id="dock-track-name">Saiyaara • Movie Song</span>
        </div>
        <div class="audio-equalizer" style="height: 18px; margin-left: 8px;">
          <div class="equalizer-bar" style="width: 3px;"></div>
          <div class="equalizer-bar" style="width: 3px;"></div>
          <div class="equalizer-bar" style="width: 3px;"></div>
        </div>
      `;
      document.body.appendChild(dock);
    }

    const playBtn = document.getElementById('dock-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        RomanticAudio.toggle();
      });
    }

    // If on music.html, also hook play-btn
    const mainBtn = document.getElementById('play-btn');
    if (mainBtn) {
      mainBtn.addEventListener('click', () => {
        RomanticAudio.toggle();
      });
    }

    const startSaiyaara = () => RomanticAudio.autoplaySaiyaara();
    const activateSaiyaara = () => RomanticAudio.activateSaiyaaraAudio();
    if (document.body.classList.contains('anniversary-locked')) {
      window.addEventListener('anniversary-revealed', startSaiyaara, { once: true });
    } else {
      startSaiyaara();
    }
    window.addEventListener('pointerdown', activateSaiyaara, { once: true, passive: true });
    window.addEventListener('keydown', activateSaiyaara, { once: true });

    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      if (link.origin !== window.location.origin) return;
      RomanticAudio.handoffSaiyaaraForNavigation();
    });
  }

  // ---------------- Interactive Love Reasons Generator ----------------
  const REASONS = [
    "The way your eyes crinkle with pure happiness whenever you laugh with me. 💕",
    "How you thought about it gently for 4-5 whole months and then gave me the most beautiful YES — waiting for you was worth every single day. 💕",
    "Your pure and gentle heart that always sees the absolute best in everyone.",
    "The way you call me and make my busiest days feel so calm and peaceful.",
    "Being my brilliant Miss Engineer — watching you succeed makes me so proud! 👩‍💻",
    "How cute you look when you're excitedly telling me about your day.",
    "Your sweet messages in the morning that instantly brighten my entire mood.",
    "The feeling of holding your hand during our first meet � a moment I will treasure forever.",
    "How you make ordinary moments feel like something out of a romantic movie.",
    "Your unwavering support whenever I'm working hard or feeling tired.",
    "The warmth in your voice when you say 'I love you, Prosun'.",
    "How we can talk for hours about everything and nothing and never get bored.",
    "Your infectious smile that can literally melt any stress in seconds.",
    "The way you remember the smallest little details I mention in passing.",
    "You are not just my girlfriend; you are my best friend and soulmate for life.",
    "How beautiful you look during Pujo and every single time I see you. 🌸",
    "The way my heart still skips a beat whenever your name lights up my phone screen. ❤️",
    "Your unconditional love, care, and the warmth you wrap around my heart every day."
  ];

  function initLoveNotesGenerator() {
    const textEl = document.getElementById('love-note-text');
    const btn = document.getElementById('next-love-note-btn');
    if (!textEl || !btn) return;

    let lastIndex = -1;

    function nextReason() {
      RomanticAudio.playSoftCue();
      let index;
      do {
        index = Math.floor(Math.random() * REASONS.length);
      } while (index === lastIndex);
      lastIndex = index;

      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = `"${REASONS[index]}"`;
        textEl.style.opacity = '1';
      }, 250);
    }

    btn.addEventListener('click', () => {
      nextReason();
      window.fireConfetti(35);
    });

    // Initial reason
    nextReason();
  }

  // ---------------- Wax Seal Love Letter ----------------
  function initLoveLetter() {
    const envelope = document.getElementById('envelope');
    const waxSeal = document.getElementById('wax-seal');
    const paper = document.getElementById('parchment-paper');
    const replayMusicBtn = document.getElementById('letter-music-btn');

    if (!envelope || !paper) return;

    function openLetter() {
      if (envelope.classList.contains('opened')) return;
      envelope.classList.add('opened');
      RomanticAudio.playSoftCue();

      setTimeout(() => {
        paper.classList.add('visible');
        window.fireConfetti(140);
        paper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
    }

    envelope.addEventListener('click', openLetter);
    if (waxSeal) waxSeal.addEventListener('click', openLetter);

    if (replayMusicBtn) {
      replayMusicBtn.addEventListener('click', () => {
        RomanticAudio.toggle();
      });
    }

    // Shower of love button on letter
    const loveShowerBtn = document.getElementById('shower-love-btn');
    if (loveShowerBtn) {
      loveShowerBtn.addEventListener('click', () => {
        window.fireConfetti(120);
        RomanticAudio.playSuccessChime();
      });
    }
  }

  // ---------------- Polaroid Memories Filter & Lightbox ----------------
  function initMemories() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.memory-card');
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const mEmoji = document.getElementById('modal-emoji');
    const mCaption = document.getElementById('modal-caption');
    const mDate = document.getElementById('modal-date');
    const mSecret = document.getElementById('modal-secret');

    // Filtering
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        document.querySelectorAll('.memory-card').forEach((card) => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Lightbox open
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        if (!modal) return;
        const emoji = card.querySelector('.memory-emoji-display')?.textContent || '📸';
        const caption = card.querySelector('.memory-caption')?.textContent || '';
        const date = card.querySelector('.memory-date')?.textContent || '';
        const secret = card.querySelector('.memory-secret-note')?.textContent || '';

        if (mEmoji) mEmoji.textContent = emoji;
        if (mCaption) mCaption.textContent = caption;
        if (mDate) mDate.textContent = date;
        if (mSecret) mSecret.textContent = secret;

        modal.classList.add('active');
        RomanticAudio.playSoftCue();
        window.fireConfetti(30);
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }

  // ---------------- Love Quiz 2.0 ----------------
  function initQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const questions = [
      {
        q: 'What should our first lazy Sunday as an old married couple include? 👵🏻👴🏻',
        hint: 'Pick the plan with maximum comfort and minimum seriousness.',
        options: ['Breakfast in bed', 'A blanket-fort movie marathon', 'A dramatic nap competition', 'All three, obviously!']
      },
      {
        q: 'What do I intend to do with you on every rainy day? 🌧️',
        hint: 'The answer should include music, cuddles, and ignoring responsibilities.',
        options: ['Dance in the rain', 'Make tea and cuddle', 'Build a blanket fort', 'Order snacks and do all of it']
      },
      {
        q: 'Who gets the last piece of cake in our future home? 🍰',
        hint: 'Choose the most romantic cake law.',
        options: ['Whoever reaches it first', 'We split it exactly in half', 'Trisha gets it and Prosun gets a kiss', 'We buy another cake']
      },
      {
        q: 'What is our dream weekend mission? 🗺️',
        hint: 'A little adventure is better when we get lost together.',
        options: ['Explore a new city', 'Take 100 silly photos', 'Find the best local food', 'Get lost and call it a planned tour']
      },
      {
        q: 'What should our future kitchen always have? 🍳',
        hint: 'A happy kitchen needs at least one questionable recipe.',
        options: ['A snack drawer with your name on it', 'Music loud enough for dancing', 'A recipe we pretend to understand', 'An emergency dessert shelf']
      },
      {
        q: 'What will we argue about in the cutest possible way? 📺',
        hint: 'A tiny argument is just teamwork with extra drama.',
        options: ['Which movie to watch', 'Who loves whom more', 'Who stole the blanket', 'All of these, followed by a cuddle']
      },
      {
        q: 'What should our future travel rule be? ✈️',
        hint: 'The best journeys have a little chaos and a lot of laughter.',
        options: ['Always pack extra snacks', 'Take the scenic route', 'Collect silly souvenirs', 'Never stop for only one photo']
      },
      {
        q: 'What secret superpower should our marriage have? 🦸‍♀️🦸‍♂️',
        hint: 'Pick the power that makes ordinary days magical.',
        options: ['Know when the other needs a hug', 'Turn bad days into inside jokes', 'Find food anywhere', 'All powers activated forever']
      },
      {
        q: 'What should we do when we are both pretending not to be tired? 😴',
        hint: 'Be honest: the pillow usually wins.',
        options: ['Say “five more minutes” for an hour', 'Order comfort food', 'Cuddle until one of us falls asleep', 'Make a very serious nap schedule']
      },
      {
        q: 'What do I want to keep doing with you forever? ♾️',
        hint: 'This is our whole love story in one silly promise.',
        options: ['Laugh at terrible jokes', 'Grow, travel, and make memories', 'Choose you every day', 'All of it, with extra dessert']
      }
    ];

    let current = 0;
    let answered = false;
    const answersKey = 'prosun-trisha-future-answers';
    let savedAnswers = [];
    try {
      const storedAnswers = JSON.parse(localStorage.getItem(answersKey) || '[]');
      if (Array.isArray(storedAnswers)) savedAnswers = storedAnswers;
    } catch (error) {
      console.warn('[Prosun & Trisha] Could not restore future answers:', error);
    }

    const qCounter = document.getElementById('quiz-counter');
    const qText = document.getElementById('question-text');
    const hintEl = document.getElementById('quiz-hint');
    const optsEl = document.getElementById('quiz-options');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback');
    const fIcon = document.getElementById('feedback-icon');
    const fTitle = document.getElementById('feedback-title');
    const fMsg = document.getElementById('feedback-msg');
    const nextBtn = document.getElementById('next-btn');
    const complete = document.getElementById('quiz-complete');
    const progressFill = document.getElementById('quiz-progress-fill');
    const finalScoreEl = document.getElementById('final-score-text');
    const restartBtn = document.getElementById('restart-quiz-btn');

    function loadQuestion() {
      const q = questions[current];
      if (qCounter) qCounter.textContent = `Question ${current + 1} of ${questions.length}`;
      if (qText) qText.textContent = q.q;
      if (hintEl) hintEl.textContent = q.hint;
      if (progressFill) {
        progressFill.style.width = `${((current + 1) / questions.length) * 100}%`;
      }

      optsEl.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerHTML = `<span>${opt}</span><span class="option-check"></span>`;
        btn.addEventListener('click', () => selectOption(btn, i));
        optsEl.appendChild(btn);
      });
      if (savedAnswers[current]) {
        const savedIndex = q.options.indexOf(savedAnswers[current].answer);
        if (savedIndex >= 0) {
          const savedButton = optsEl.children[savedIndex];
          selectOption(savedButton, savedIndex);
          savedButton.classList.add('correct');
        }
      }

      submitBtn.textContent = 'Save My Answer 💕';
      submitBtn.style.display = 'inline-flex';
      nextBtn.style.display = 'none';
      feedback.style.display = 'none';
      answered = false;
    }

    function selectOption(btn, index) {
      if (answered) return;
      RomanticAudio.playSoftCue();
      document.querySelectorAll('.quiz-option').forEach((o) => o.classList.remove('selected'));
      btn.classList.add('selected');
      btn.dataset.selected = index;
    }

    submitBtn.addEventListener('click', () => {
      if (answered) return;
      const selected = document.querySelector('.quiz-option.selected');
      if (!selected) {
        alert('Please select an answer first, my baby! 💕');
        return;
      }

      answered = true;
      const answerIndex = +selected.dataset.selected;
      const q = questions[current];
      selected.classList.add('correct');
      savedAnswers[current] = { question: q.q, answer: q.options[answerIndex] };
      localStorage.setItem(answersKey, JSON.stringify(savedAnswers));
      fIcon.textContent = '💖';
      fTitle.textContent = 'Saved for our future!';
      fTitle.style.color = 'var(--pink-primary)';
      fMsg.textContent = `You chose: “${q.options[answerIndex]}” — no wrong answers here, my love.`;
      feedback.style.background = 'var(--bg-pill)';
      feedback.style.borderColor = 'var(--pink-primary)';
      feedback.style.color = 'var(--text-primary)';
      window.fireConfetti(28);
      RomanticAudio.playSoftCue();

      feedback.style.display = 'block';
      submitBtn.style.display = 'none';
      nextBtn.style.display = 'inline-flex';
    });

    nextBtn.addEventListener('click', () => {
      current++;
      if (current < questions.length) {
        loadQuestion();
      } else {
        showCompletion();
      }
    });

    function showCompletion() {
      container.style.display = 'none';
      complete.style.display = 'block';
      if (finalScoreEl) finalScoreEl.textContent = '10 answers saved — Best Wife & Best Friend forever! 💖';
      window.fireConfetti(180);
      RomanticAudio.playSuccessChime();
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        current = 0;
        savedAnswers = [];
        localStorage.removeItem(answersKey);
        complete.style.display = 'none';
        container.style.display = 'block';
        loadQuestion();
      });
    }

    loadQuestion();
  }

  // ---------------- Page Loader Dismissal ----------------
  function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 650);
      }, 500);
    });
  }

  // ---------------- Interactive Love Constellation Sky ----------------
  function initConstellation() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('constellation-tooltip');

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      repositionStars();
    });

    const rawStars = [
      { label: 'First Conversation', date: 'Nov 19, 2024', desc: '19th November 2024 — Our very first conversation that started everything 💬', xRatio: 0.16, yRatio: 0.65 },
      { label: 'Sweet Confession', date: 'Early 2025', desc: 'When I bravely confessed my feelings 🎬', xRatio: 0.30, yRatio: 0.36 },
      { label: 'Unwavering Patience', date: '4-5 Months', desc: 'My gentle wait while your heart made up its mind ⏳', xRatio: 0.44, yRatio: 0.72 },
      { label: 'Relationship Started', date: 'July 9, 2025', desc: '9th July 2025 — We officially came into our relationship! 💍', xRatio: 0.50, yRatio: 0.28 },
      { label: 'First In-Person Meet', date: 'July 10, 2025', desc: '10th July 2025 — Seeing your sweet smile in real life for the first time 🌹', xRatio: 0.58, yRatio: 0.68 },
      { label: 'Anniversary Milestone', date: 'July 9 & 10', desc: 'Celebrating our eternal relationship milestones 🎉', xRatio: 0.72, yRatio: 0.35 },
      { label: 'Infinite Future', date: 'Forever & Always', desc: 'Growing old together with endless smiles 💖', xRatio: 0.86, yRatio: 0.60 }
    ];

    let stars = [];
    function repositionStars() {
      stars = rawStars.map(s => ({
        ...s,
        x: s.xRatio * width,
        y: s.yRatio * height,
        pulse: Math.random() * Math.PI * 2
      }));
    }
    repositionStars();

    const bgDust = [];
    for (let i = 0; i < 70; i++) {
      bgDust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.8 + Math.random() * 1.8,
        alpha: 0.2 + Math.random() * 0.7,
        speed: 0.01 + Math.random() * 0.02
      });
    }

    let hoveredStar = null;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found = null;
      stars.forEach(s => {
        const dist = Math.hypot(s.x - mx, s.y - my);
        if (dist < 22) found = s;
      });

      if (found !== hoveredStar) {
        hoveredStar = found;
        if (hoveredStar) {
          RomanticAudio.playSoftCue();
          if (tooltip) {
            tooltip.innerHTML = '<strong>✨ ' + hoveredStar.label + ' (' + hoveredStar.date + ')</strong><br><span style="font-size:0.82rem; opacity:0.95;">' + hoveredStar.desc + '</span>';
            tooltip.style.opacity = '1';
          }
        } else if (tooltip) {
          tooltip.innerHTML = 'Hover over any star to reveal our sacred memories ✨';
        }
      }
    });

    
    // Touch support for mobile phones
    function handleTouch(e) {
      if (!e.touches.length) return;
      const rect = canvas.getBoundingClientRect();
      const tx = e.touches[0].clientX - rect.left;
      const ty = e.touches[0].clientY - rect.top;

      let found = null;
      stars.forEach(s => {
        const dist = Math.hypot(s.x - tx, s.y - ty);
        if (dist < 32) found = s;
      });

      if (found) {
        hoveredStar = found;
        RomanticAudio.playSoftCue();
        if (tooltip) {
          tooltip.innerHTML = '<strong>✨ ' + hoveredStar.label + ' (' + hoveredStar.date + ')</strong><br><span style="font-size:0.82rem; opacity:0.95;">' + hoveredStar.desc + '</span>';
          tooltip.style.opacity = '1';
        }
        window.fireConfetti(35);
      }
    }
    canvas.addEventListener('touchstart', handleTouch, { passive: true });
    canvas.addEventListener('touchmove', handleTouch, { passive: true });

    canvas.addEventListener('click', () => {
      if (hoveredStar) {
        window.fireConfetti(40);
        RomanticAudio.playSuccessChime();
      }
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      bgDust.forEach(d => {
        d.alpha += Math.sin(Date.now() * d.speed) * 0.01;
        ctx.fillStyle = 'rgba(255, 235, 245, ' + Math.max(0.1, Math.min(0.9, d.alpha)) + ')';
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.beginPath();
      for (let i = 0; i < stars.length; i++) {
        if (i === 0) ctx.moveTo(stars[i].x, stars[i].y);
        else ctx.lineTo(stars[i].x, stars[i].y);
      }
      ctx.strokeStyle = 'rgba(244, 114, 182, 0.45)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      stars.forEach(s => {
        s.pulse += 0.04;
        const isHovered = s === hoveredStar;
        const glow = (isHovered ? 14 : 7) + Math.sin(s.pulse) * 2;

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glow * 2.5);
        grad.addColorStop(0, isHovered ? 'rgba(251, 207, 232, 0.95)' : 'rgba(219, 39, 119, 0.7)');
        grad.addColorStop(0.5, 'rgba(219, 39, 119, 0.3)');
        grad.addColorStop(1, 'rgba(219, 39, 119, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, glow * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isHovered ? '#ffffff' : '#fbcfe8';
        ctx.beginPath();
        ctx.arc(s.x, s.y, isHovered ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = isHovered ? '600 12px Plus Jakarta Sans, sans-serif' : '500 10.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(251, 207, 232, 0.85)';
        ctx.textAlign = 'center';
        ctx.fillText(s.label, s.x, s.y + (s.yRatio > 0.5 ? -14 : 20));
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  // ---------------- Couple's Bucket List ----------------
  function initBucketList() {
    const container = document.getElementById('bucket-grid');
    const progressBar = document.getElementById('bucket-progress-bar');
    const progressText = document.getElementById('bucket-progress-text');
    const addForm = document.getElementById('bucket-add-form');
    const addInput = document.getElementById('bucket-input');

    if (!container) return;

    const defaultDreams = [
      { id: 1, text: 'Watch the Northern Lights dance in the Norway sky together 🌌', done: false },
      { id: 2, text: 'Stroll hand-in-hand along the Seine in Paris at golden hour 🥐', done: false },
      { id: 3, text: 'Cook homemade Italian pasta at 1 AM laughing in our dream kitchen 🍝', done: true },
      { id: 4, text: 'Build our cozy tech-smart sanctuary filled with warmth & memories 🏡', done: true },
      { id: 5, text: 'Adopt a sweet golden retriever puppy and take him on beach dates 🐕', done: false },
      { id: 6, text: 'Experience cherry blossom spring in Kyoto together 🌸', done: false },
      { id: 7, text: 'Go on a midnight road trip singing our favorite songs with open windows 🚗', done: true },
      { id: 8, text: 'Grow old, wrinkly, and still laugh at each other’s silly jokes 💖', done: false }
    ];

    let list = [];
    try {
      const saved = localStorage.getItem('pt-bucket-list');
      list = saved ? JSON.parse(saved) : defaultDreams;
    } catch (e) {
      list = defaultDreams;
    }

    function saveAndRender() {
      try {
        localStorage.setItem('pt-bucket-list', JSON.stringify(list));
      } catch (e) {}

      container.innerHTML = '';
      const completedCount = list.filter(item => item.done).length;
      const totalCount = list.length;
      const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      if (progressBar) progressBar.style.width = pct + '%';
      if (progressText) progressText.textContent = completedCount + ' of ' + totalCount + ' Dreams in Motion (' + pct + '%) ✨';

      list.forEach((item) => {
        const el = document.createElement('div');
        el.className = 'bucket-item ' + (item.done ? 'completed' : '');
        el.innerHTML = '<div class="bucket-checkbox">' + (item.done ? '✓' : '') + '</div><span class="bucket-text">' + item.text + '</span>';
        el.addEventListener('click', () => {
          item.done = !item.done;
          if (item.done) {
            window.fireConfetti(40);
            RomanticAudio.playSuccessChime();
          } else {
            RomanticAudio.playSoftCue();
          }
          saveAndRender();
        });
        container.appendChild(el);
      });
    }

    if (addForm && addInput) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = addInput.value.trim();
        if (!val) return;
        list.push({ id: Date.now(), text: val, done: false });
        addInput.value = '';
        window.fireConfetti(30);
        RomanticAudio.playSoftCue();
        saveAndRender();
      });
    }

    saveAndRender();
  }

  // ---------------- Digital Time Capsule to 2030 ----------------
  function initTimeCapsule() {
    const daysEl = document.getElementById('capsule-days');
    const hoursEl = document.getElementById('capsule-hours');
    const minsEl = document.getElementById('capsule-mins');
    const unlockBtn = document.getElementById('capsule-unlock-btn');
    const contentEl = document.getElementById('capsule-content');

    const TARGET_2030 = new Date('July 9, 2030 00:00:00').getTime();

    function update() {
      const diff = Math.max(0, TARGET_2030 - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (daysEl) daysEl.textContent = String(days);
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    }
    update();
    setInterval(update, 60000);

    if (unlockBtn && contentEl) {
      unlockBtn.addEventListener('click', () => {
        const pass = prompt('Enter our secret passcode to unlock our future time capsule 🔐 (Hint: Try "TRISHA", "PROSUN", or "1025"):');
        if (!pass) return;
        const clean = pass.trim().toLowerCase();
        if (clean === 'trisha' || clean === 'prosun' || clean === '1025' || clean === 'love' || clean === 'forever') {
          contentEl.classList.add('active');
          unlockBtn.style.display = 'none';
          window.fireConfetti(120);
          RomanticAudio.playSuccessChime();
          contentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('Almost, my love! Remember the hint: try "TRISHA" or "PROSUN" 💕');
        }
      });
    }
  }

  // ---------------- 3D Card Hover Physics ----------------
  function initTiltPhysics() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cards = document.querySelectorAll('.tilt-card, .countdown-box, .memory-card, .love-notes-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -6;
        const rotY = ((x - cx) / cx) * 6;
        card.style.transform = 'perspective(1000px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }


  // ---------------- Letter Typewriter & Font Mode ----------------
  function initLetterTypewriter() {
    const replayBtn = document.getElementById('typewriter-replay-btn');
    const fontBtn = document.getElementById('font-toggle-btn');
    const paper = document.getElementById('parchment-paper');
    if (!paper) return;

    if (fontBtn) {
      fontBtn.addEventListener('click', () => {
        paper.classList.toggle('calligraphy-mode');
        if (paper.classList.contains('calligraphy-mode')) {
          paper.style.fontFamily = "'Dancing Script', cursive";
          paper.style.fontSize = "1.7rem";
          fontBtn.textContent = "Serif Mode 📖";
        } else {
          paper.style.fontFamily = "";
          paper.style.fontSize = "";
          fontBtn.textContent = "Calligraphy Mode ✒️";
        }
        RomanticAudio.playSoftCue();
      });
    }

    if (replayBtn) {
      const paragraphs = Array.from(paper.querySelectorAll('p:not(.letter-instruction)'));
      const originalTexts = paragraphs.map(p => p.innerHTML);

      replayBtn.addEventListener('click', () => {
        replayBtn.disabled = true;
        RomanticAudio.playSoftCue();

        paragraphs.forEach(p => (p.innerHTML = ''));
        let pIndex = 0;

        function typeNextParagraph() {
          if (pIndex >= paragraphs.length) {
            replayBtn.disabled = false;
            window.fireConfetti(80);
            RomanticAudio.playSuccessChime();
            return;
          }

          const targetP = paragraphs[pIndex];
          const fullHtml = originalTexts[pIndex];
          targetP.innerHTML = '<span class="typewriter-cursor"></span>';
          let charIdx = 0;

          const interval = setInterval(() => {
            charIdx += 2;
            if (charIdx >= fullHtml.length) {
              targetP.innerHTML = fullHtml;
              clearInterval(interval);
              pIndex++;
              setTimeout(typeNextParagraph, 300);
            } else {
              targetP.innerHTML = fullHtml.slice(0, charIdx) + '<span class="typewriter-cursor"></span>';
            }
          }, 15);
        }

        typeNextParagraph();
      });
    }
  }

  // ---------------- Custom Memory Adder Modal ----------------
  function initCustomMemoryModal() {
    const addBtn = document.getElementById('add-memory-btn');
    const modal = document.getElementById('memory-add-modal');
    const closeBtn = document.getElementById('memory-add-close');
    const form = document.getElementById('memory-add-form');
    const grid = document.querySelector('.memories-grid');

    if (!addBtn || !modal || !form || !grid) return;

    try {
      const saved = JSON.parse(localStorage.getItem('pt-custom-memories') || '[]');
      saved.forEach(renderMemoryCard);
    } catch (e) {}

    function renderMemoryCard(mem) {
      const card = document.createElement('div');
      card.className = 'memory-card reveal tilt-card';
      card.dataset.category = mem.category || 'daily';
      card.innerHTML = `
        <div class="memory-tape"></div>
        <div class="memory-image-container">
          <span class="memory-emoji-display">${mem.emoji}</span>
        </div>
        <div class="memory-body">
          <span class="memory-date">${mem.date}</span>
          <div class="memory-caption">${mem.title}</div>
          <div class="memory-secret-note">${mem.secret}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        const lbModal = document.getElementById('lightbox-modal');
        const mEmoji = document.getElementById('modal-emoji');
        const mCaption = document.getElementById('modal-caption');
        const mDate = document.getElementById('modal-date');
        const mSecret = document.getElementById('modal-secret');

        if (mEmoji) mEmoji.textContent = mem.emoji;
        if (mCaption) mCaption.textContent = mem.title;
        if (mDate) mDate.textContent = mem.date;
        if (mSecret) mSecret.textContent = mem.secret;

        if (lbModal) {
          lbModal.classList.add('active');
          RomanticAudio.playSoftCue();
          window.fireConfetti(30);
        }
      });

      grid.prepend(card);
    }

    addBtn.addEventListener('click', () => {
      modal.classList.add('active');
      RomanticAudio.playSoftCue();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emoji = document.getElementById('new-mem-emoji').value;
      const date = document.getElementById('new-mem-date').value.trim();
      const title = document.getElementById('new-mem-title').value.trim();
      const category = document.getElementById('new-mem-category').value;
      const secret = document.getElementById('new-mem-secret').value.trim();

      const newMem = { emoji, date, title, category, secret, id: Date.now() };

      renderMemoryCard(newMem);

      try {
        const existing = JSON.parse(localStorage.getItem('pt-custom-memories') || '[]');
        existing.unshift(newMem);
        localStorage.setItem('pt-custom-memories', JSON.stringify(existing));
      } catch (err) {}

      modal.classList.remove('active');
      form.reset();
      window.fireConfetti(70);
      RomanticAudio.playSuccessChime();
    });
  }


  // ---------------- Daily Romantic Love Locket ----------------
  function initLoveLocket() {
    const locketIcon = document.getElementById('locket-icon');
    const refreshBtn = document.getElementById('locket-refresh-btn');
    const textEl = document.getElementById('locket-fortune-text');
    const dateEl = document.getElementById('locket-fortune-date');
    const statusEl = document.getElementById('locket-status');

    if (!locketIcon || !textEl) return;

    const FORTUNES = [
      "Every single heartbeat of mine quietly whispers your name, my baby Trisha. You are my forever home. 💕",
      "I love how your laugh lights up even my darkest days. Loving you is the easiest, sweetest thing I have ever done.",
      "You are not just my girlfriend; you are my best friend, my soulmate, and my brilliant Miss Engineer! 👩‍💻",
      "No distance, no busy schedule, and no challenge will ever diminish how fiercely and tenderly I cherish you.",
      "Watching you smile is my favorite hobby in the whole universe. Prosun will always be proud of his Trisha! 🌹",
      "From our very first conversation on 19th November 2024 to infinity, my heart has chosen you in every lifetime.",
      "I waited 4-5 gentle months for your answer, and you were worth every single one. Thank you for never giving up on us. 💍",
      "Even if I had a thousand lifetimes to live, I would spend every single one searching for you all over again.",
      "The warmth in your voice turns every ordinary day into a romantic fairy tale.",
      "I promise to always hold your hand, celebrate your triumphs, and comfort you through every storm.",
      "You make ordinary car rides feel like adventures, and simple coffee dates feel like heaven. ☕",
      "There is no place in the entire world I would rather be than right next to you, looking into your eyes.",
      "Your sweetness is contagious, your kindness is boundless, and your love is my greatest treasure. ✨",
      "Happy moments with you are my absolute favorite memories. Forever your proud Mr. Engineer! ❤️"
    ];

    function revealFortune(customIdx = -1) {
      let idx;
      if (customIdx >= 0) {
        idx = customIdx % FORTUNES.length;
      } else {
        // Calculate daily deterministic index based on day of year
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        idx = dayOfYear % FORTUNES.length;
      }

      locketIcon.classList.add('opened');
      setTimeout(() => locketIcon.classList.remove('opened'), 650);

      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = '"' + FORTUNES[idx] + '"';
        textEl.style.opacity = '1';
        if (dateEl) {
          const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          dateEl.textContent = 'Special Fortune for ' + dateStr + ' ✨';
        }
        if (statusEl) {
          statusEl.textContent = 'Message unlocked with love from Prosun ❤️';
        }
      }, 250);

      window.fireConfetti(45);
      RomanticAudio.playSuccessChime();
    }

    locketIcon.addEventListener('click', () => revealFortune());

    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        const rand = Math.floor(Math.random() * FORTUNES.length);
        revealFortune(rand);
      });
    }

    // Set initial date on load
    if (dateEl) {
      const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      dateEl.textContent = 'Today: ' + dateStr + ' ✨';
    }
  }

  // ---------------- Music Player Pro (Soundscapes & Volume) ----------------
  function initMusicPlayerPro() {
    const soundscapePills = document.querySelectorAll('.soundscape-pill');
    const volSlider = document.getElementById('master-volume-slider');
    const volLabel = document.getElementById('volume-pct-label');

    // Restore saved volume
    const savedVol = localStorage.getItem('pt-volume');
    if (volSlider && savedVol) {
      volSlider.value = Math.round(parseFloat(savedVol) * 100);
      if (volLabel) volLabel.textContent = volSlider.value + '%';
    }

    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) / 100;
        RomanticAudio.setVolume(val);
        if (volLabel) volLabel.textContent = e.target.value + '%';
      });
    }

    soundscapePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        soundscapePills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const mode = pill.dataset.soundscape || 'saiyara';
        RomanticAudio.setSoundscape(mode);
        RomanticAudio.playSoftCue();
        window.fireConfetti(25);
      });
    });
  }

  // ---------------- Timeline Filters ----------------
  function initTimelineFilters() {
    const buttons = document.querySelectorAll('[data-timeline-filter]');
    const items = document.querySelectorAll('.timeline-item');
    if (!buttons.length || !items.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.timelineFilter;

        items.forEach((item) => {
          const category = item.dataset.timelineCategory;
          if (filter === 'all' || category === filter) {
            item.style.display = 'flex';
            setTimeout(() => item.classList.add('visible'), 50);
          } else {
            item.style.display = 'none';
          }
        });

        RomanticAudio.playSoftCue();
      });
    });
  }

  // ---------------- DOM Ready Initialization ----------------
  document.addEventListener('DOMContentLoaded', () => {
    // Run each initializer in isolation so a failure in one feature
    // can never silently disable the others (e.g. the live countdowns).
    const safeInit = (name, fn) => {
      try {
        fn();
      } catch (err) {
        console.error(`[Prosun & Trisha] ${name} failed to initialize:`, err);
      }
    };

    safeInit('Loader', initLoader);
    safeInit('AnniversaryGate', initAnniversaryGate);
    safeInit('ProposalGate', initProposalGate);
    safeInit('Theme', initTheme);
    safeInit('ScrollProgress', initScrollProgress);
    safeInit('LoveTimers', initLoveTimers);
    safeInit('RomanticCanvas', initRomanticCanvas);
    safeInit('ClickHeartFX', initClickHeartFX);
    safeInit('Confetti', initConfetti);
    safeInit('Cursor', initCursor);
    safeInit('NavbarScroll', initNavbarScroll);
    safeInit('MobileNav', initMobileNav);
    safeInit('BackToTop', initBackToTop);
    safeInit('Reveals', initReveals);
    safeInit('FloatingAudioDock', initFloatingAudioDock);
    safeInit('LoveNotesGenerator', initLoveNotesGenerator);
    safeInit('LoveLetter', initLoveLetter);
    safeInit('Memories', initMemories);
    safeInit('Quiz', initQuiz);
    safeInit('Constellation', initConstellation);
    safeInit('BucketList', initBucketList);
    safeInit('TimeCapsule', initTimeCapsule);
    safeInit('TiltPhysics', initTiltPhysics);
    safeInit('LetterTypewriter', initLetterTypewriter);
    safeInit('CustomMemoryModal', initCustomMemoryModal);
    safeInit('LoveLocket', initLoveLocket);
    safeInit('MusicPlayerPro', initMusicPlayerPro);
    safeInit('TimelineFilters', initTimelineFilters);
    safeInit('HeartGardenGame', initHeartGardenGame);
  });
})();
