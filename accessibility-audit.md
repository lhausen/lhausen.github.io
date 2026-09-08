# Accessibility Audit: lhausen.github.io

**Standard:** WCAG 2.1 AA | **Date:** May 23, 2026 | **Scope:** index.html, blog/index.html, blog/posts/*, style.css, post.css

---

## Summary

**Issues found: 14** | **Critical: 4** | **Major: 7** | **Minor: 3**

The site has a solid foundation — good semantic HTML in most places, meaningful alt text on images, and a working dark mode. The issues below are fixable in an afternoon and will meaningfully improve accessibility for keyboard users, screen reader users, and people sensitive to motion.

---

## Findings

### Perceivable

| # | Issue | WCAG Criterion | Severity | Location |
|---|-------|---------------|----------|----------|
| P1 | `--muted-light` (#9ca3af) on white fails at **2.54:1** (needs 4.5:1) — used for CV dates, blog dates, `cv-group-title` labels, and footer text | 1.4.3 Contrast | 🔴 Critical | style.css, used across all pages |
| P2 | Dark mode `--muted-light` (#64748b) on dark backgrounds (#0f172a / #1e293b) fails at **3.07–3.75:1** (needs 4.5:1) — same elements as P1 in dark mode | 1.4.3 Contrast | 🔴 Critical | style.css dark mode |
| P3 | Dark mode section labels and tags: accent blue (#2563eb) on dark subtle bg (#1e293b) fails at **2.83:1**; tag text on dark accent-bg fails at **2.52:1** | 1.4.3 Contrast | 🔴 Critical | style.css dark mode, section labels and `.tag` chips |
| P4 | No `prefers-reduced-motion` support — the hero particle animation and typewriter effect run continuously regardless of the user's OS-level motion preference | 2.3.3 Animation, 2.2.2 Pause/Stop | 🔴 Critical | index.html `<script>` |
| P5 | Logo SVG on blog and post pages uses `aria-hidden="true"` but the parent `<a>` has no text label, making it an unlabeled link (compare: `index.html` correctly uses `aria-label` on the SVG) | 1.1.1 Non-text Content, 4.1.2 | 🟡 Major | blog/index.html line 25, blog/posts/*.html |

### Operable

| # | Issue | WCAG Criterion | Severity | Location |
|---|-------|---------------|----------|----------|
| O1 | No skip navigation link — keyboard users must tab through the full nav bar (7–8 items) on every page load before reaching main content | 2.4.1 Bypass Blocks | 🟡 Major | All pages |
| O2 | `.lang-toggle` has `outline: none` in CSS with no alternative focus indicator, making it invisible to keyboard users | 2.4.7 Focus Visible | 🟡 Major | style.css line 192 |
| O3 | Hamburger menu button (`#navToggle`) has no `aria-expanded` attribute — screen readers cannot tell whether the mobile menu is open or closed | 4.1.2 Name, Role, Value | 🟡 Major | All pages |
| O4 | All nav toggle buttons (theme toggle: 32×32px, lang toggle: ~24×30px, scroll-to-top: 42×42px, hamburger: ~28×28px) fall below the 44×44 CSS pixel minimum touch target size | 2.5.5 Target Size | 🟡 Major | style.css |
| O5 | Blog filter buttons (All / Research / Reflections / Thesis) act as toggle buttons but have no `aria-pressed` attribute — screen readers cannot announce which filter is active | 4.1.2 Name, Role, Value | 🟡 Major | blog/index.html |

### Understandable

| # | Issue | WCAG Criterion | Severity | Location |
|---|-------|---------------|----------|----------|
| U1 | `<html lang="en">` is never updated when the language toggle switches content to German. All pages remain declared as English even when displaying German text, which breaks screen reader pronunciation | 3.1.1 Language of Page | 🟡 Major | All pages, JS `applyLang()` function |
| U2 | No `<main>` landmark element — the main content is not wrapped in `<main>`, so screen reader users cannot jump directly to it with a landmark shortcut | 1.3.1 Info and Structure | 🟢 Minor | All pages |

### Robust

| # | Issue | WCAG Criterion | Severity | Location |
|---|-------|---------------|----------|----------|
| R1 | Orphaned `</a>` closing tag at line 136 of `index.html` inside the research section (the third pub-card `<div>` is missing its closing `</div>` and has an extra `</a>`) — malformed HTML that parsers and AT may handle inconsistently | 4.1.1 Parsing | 🟢 Minor |index.html line 136 |
| R2 | Blog list item titles (`<div class="blog-title">`) are plain `<div>` elements inside `<a>` links rather than semantic headings — assistive technologies cannot present the blog list as a heading structure | 1.3.1 Info and Structure | 🟢 Minor | blog/index.html |

---

## Color Contrast Check

| Element | Foreground | Background | Ratio | Required | Pass? |
|---------|-----------|------------|-------|----------|-------|
| Body text | #111827 | #ffffff | 17.74:1 | 4.5:1 | ✅ |
| Muted text (descriptions) | #6b7280 | #ffffff | 4.83:1 | 4.5:1 | ✅ |
| **Muted-light (dates, labels, footer)** | **#9ca3af** | **#ffffff** | **2.54:1** | **4.5:1** | **❌** |
| Hero eyebrow (accent blue) | #3b82f6 | #0f172a | 4.85:1 | 4.5:1 | ✅ |
| Hero bio text | #94a3b8 | #0f172a | 6.96:1 | 4.5:1 | ✅ |
| Section label (accent) | #2563eb | #f9fafb | 4.95:1 | 4.5:1 | ✅ |
| Tag text | #2563eb | #eff6ff | 4.75:1 | 4.5:1 | ✅ |
| Status badge "In Progress" | #92400e | #fef3c7 | 6.37:1 | 4.5:1 | ✅ |
| Status badge "Done" | #065f46 | #d1fae5 | 6.78:1 | 4.5:1 | ✅ |
| Post body text | #374151 | #ffffff | 10.31:1 | 4.5:1 | ✅ |
| Dark mode: body text | #f1f5f9 | #0f172a | 16.30:1 | 4.5:1 | ✅ |
| Dark mode: muted text | #94a3b8 | #0f172a | 6.96:1 | 4.5:1 | ✅ |
| **Dark mode: muted-light** | **#64748b** | **#0f172a** | **3.75:1** | **4.5:1** | **❌** |
| **Dark mode: muted-light on subtle bg** | **#64748b** | **#1e293b** | **3.07:1** | **4.5:1** | **❌** |
| **Dark mode: section label (accent)** | **#2563eb** | **#1e293b** | **2.83:1** | **4.5:1** | **❌** |
| **Dark mode: tag text** | **#2563eb** | **~#243050** | **2.52:1** | **4.5:1** | **❌** |

---

## Priority Fixes (with code)

### 1. Fix `--muted-light` contrast (P1, P2) — Critical

Replace the two muted-light values in `style.css` so they meet 4.5:1 on their respective backgrounds.

```css
:root {
  --muted-light: #6b7280; /* was #9ca3af — now matches --muted, ratio 4.83:1 on white ✅ */
}

[data-theme="dark"] {
  --muted-light: #94a3b8; /* was #64748b — matches --muted, ratio 6.96:1 on dark bg ✅ */
}
```

> This is a one-line change per mode and also fixes footer text contrast.

### 2. Fix dark mode accent contrast for labels and tags (P3) — Critical

In dark mode, the blue accent (#2563eb) is too dark against the dark backgrounds. Lighten it to `#60a5fa` (the same blue used in the hero gradient, which already passes):

```css
[data-theme="dark"] {
  --accent: #60a5fa;        /* was #2563eb — ratio 8.6:1 on dark bg ✅ */
  --accent-light: #93c5fd;
}
```

> Note: test button hover states after this change. The `.btn-primary` background will also lighten in dark mode, which may look better on the dark canvas.

### 3. Add `prefers-reduced-motion` support (P4) — Critical

In `style.css`, add at the bottom:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-name span { animation: none; }
  .fade-up { transition: none; }
  .fade-up.visible { opacity: 1; transform: none; }
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

In `index.html`, wrap the particle animation and typewriter in a motion check:

```javascript
// Particle background — skip if reduced motion preferred
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  (function() {
    /* existing particle animation code */
  })();
}

// Typewriter — skip if reduced motion preferred
if (!prefersReducedMotion) {
  setTimeout(tick, PAUSE_AFTER_TYPE);
}
```

### 4. Fix unlabeled logo link on blog/post pages (P5) — Major

In `blog/index.html` and all `blog/posts/*.html`, the logo SVG uses `aria-hidden="true"` but the `<a>` has no accessible name. Change the `<a>` to carry the label:

```html
<!-- Before -->
<a class="logo" href="../index.html">
  <svg aria-hidden="true" ...>...</svg>
</a>

<!-- After -->
<a class="logo" href="../index.html" aria-label="Leonard Fredershausen — Home">
  <svg aria-hidden="true" ...>...</svg>
</a>
```

### 5. Add a skip navigation link (O1) — Major

Add this as the very first element inside `<body>` on every page:

```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```

In `style.css`:
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  background: var(--accent);
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 0 0 8px 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: top 0.15s;
}
.skip-link:focus { top: 0; }
```

Then add `id="main-content"` to the first `<section>` or a wrapping `<main>` element.

### 6. Fix the `outline: none` on lang-toggle (O2) — Major

In `style.css`, remove the `outline: none` from `.lang-toggle` and replace with a styled focus ring:

```css
.lang-toggle {
  /* remove: outline: none; */
}
.lang-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

Apply the same pattern to `.nav-toggle` (which also suppresses outlines via browser default removal).

### 7. Add `aria-expanded` to the hamburger button (O3) — Major

Update the JS in all pages that use the hamburger:

```javascript
navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navUl.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen); // ← add this
});
```

Also initialize it: add `aria-expanded="false"` to the HTML button element.

### 8. Increase touch target sizes (O4) — Major

```css
/* Theme toggle: bump to 44×44 */
.theme-toggle { width: 44px; height: 44px; }

/* Scroll-to-top: bump to 44×44 */
.scroll-top { width: 44px; height: 44px; }

/* Nav toggle: add padding to reach 44px hit area */
.nav-toggle { padding: 12px; }

/* Lang toggle: increase padding */
.lang-toggle { padding: 0.5rem 0.75rem; min-height: 44px; }
```

### 9. Add `aria-pressed` to filter buttons (O5) — Major

In `blog/index.html`, add `aria-pressed="true"` to the initially active button and `aria-pressed="false"` to the others:

```html
<button class="filter-btn active" data-tag="all" aria-pressed="true">All</button>
<button class="filter-btn" data-tag="research" aria-pressed="false">Research</button>
```

In the JS:
```javascript
btns.forEach(b => {
  b.classList.remove('active');
  b.setAttribute('aria-pressed', 'false');
});
btn.classList.add('active');
btn.setAttribute('aria-pressed', 'true');
```

### 10. Update `lang` attribute on language switch (U1) — Major

In the `applyLang()` JS function on every page:

```javascript
function applyLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang); // ← add this
  langToggle.textContent = lang === 'en' ? 'DE' : 'EN';
  /* ... rest of function ... */
}
```

### 11. Wrap content in `<main>` (U2) — Minor

Wrap all sections between the `<nav>` and `<footer>` in a `<main>` element, and add `id="main-content"` (which the skip link from fix #5 targets):

```html
<main id="main-content">
  <section id="about">...</section>
  <section id="research">...</section>
  <section id="cv">...</section>
  <section id="contact">...</section>
</main>
```

### 12. Fix orphaned `</a>` tag (R1) — Minor

In `index.html` around line 136, the closing `</div>` for the third `.pub-card` is missing and there is an orphan `</a>`. The corrected structure should be:

```html
      <div class="pub-actions">
        <a class="pub-read-more" href="blog/posts/buergergeld-faktencheck.html" ...>Read Faktencheck →</a>
      </div>
    </div>  ← closes .pub-card
  </div>    ← closes .section-inner
</section>
```

Remove the stray `</a>` at line 136.

### 13. Use semantic headings in blog list (R2) — Minor

In `blog/index.html`, change blog title divs to `<h2>` (or `<h3>` if you add a section heading):

```html
<!-- Before -->
<div class="blog-title">Getting Started: Measuring Hamburg's Solar Mandate</div>

<!-- After -->
<h2 class="blog-title">Getting Started: Measuring Hamburg's Solar Mandate</h2>
```

Adjust `style.css` if needed so the visual style remains unchanged.

---

## What's Already Good

- `<html lang="en">` present on all pages (though not dynamically updated — see U1)
- Meaningful `aria-label` on the theme toggle, nav toggle, and scroll-to-top button
- Blog post hero image has descriptive alt text (`alt="Solar panels on a rooftop"`)
- Logo on `index.html` has `aria-label="Leonard Fredershausen"` on the SVG
- Reading progress bar is `pointer-events: none` — does not interfere with interaction
- `rel="noopener"` on all `target="_blank"` links
- Logical heading hierarchy (h1 → h2 → h3 → h4) is maintained throughout
- Dark mode is implemented properly with CSS variables throughout
- Scroll behavior uses `{ passive: true }` for performance

---

*Generated May 23, 2026 · Manual code review + automated contrast calculations · WCAG 2.1 AA standard*
