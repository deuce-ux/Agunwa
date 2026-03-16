// ── Project filter custom dropdown ───────────────────
(function () {
  const dropdown    = document.getElementById('filterDropdown');
  const trigger     = document.getElementById('filterTrigger');
  const triggerText = document.getElementById('filterTriggerText');
  const panel       = document.getElementById('filterPanel');
  const options     = document.querySelectorAll('.filter-option');
  const cards       = document.querySelectorAll('.project-card');
  if (!dropdown) return;

  var open = false;

  function openPanel() {
    open = true;
    panel.style.display = 'block';
    dropdown.classList.add('open');
  }

  function closePanel() {
    open = false;
    panel.style.display = 'none';
    dropdown.classList.remove('open');
  }

  cards.forEach(function (card) {
    card.style.transition = 'opacity 200ms ease';
  });

  // Toggle open/close
  trigger.addEventListener('click', function () {
    open ? closePanel() : openPanel();
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (open && !dropdown.contains(e.target)) {
      closePanel();
    }
  });

  // Filter logic
  function applyFilter(filter) {
    cards.forEach(function (card) {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.style.display = '';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            card.style.opacity = '1';
            card.style.pointerEvents = '';
          });
        });
      } else {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        setTimeout(function () {
          if (card.style.opacity === '0') card.style.display = 'none';
        }, 200);
      }
    });
  }

  // Option click
  options.forEach(function (opt) {
    opt.addEventListener('click', function () {
      const value = opt.dataset.value;
      // Update active state
      options.forEach(function (o) { o.classList.remove('active'); });
      opt.classList.add('active');
      // Update trigger label
      triggerText.textContent = opt.textContent;
      // Close panel
      closePanel();
      // Apply filter
      applyFilter(value);
    });
  });
})();

// Fade-in on load is handled by CSS animation on body.
// Hide broken project images gracefully so background colour shows through.
document.querySelectorAll('.project-img').forEach(function (img) {
  img.addEventListener('error', function () {
    img.style.display = 'none';
  });
});

// Hide broken thought images gracefully so CSS placeholder shows through.
document.querySelectorAll('.thought-img').forEach(function (img) {
  img.addEventListener('error', function () {
    img.style.display = 'none';
  });
});
