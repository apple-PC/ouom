/* ouom 官网 · 轻量交互：入场动效与爱发电首次提示 */
(function () {
  'use strict';

  // 滚动入场
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  // 爱发电：首次访问弹窗，关闭后写入 localStorage，后续不再打扰
  var KEY = 'ouom_afdian_dismissed';
  var overlay = document.getElementById('afdOverlay');
  if (!overlay) return;

  function dismiss() {
    try { window.localStorage.setItem(KEY, '1'); } catch (e) { /* 隐私模式下忽略 */ }
    overlay.classList.remove('show');
  }

  var shown = false;
  try { shown = window.localStorage.getItem(KEY) === '1'; } catch (e) { shown = false; }
  if (!shown) {
    window.setTimeout(function () { overlay.classList.add('show'); }, 1100);
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) dismiss();
  });
  document.querySelectorAll('[data-afd-dismiss]').forEach(function (el) {
    el.addEventListener('click', dismiss);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) dismiss();
  });
})();
