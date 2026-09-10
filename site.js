/* lhausen.github.io — shared behaviour: theme, language, menu, reveal, copy, reading time */
(function () {
  const root = document.documentElement;
  root.classList.remove('no-js');

  /* ── theme (system fallback; pages can lock via data-theme-lock) ── */
  const lock = root.dataset.themeLock;
  function setTheme(t, save) {
    root.dataset.theme = t;
    if (save) { try { localStorage.setItem('theme', t); } catch (e) {} }
  }
  (function initTheme() {
    if (lock) { setTheme(lock); return; }
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (saved === 'dark' || saved === 'light') setTheme(saved);
    else setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  })();
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  });

  /* ── language (EN/DE) ── */
  let lang = 'en';
  try { lang = localStorage.getItem('lang') === 'de' ? 'de' : 'en'; } catch (e) {}
  function applyLang(l) {
    lang = l;
    root.lang = l;
    document.querySelectorAll('[data-en]').forEach(el => {
      const v = l === 'de' ? el.dataset.de : el.dataset.en;
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-lang-set]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.langSet === l)));
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  document.querySelectorAll('[data-lang-set]').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.langSet)));

  /* ── reading time (computed before first applyLang so both strings exist) ── */
  const body = document.querySelector('.post__body');
  const rt = document.getElementById('reading-time');
  if (body && rt) {
    const words = body.innerText.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    rt.dataset.en = mins + ' min read';
    rt.dataset.de = mins + ' Min. Lesezeit';
  }
  applyLang(lang);

  /* ── mobile menu ── */
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (menuBtn && menu) {
    const close = () => { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); };
    menuBtn.addEventListener('click', () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', e => { if (!e.target.closest('.site-nav')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  /* ── embed mode (?embed) hides site chrome inside iframes ── */
  if (/[?&]embed\b/.test(location.search)) {
    document.querySelectorAll('.site-nav, .thesis-bar, .site-footer').forEach(el => { el.hidden = true; });
  }

  /* ── reveal on scroll ── */
  const fades = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && window.innerHeight > 0) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    fades.forEach(el => io.observe(el));
  } else {
    fades.forEach(el => el.classList.add('visible'));
  }

  /* ── active section in nav (home page) ── */
  const secLinks = Array.from(document.querySelectorAll('.site-nav__link[data-section]'));
  if (secLinks.length && 'IntersectionObserver' in window) {
    const ids = secLinks.map(a => a.dataset.section);
    const seen = new Set();
    const so = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) seen.add(e.target.id); else seen.delete(e.target.id); });
      const cur = ids.find(id => seen.has(id));
      secLinks.forEach(a => {
        if (a.dataset.section === cur) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    }, { threshold: 0.25 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) so.observe(el); });
  }

  /* ── copy email ── */
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.copy;
      const done = () => {
        btn.classList.add('copied');
        clearTimeout(btn._t);
        btn._t = setTimeout(() => btn.classList.remove('copied'), 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(v).then(done, () => { location.href = 'mailto:' + v; });
      } else {
        location.href = 'mailto:' + v;
      }
    });
  });
})();
