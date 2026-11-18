(function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }

  var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  if (standalone) return;

  var btn = document.createElement("button");
  btn.textContent = "⬇ Install app";
  btn.style.cssText = "display:none;position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:9999;padding:8px 16px;border:0;border-radius:20px;background:#fff;color:#4f46e5;font-size:14px;font-weight:bold;box-shadow:0 3px 10px rgba(0,0,0,.25)";
  document.body.appendChild(btn);

  var deferred = null;
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
    btn.style.display = "block";
  });
  window.addEventListener("appinstalled", function () { btn.style.display = "none"; });

  if (isIOS) btn.style.display = "block";

  btn.onclick = async function () {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice;
      deferred = null;
      btn.style.display = "none";
    } else if (isIOS) {
      alert("To install: tap the Share button in Safari, then choose Add to Home Screen.");
    } else {
      alert("To install: open your browser menu and tap Install app or Add to Home screen.");
    }
  };
})();