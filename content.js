const PANEL_ID = "ai-emotional-panel-root";

let lastMouseX = window.innerWidth - 424;
let lastMouseY = window.innerHeight - 624;

document.addEventListener("contextmenu", (e) => {
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "showPanel") {
    const existing = document.getElementById(PANEL_ID);
    if (existing) { existing.remove(); return; }
    showPanel();
  }
});

function showPanel() {
  const W = 400, H = 600, GAP = 8;
  let x = lastMouseX + GAP;
  let y = lastMouseY;
  if (x + W > window.innerWidth)  x = lastMouseX - W - GAP;
  if (y + H > window.innerHeight) y = window.innerHeight - H - GAP;
  if (x < 0) x = GAP;
  if (y < 0) y = GAP;

  const root = document.createElement("div");
  root.id = PANEL_ID;
  Object.assign(root.style, {
    position: "fixed",
    left: x + "px",
    top: y + "px",
    width: "400px",
    height: "600px",
    zIndex: "2147483647",
    borderRadius: "16px",
    boxShadow: "0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
    overflow: "hidden",
    animation: "aer-slide-in 0.2s cubic-bezier(0.34,1.56,0.64,1)"
  });

  const style = document.createElement("style");
  style.textContent = `
    @keyframes aer-slide-in {
      from { opacity: 0; transform: translateY(16px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);

  const iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL("panel.html");
  Object.assign(iframe.style, {
    width: "100%",
    height: "100%",
    border: "none",
    display: "block"
  });

  // drag handle bar
  const dragBar = document.createElement("div");
  Object.assign(dragBar.style, {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    height: "20px",
    cursor: "grab",
    zIndex: "1",
    background: "transparent"
  });
  root.appendChild(dragBar);

  // transparent overlay to capture mouse events while dragging over the iframe
  const dragOverlay = document.createElement("div");
  Object.assign(dragOverlay.style, {
    position: "absolute",
    top: "0", left: "0", right: "0", bottom: "0",
    zIndex: "2",
    display: "none",
    cursor: "grabbing"
  });
  root.appendChild(dragOverlay);

  let dragging = false, dragOffX = 0, dragOffY = 0;
  dragBar.addEventListener("mousedown", (e) => {
    dragging = true;
    dragOffX = e.clientX - root.getBoundingClientRect().left;
    dragOffY = e.clientY - root.getBoundingClientRect().top;
    dragBar.style.cursor = "grabbing";
    dragOverlay.style.display = "block";
    e.preventDefault();
  });
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    let nx = e.clientX - dragOffX;
    let ny = e.clientY - dragOffY;
    nx = Math.max(0, Math.min(nx, window.innerWidth - 400));
    ny = Math.max(0, Math.min(ny, window.innerHeight - 600));
    root.style.left = nx + "px";
    root.style.top  = ny + "px";
  });
  document.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    dragBar.style.cursor = "grab";
    dragOverlay.style.display = "none";
  });

  root.appendChild(iframe);
  document.body.appendChild(root);

  window.addEventListener("message", (e) => {
    if (e.data === "closePanel") {
      root.style.animation = "none";
      root.style.opacity = "0";
      root.style.transform = "translateY(12px) scale(0.97)";
      root.style.transition = "all 0.15s ease";
      setTimeout(() => root.remove(), 150);
    }
  });
}
