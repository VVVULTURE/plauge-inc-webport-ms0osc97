const FRAME_PROXY_SW_URL = "/active/sw.js";
const FRAME_PROXY_TRANSPORT = "/js/libcurlbareclient.mjs?v=20260509-1";
const FRAME_PROXY_WORKER = "/baremux/worker.js";
const FRAME_PROXY_FALLBACK_PREFIX = "/active/go/";
function getFrameTargetFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("url") || "";
}
function normalizeFrameTarget(rawTarget) {
  if (!rawTarget) {
    return "";
  }
  try {
    const parsedTarget = new URL(rawTarget, window.location.href);
    if (parsedTarget.protocol !== "http:" && parsedTarget.protocol !== "https:") {
      return "";
    }
    if (parsedTarget.origin === window.location.origin) {
      return `${parsedTarget.pathname}${parsedTarget.search}${parsedTarget.hash}`;
    }
    return parsedTarget.href;
  } catch {
    return "";
  }
}
function getUvPrefix() {
  return window.__uv$config?.prefix || FRAME_PROXY_FALLBACK_PREFIX;
}
function isUvProxyTarget(target) {
  return typeof target === "string" && target.startsWith(getUvPrefix());
}
function getWispUrl() {
  return `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/wisp/`;
}
async function waitForRegistrationActivation(registration) {
  const worker = registration.installing || registration.waiting || registration.active;
  if (!worker || worker.state === "activated") {
    return registration;
  }
  await new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, 10000);
    worker.addEventListener("statechange", () => {
      if (worker.state === "activated") {
        window.clearTimeout(timeoutId);
        resolve();
      } else if (worker.state === "redundant") {
        window.clearTimeout(timeoutId);
        reject(new Error("Frame proxy service worker became redundant during activation."));
      }
    });
  });
  return registration;
}
async function ensureUvProxyReady() {
  if (!window.BareMux) {
    throw new Error("BareMux is unavailable on the frame page.");
  }
  if (!navigator.serviceWorker) {
    throw new Error("Service workers are unavailable in this browser.");
  }
  if (!window.__frameBareMuxConnection) {
    window.__frameBareMuxConnection = new BareMux.BareMuxConnection(FRAME_PROXY_WORKER);
  }
  const connection = window.__frameBareMuxConnection;
  try {
    await connection.setTransport(FRAME_PROXY_TRANSPORT, [
      await window.TruffledProxyRegion.getTransportOptions(getWispUrl()),
    ]);
  } catch (error) {
    console.warn("frame proxy transport reset", error);
    await connection.setTransport(FRAME_PROXY_TRANSPORT, [
      await window.TruffledProxyRegion.getTransportOptions(getWispUrl()),
    ]);
  }
  const registration = await navigator.serviceWorker.register(FRAME_PROXY_SW_URL, {
    scope: getUvPrefix(),
    updateViaCache: "none",
  });
  await registration.update();
  await waitForRegistrationActivation(registration);
}
async function bootstrapFrameProxy() {
  const frame = document.getElementById("gameframe");
  const rawTarget = getFrameTargetFromQuery();
  if (!frame || !rawTarget) {
    return;
  }
  const target = normalizeFrameTarget(rawTarget);
  if (!target) {
    frame.src = "/404.html";
    return;
  }
  if (isUvProxyTarget(target)) {
    await ensureUvProxyReady();
  }
  frame.src = target;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    bootstrapFrameProxy().catch((error) => {
      console.error("frame proxy bootstrap error", error);
    });
  }, { once: true });
} else {
  bootstrapFrameProxy().catch((error) => {
    console.error("frame proxy bootstrap error", error);
  });
}
