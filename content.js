(() => {
  const LINEAR_BASE_URL = "https://linear.app/additive/issue/";

  function findLinearId(text) {
    if (!text) return null;
    const regex = /\b([a-z]{3,}-\d+)\b/i;
    const match = text.match(regex);
    return match ? match[1].toUpperCase() : null;
  }

  function getBranchFromUrl() {
    const href = window.location.href;
    const treeMarker = "/tree/";
    const treePos = href.indexOf(treeMarker);
    if (treePos === -1) return null;

    let after = href.substring(treePos + treeMarker.length).split(/[?#]/)[0];

    // Try decoding in case branch contains encoded slashes
    try {
      after = decodeURIComponent(after);
    } catch (_) {}

    return after;
  }

  function makeButton(linearId) {
    const a = document.createElement("a");
    a.id = "linear-link-button";
    a.href = `${LINEAR_BASE_URL}${linearId}`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = `Open ${linearId} in Linear`;
    a.style.marginLeft = "8px";
    a.style.padding = "5px 10px";
    a.style.background = "#5E6AD2";
    a.style.color = "#fff";
    a.style.borderRadius = "6px";
    a.style.fontSize = "13px";
    a.style.textDecoration = "none";
    a.style.display = "inline-block";
    a.style.lineHeight = "20px";
    a.style.boxShadow = "0 1px 0 rgba(0,0,0,0.04)";
    return a;
  }

  function insertButton(linearId) {
    if (!linearId) return;
    if (document.querySelector("#linear-link-button")) return;

    const container =
      document.querySelector(".gh-header-actions") ||
      document.querySelector(".pagehead-actions") ||
      document.querySelector(".file-navigation") ||
      document.querySelector("main .d-flex.flex-items-center") ||
      document.querySelector("main h1") ||
      document.querySelector("header[role='banner']");

    if (!container) return;

    const btn = makeButton(linearId);
    try {
      container.prepend(btn);
    } catch (_) {
      container.appendChild(btn);
    }
  }

  function run() {
    const branch = getBranchFromUrl();
    if (!branch) return;
    const linearId = findLinearId(branch);
    if (linearId) insertButton(linearId);
  }

  // Run immediately
  run();

  // Observe DOM changes (SPA navigation)
  const mo = new MutationObserver(run);
  mo.observe(document.body, { subtree: true, childList: true });

  // Handle history navigation
  (function () {
    const push = history.pushState;
    history.pushState = function () {
      push.apply(this, arguments);
      setTimeout(run, 50);
    };
    const replace = history.replaceState;
    history.replaceState = function () {
      replace.apply(this, arguments);
      setTimeout(run, 50);
    };
    window.addEventListener("popstate", () => setTimeout(run, 50));
  })();
})();
