(function () {
  const ADS_STORAGE_KEY = "adsEnabled";
  const SETTINGS_CHANNEL = "truffled-settings";
  const AD_SCRIPT_ATTRIBUTE = "data-truffled-ad-script";
  const configuredScripts = Array.isArray(window.TRUFFLED_AD_SCRIPTS)
    ? window.TRUFFLED_AD_SCRIPTS.filter(Boolean)
    : [];
  const channel = typeof BroadcastChannel === "function"
    ? new BroadcastChannel(SETTINGS_CHANNEL)
    : null;

  function adsAreEnabled() {
    const storedValue = localStorage.getItem(ADS_STORAGE_KEY);
    return storedValue === null ? true : storedValue === "true";
  }

  function removeAds() {
    document
      .querySelectorAll('iframe[src*="effectivegatecpm"], iframe[src*="richinfo"], iframe[src*="syndication"]')
      .forEach((element) => element.remove());
    document
      .querySelectorAll('div[id^="pl"], div[class*="adsbygoogle"], [class*="social-bar"], [id*="social-bar"]')
      .forEach((element) => element.remove());
    document
      .querySelectorAll(`script[${AD_SCRIPT_ATTRIBUTE}], script[src*="effectivegatecpm"], script[src*="richinfo"]`)
      .forEach((element) => element.remove());
    document.querySelectorAll("ins, .adsbygoogle").forEach((element) => element.remove());
  }

  function injectAds() {
    configuredScripts.forEach((src) => {
      if (document.querySelector(`script[${AD_SCRIPT_ATTRIBUTE}="${src}"]`)) {
        return;
      }

      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      script.setAttribute(AD_SCRIPT_ATTRIBUTE, src);
      (document.body || document.head || document.documentElement).appendChild(script);
    });
  }

  function syncAds() {
    if (adsAreEnabled()) {
      injectAds();
      return;
    }

    removeAds();
  }

  window.TruffledAds = {
    adsAreEnabled,
    removeAds,
    syncAds,
  };
  window.removeAds = removeAds;

  window.addEventListener("storage", (event) => {
    if (event.key === ADS_STORAGE_KEY) {
      syncAds();
    }
  });

  if (channel) {
    channel.addEventListener("message", (event) => {
      if (event.data?.type === "ads-setting-changed") {
        syncAds();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncAds, { once: true });
  } else {
    syncAds();
  }
})();
