/* Nexus promo site — progressive enhancement only.
   Everything below is optional: the page is complete and usable without JS. */
(function () {
  'use strict';

  /* ---------------------------------------------- theme (dark / light) */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var stored = null;
  try { stored = localStorage.getItem('nexus-theme'); } catch (e) {}

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  // ?theme=light|dark deep-links a theme (used by the delivered breakpoint mock-ups)
  var param = (location.search.match(/[?&]theme=(light|dark)/) || [])[1];
  var initial = param || stored || (prefersDark ? 'dark' : 'light');
  apply(initial);

  function apply(mode) {
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (toggle) {
        toggle.setAttribute('aria-pressed', 'true');
        toggle.setAttribute('aria-label', 'Switch to light mode');
      }
    } else {
      root.removeAttribute('data-theme');
      if (toggle) {
        toggle.setAttribute('aria-pressed', 'false');
        toggle.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('nexus-theme', next); } catch (e) {}
    });
  }

  /* ------------------------------------------- mobile navigation sheet */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* --------------------------------------- hero: count-up on KPI numbers */
  var kpis = document.querySelectorAll('.kpi b');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el) {
    var raw = el.textContent.trim();
    var target = parseFloat(raw);
    if (isNaN(target) || reduce) return;
    var suffix = raw.replace(/[\d.]/g, '');
    var start = performance.now();
    var dur = 700;
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    kpis.forEach(function (k) { io.observe(k); });
  }

  /* --------------------------------------------- feature cards reveal */
  var cards = document.querySelectorAll('.feature, .steps li, .plan');
  if ('IntersectionObserver' in window && !reduce) {
    cards.forEach(function (c) {
      c.style.opacity = '0';
      c.style.transform = 'translateY(10px)';
    });
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () {
            el.style.transition = 'opacity 260ms cubic-bezier(.22,.61,.36,1), transform 260ms cubic-bezier(.22,.61,.36,1)';
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, i * 60);
          io2.unobserve(el);
        }
      });
    }, { threshold: 0.2 });
    cards.forEach(function (c) { io2.observe(c); });
  }

  /* ------------------------------------------------ newsletter form */
  var form = document.querySelector('.cta-form');
  var note = document.getElementById('formNote');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('email');
      var value = (input && input.value || '').trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (!valid) {
        note.classList.add('err');
        note.textContent = 'Please enter a valid work email address.';
        if (input) input.focus();
        return;
      }
      note.classList.remove('err');
      note.textContent = 'Thanks — a confirmation is on its way to ' + value + '.';
      form.reset();
    });
  }

  /* --------------------------------------------- active nav highlight */
  var sections = ['features', 'how', 'pricing', 'faq'];
  if ('IntersectionObserver' in window) {
    var links = {};
    document.querySelectorAll('.nav a').forEach(function (a) {
      var id = (a.getAttribute('href') || '').replace('#', '');
      if (sections.indexOf(id) > -1) links[id] = a;
    });
    var io3 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = links[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].style.color = ''; links[k].style.borderColor = ''; });
          a.style.color = 'var(--brand)';
          a.style.borderColor = 'var(--brand)';
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io3.observe(el);
    });
  }
})();
