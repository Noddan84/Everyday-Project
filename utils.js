// utils.js
export function showMessage(message) {
  if (document.getElementById("reminderOverlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "reminderOverlay"; // <-- TESTET KRÄVER DETTA
  overlay.style =
    "position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:999;";
  document.body.appendChild(overlay);

  const alertDiv = document.createElement("div");
  alertDiv.style =
    "background:red;padding:30px;border-radius:10px;text-align:center;color:#2c3e50;font-family:'Play',sans-serif;";
  alertDiv.textContent = message;

  const btn = document.createElement("button");
  btn.textContent = "OK";
  btn.style = "display:block;margin:20px auto 0 auto;padding:10px;";
  btn.addEventListener("click", () => {
    overlay.remove();
  });

  alertDiv.appendChild(btn);
  overlay.appendChild(alertDiv);
}