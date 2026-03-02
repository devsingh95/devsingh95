/* ============================================================
   DEV SINGH — ELITE PORTFOLIO v2.0 — JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');
  const preloaderPercent = document.getElementById('preloaderPercent');
  let loadProgress = 0;

  function animatePreloader() {
    const interval = setInterval(() => {
      loadProgress += Math.random() * 12 + 3;
      if (loadProgress > 100) loadProgress = 100;
      preloaderFill.style.width = loadProgress + '%';
      preloaderPercent.textContent = Math.floor(loadProgress) + '%';
      if (loadProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('hidden');
          document.body.style.overflow = '';
          initAllAnimations();
        }, 400);
      }
    }, 60);
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(animatePreloader, 200);
  });

  // ===== CUSTOM CURSOR =====
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateCursorFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursorFollower);
  }
  animateCursorFollower();

  // hover effects on interactive elements
  const hoverTargets = 'a, button, .btn, .project-card, .skill-box, .cert-card, .contact-card, .exp-card, .highlight-item, .orbit-item, .side-dot, input, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      follower.classList.add('hover');
      cursor.style.transform = 'translate(-50%,-50%) scale(0.5)';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      follower.classList.remove('hover');
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    }
  });

  // hide cursor on touch devices
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // ===== PARTICLE SYSTEM =====
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 70;
  const CONNECTION_DIST = 140;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.15;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // mouse attraction
  let attractX = -1000, attractY = -1000;
  canvas.parentElement.addEventListener('mousemove', (e) => {
    attractX = e.clientX;
    attractY = e.clientY;
  });

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      // gentle attraction to mouse
      const dx = attractX - p.x;
      const dy = attractY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        p.vx += dx / dist * 0.01;
        p.vy += dy / dist * 0.01;
      }
      // speed limiter
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1) { p.vx *= 0.98; p.vy *= 0.98; }
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = percent + '%';
  });

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== TYPING ANIMATION =====
  const typingEl = document.getElementById('heroTyping');
  const phrases = [
    'C++ Developer & DSA Specialist',
    'Full Stack Engineer',
    'AI/ML Explorer',
    'Clean Code Advocate',
    'Computer Science Student'
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typePhrase() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      charIndex--;
      typingEl.textContent = current.substring(0, charIndex);
    } else {
      charIndex++;
      typingEl.textContent = current.substring(0, charIndex);
    }
    let speed = isDeleting ? 35 : 65;
    if (!isDeleting && charIndex === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }
    setTimeout(typePhrase, speed);
  }

  // ===== SIDE NAVIGATION =====
  const sideDots = document.querySelectorAll('.side-dot');
  const sections = document.querySelectorAll('.section, .hero');

  function updateSideNav() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) {
        current = section.getAttribute('id');
      }
    });
    sideDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.section === current);
    });
  }
  window.addEventListener('scroll', updateSideNav);

  // ===== SCROLL REVEAL ANIMATIONS =====
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-text, .reveal-up, .reveal-left, .reveal-right, .section-header');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // ===== STAT COUNTERS =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(el => {
      const target = parseInt(el.dataset.count);
      let current = 0;
      const duration = 1800;
      const step = target / (duration / 16);
      function count() {
        current += step;
        if (current >= target) {
          el.textContent = target;
          return;
        }
        el.textContent = Math.floor(current);
        requestAnimationFrame(count);
      }
      count();
    });
  }

  // ===== STAT RINGS =====
  function animateStatRings() {
    const rings = document.querySelectorAll('.stat-ring-fill');
    rings.forEach(ring => {
      const percent = parseFloat(ring.dataset.percent || 0);
      const circumference = 2 * Math.PI * 36; // r=36
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = offset;
    });
  }

  // ===== PROGRESS BARS =====
  function animateProgressBars() {
    const bars = document.querySelectorAll('.bar-fill, .cert-bar-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width;
          entry.target.style.width = width;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(bar => observer.observe(bar));
  }

  // ===== TIMELINE FILL =====
  function initTimelineFill() {
    const fill = document.getElementById('timelineFill');
    if (!fill) return;
    const timeline = fill.closest('.exp-timeline');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fill.style.height = '100%';
        }
      });
    }, { threshold: 0.2 });
    observer.observe(timeline);
  }

  // ===== CARD SHINE EFFECT =====
  function initCardShine() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const shine = card.querySelector('.project-card-shine');
        if (shine) {
          shine.style.setProperty('--mouse-x', x + 'px');
          shine.style.setProperty('--mouse-y', y + 'px');
        }
      });
    });
  }

  // ===== ORBIT SKILL HOVER =====
  function initOrbitHover() {
    const label = document.getElementById('orbitLabel');
    document.querySelectorAll('.orbit-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (label) label.textContent = item.dataset.skill;
      });
      item.addEventListener('mouseleave', () => {
        if (label) label.textContent = 'Hover to explore';
      });
    });
  }

  // ===== MAGNETIC BUTTONS =====
  function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ===== 3D TILT ON CARDS =====
  function initTilt() {
    const tiltCards = document.querySelectorAll('.project-card, .cert-card, .highlight-item');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
      });
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.querySelector('.btn-text').textContent;
      btn.querySelector('.btn-text').textContent = 'Sent!';
      btn.querySelector('.btn-icon i').className = 'fas fa-check';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.querySelector('.btn-text').textContent = originalText;
        btn.querySelector('.btn-icon i').className = 'fas fa-paper-plane';
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 2500);
    });
  }

  // ===== SMOOTH SCROLL FOR NAV =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== PARALLAX ON HERO SHAPES =====
  function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 12;
        shape.style.transform += '';
        shape.style.marginLeft = x * speed + 'px';
        shape.style.marginTop = y * speed + 'px';
      });
    });
  }

  // ===== ADD SVG GRADIENT FOR STAT RINGS =====
  function addStatGradient() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.innerHTML = `<defs><linearGradient id="statGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#22D3EE"/></linearGradient></defs>`;
    document.body.appendChild(svg);
  }

  // ===== INIT ALL =====
  function initAllAnimations() {
    typePhrase();
    initScrollReveal();
    animateCounters();
    animateStatRings();
    animateProgressBars();
    initTimelineFill();
    initCardShine();
    initOrbitHover();
    initMagnetic();
    initTilt();
    initParallax();
    addStatGradient();
    updateSideNav();
  }

})();
