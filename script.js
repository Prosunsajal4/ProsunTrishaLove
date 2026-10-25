// ========================================================
// PROSUN & TRISHA — PREMIUM ROMANTIC ENGINE
// Next-Level Visuals, Audio Synthesizer & Interactivity
// ========================================================

(function () {
  'use strict';

  // ---------------- Relationship Milestones ----------------
  // She said YES: July 9, 2025
  // First Meet: July 10, 2025
  const START_DATE = new Date('July 9, 2025 00:00:00').getTime();

  // Dynamically calculate the NEXT anniversary date (July 10th)
  function getNextAnniversaryDate() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(`July 10, ${year} 00:00:00`);
    if (now.getTime() >= target.getTime()) {
      target = new Date(`July 10, ${year + 1} 00:00:00`);
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
    let realAudio = null;

    // Romantic love melody chords & notes (Saiyara-inspired warm ballad)
    const NOTES = [
      { f: 523.25, d: 600 }, // C5
      { f: 587.33, d: 500 }, // D5
      { f: 659.25, d: 900 }, // E5
      { f: 587.33, d: 400 }, // D5
      { f: 523.25, d: 600 }, // C5
      { f: 493.88, d: 500 }, // B4
      { f: 440.00, d: 900 }, // A4
      { f: 493.88, d: 400 }, // B4
      { f: 523.25, d: 600 }, // C5
      { f: 659.25, d: 600 }, // E5
      { f: 783.99, d: 1100 }, // G5
      { f: 659.25, d: 600 }, // E5
      { f: 587.33, d: 800 }  // D5
    ];

    function ensureContext() {
      if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AC();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    // Play a single soft warm romantic chime
    function playChime(freq, duration, gainVal = 0.08) {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        g.gain.setValueAtTime(0, audioCtx.currentTime);
        g.gain.linearRampToValueAtTime(gainVal, audioCtx.currentTime + 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(g);
        g.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {}
    }

    // Play synthesized melody continuously
    function startMelody() {
      ensureContext();
      let index = 0;

      function step() {
        if (!isPlaying) return;
        const note = NOTES[index];
        // Play main note
        playChime(note.f, (note.d / 1000) * 1.5, 0.07);
        // Play soft acoustic harmony below
        playChime(note.f * 0.5, (note.d / 1000) * 1.8, 0.03);

        index = (index + 1) % NOTES.length;
        melodyTimer = setTimeout(step, note.d);
      }
      step();
    }

    function stopMelody() {
      if (melodyTimer) clearTimeout(melodyTimer);
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

    async function toggle() {
      ensureContext();
      realAudio = document.getElementById('audio');

      if (!isPlaying) {
        // Try real audio first if present and ready
        if (realAudio && realAudio.src && !realAudio.error) {
          try {
            await realAudio.play();
            isPlaying = true;
            syncUI(true);
            return;
          } catch (e) {
            // fallback to synth
          }
        }
        // Start synthetic love theme
        isPlaying = true;
        startMelody();
        syncUI(true);
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
      if (mainBtn) {
        mainBtn.innerHTML = active ? '<span>⏸</span> Pause Our Song' : '<span>▶</span> Play Our Song';
      }
    }

    return {
      toggle,
      playSuccessChime,
      playSoftCue,
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
          <span class="dock-subtext">Saiyara Melody</span>
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
  }

  // ---------------- Interactive Love Reasons Generator ----------------
  const REASONS = [
    "The way your eyes crinkle with pure happiness whenever you laugh with me. 💕",
    "How you patiently waited 4-5 whole months for me to say YES — your patience means the world to me.",
    "Your pure and gentle heart that always sees the absolute best in everyone.",
    "The way you call me and make my busiest days feel so calm and peaceful.",
    "Being my brilliant Miss Engineer — watching you succeed makes me so proud! 👩‍💻",
    "How cute you look when you're excitedly telling me about your day.",
    "Your sweet messages in the morning that instantly brighten my entire mood.",
    "The feeling of holding your hand during our first meet on 10th July 2025.",
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
    const cards = document.querySelectorAll('.memory-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
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

        cards.forEach((card) => {
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
        q: 'When did we first meet in person, my baby? 💕',
        hint: 'Hint: July 2025 — the day our story stepped into real life! 🌹',
        options: ['10th July 2025', '5th June 2025', '20th August 2025', '1st September 2025'],
        correct: 0,
        feedback: 'Yes! Our first meet was on 10th July 2025. That beautiful moment when I finally saw your radiant smile in person. 💑'
      },
      {
        q: 'How long did you wait for my "YES", baby? 🥰',
        hint: 'Hint: Think about months of genuine patience! ⏳',
        options: ['4-5 Months', '1-2 Months', '6 Months', '8 Months'],
        correct: 0,
        feedback: 'You waited patiently for 4-5 months for me to say YES. Your patience and sincerity won my heart completely. 💖'
      },
      {
        q: 'When did I officially say "YES" to being yours? 📅',
        hint: 'Hint: Just one day before our first meet! 🎉',
        options: ['9th July 2025', '15th June 2025', '3rd August 2025', '20th July 2025'],
        correct: 0,
        feedback: '9th July 2025! The happiest day when I said YES, beginning our sweetest journey together. 💍'
      },
      {
        q: "What is Prosun's favorite thing about you, baby? 🌟",
        hint: 'Hint: What makes your soul so uniquely precious? 🌸',
        options: ['Your pure kindness & sweet heart', 'Your coding skills', 'Your height', 'Your jokes'],
        correct: 0,
        feedback: 'Your pure kindness, warmth, and the way you care so deeply make you my dream girl every single day. 💗'
      },
      {
        q: 'Do you promise to love Prosun forever and always? 💍',
        hint: 'Hint: Answer with all your heart ❤️',
        options: ['Yes, Forever & Always!', 'Maybe...', "I'll try", 'Only on weekends'],
        correct: 0,
        feedback: 'Forever and always! Prosun loves Trisha to the moon and back, endlessly! ❤️'
      }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

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

      if (answerIndex === q.correct) {
        score++;
        selected.classList.add('correct');
        fIcon.textContent = '💖';
        fTitle.textContent = 'Correct, my baby! ✅';
        fTitle.style.color = '#166534';
        fMsg.textContent = q.feedback;
        feedback.style.background = 'linear-gradient(135deg, #dcfce7, #bbf7d0)';
        feedback.style.borderColor = '#22c55e';
        feedback.style.color = '#166534';
        window.fireConfetti(60);
        RomanticAudio.playSuccessChime();
      } else {
        selected.classList.add('wrong');
        fIcon.textContent = '💝';
        fTitle.textContent = 'Almost, my sweetheart!';
        fTitle.style.color = '#991b1b';
        fMsg.textContent = q.feedback + ' I still love you with all my heart! ❤️';
        feedback.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)';
        feedback.style.borderColor = '#ef4444';
        feedback.style.color = '#991b1b';
        RomanticAudio.playSoftCue();
      }

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
      if (finalScoreEl) {
        finalScoreEl.textContent = `Score: ${score} / ${questions.length} — You are 100% Prosun's Soulmate! 💖`;
      }
      window.fireConfetti(180);
      RomanticAudio.playSuccessChime();
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        current = 0;
        score = 0;
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

  // ---------------- DOM Ready Initialization ----------------
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initTheme();
    initScrollProgress();
    initLoveTimers();
    initRomanticCanvas();
    initClickHeartFX();
    initConfetti();
    initCursor();
    initNavbarScroll();
    initMobileNav();
    initBackToTop();
    initReveals();
    initFloatingAudioDock();
    initLoveNotesGenerator();
    initLoveLetter();
    initMemories();
    initQuiz();
  });
})();
