(function () {
  function updateTabSet(tabset) {
    const labels = tabset.querySelectorAll(".tabbed-labels > label");
    labels.forEach(l => l.classList.remove("adp-tab-active"));

    const checked = tabset.querySelector('input[type="radio"]:checked');
    if (!checked) return;

    const active = tabset.querySelector(`.tabbed-labels > label[for="${checked.id}"]`);
    if (active) active.classList.add("adp-tab-active");
  }

  function updateAll() {
    document.querySelectorAll(".md-typeset .tabbed-set").forEach(updateTabSet);
  }

  // Run immediately
  updateAll();

  // Run on any radio change inside tabbed-set
  document.addEventListener("change", (e) => {
    const tabset = e.target?.closest?.(".tabbed-set");
    if (tabset) updateTabSet(tabset);
  });

  // Material instant navigation (this is the key hook)
  if (window.document$?.subscribe) {
    window.document$.subscribe(() => {
      // content is swapped in after navigation; update afterwards
      requestAnimationFrame(updateAll);
    });
  } else {
    document.addEventListener("DOMContentLoaded", updateAll);
  }

  // Debug proof (remove later)
  console.log("[ADP] tab active marker loaded");
})();