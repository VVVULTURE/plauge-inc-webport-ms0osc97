(function () {
  const REGION_SETTING_KEY = "proxyRegion";
  const FALLBACK_CONFIG = {
    defaultRegion: "direct",
    regions: [{ id: "direct", label: "Direct server", proxy: null }],
  };
  let configPromise = null;
  function normalizeConfig(data) {
    const regions = Array.isArray(data?.regions)
      ? data.regions
          .map((region) => ({
            id: String(region.id || "").trim(),
            label: String(region.label || region.id || "").trim(),
            proxy: region.proxy ? String(region.proxy).trim() : null,
          }))
          .filter((region) => region.id && region.label)
      : [];
    if (!regions.some((region) => region.id === "direct")) {
      regions.unshift(FALLBACK_CONFIG.regions[0]);
    }
    return {
      defaultRegion: regions.some((region) => region.id === data?.defaultRegion)
        ? data.defaultRegion
        : "direct",
      regions,
    };
  }
  async function getConfig() {
    if (!configPromise) {
      configPromise = fetch("/api/proxy-regions", { cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error("proxy region config failed");
          return response.json();
        })
        .then(normalizeConfig)
        .catch((error) => {
          console.warn("proxy region config fallback", error);
          return normalizeConfig(FALLBACK_CONFIG);
        });
    }
    return configPromise;
  }
  async function getSelectedRegion() {
    const config = await getConfig();
    const savedRegion = localStorage.getItem(REGION_SETTING_KEY) || config.defaultRegion;
    return config.regions.find((region) => region.id === savedRegion)
      || config.regions.find((region) => region.id === config.defaultRegion)
      || config.regions[0];
  }
  async function getTransportOptions(websocket) {
    const region = await getSelectedRegion();
    const options = { websocket };
    if (region?.proxy) {
      options.proxy = region.proxy;
    }
    return options;
  }
  function saveRegionId(regionId) {
    localStorage.setItem(REGION_SETTING_KEY, regionId || "direct");
  }
  async function bindRegionSelect(selectElement, statusElement) {
    if (!selectElement) return;
    const config = await getConfig();
    const selectedRegion = await getSelectedRegion();
    selectElement.innerHTML = "";
    for (const region of config.regions) {
      const option = document.createElement("option");
      option.value = region.id;
      option.textContent = region.label;
      selectElement.appendChild(option);
    }
    selectElement.value = selectedRegion.id;
    if (statusElement) {
      statusElement.textContent = `${selectedRegion.label} is selected.`;
    }
    selectElement.onchange = () => {
      const region = config.regions.find((entry) => entry.id === selectElement.value)
        || config.regions[0];
      saveRegionId(region.id);
      if (statusElement) {
        statusElement.textContent = `${region.label} is selected.`;
      }
    };
  }
  window.TruffledProxyRegion = {
    key: REGION_SETTING_KEY,
    bindRegionSelect,
    getConfig,
    getSelectedRegion,
    getTransportOptions,
    saveRegionId,
  };
})();
