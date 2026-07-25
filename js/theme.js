(function () {
  const THEME_KEY = "truffledTheme";
  const CHANNEL_KEY = "truffled-theme";
  const themeChannel = typeof BroadcastChannel === "function"
    ? new BroadcastChannel(CHANNEL_KEY)
    : null;
  const themes = {
    default: {
      name: "default"
    },
    green: {
      name: "green",
      bg: "#06170b",
      bgAlt: "#031008",
      surface: "#0b2412",
      surface2: "#10381b",
      border: "#1d6b35",
      text: "#f0fff4",
      muted: "#a9cdb2",
      accent: "#22c55e",
      highlight: "#15803d",
      cursor: { url: "/cursors/tinted/green/cursor.cur", hotspot: [0, 0] },
      linkCursor: { url: "/cursors/tinted/green/link.cur", hotspot: [0, 0] },
      textCursor: { url: "/cursors/tinted/green/text.cur", hotspot: [0, 0] }
    },
    gray: {
      name: "gray",
      bg: "#1a1a1a",
      bgAlt: "#181818",
      surface: "#1f1f1f",
      surface2: "#202020",
      border: "#4d4d4d",
      text: "#f2f5f7",
      muted: "#aab3bb",
      accent: "rgb(104, 104, 104)",
      highlight: "rgb(75, 75, 75)",
      cursor: { url: "/cursors/tinted/gray/cursor.cur", hotspot: [0, 0] },
      linkCursor: { url: "/cursors/tinted/gray/link.cur", hotspot: [0, 0] },
      textCursor: { url: "/cursors/tinted/gray/text.cur", hotspot: [0, 0] }
    },
    blue: {
      name: "blue",
      bg: "#112e4d",
      bgAlt: "#081a2e",
      surface: "#194268",
      surface2: "#2b7ec7",
      border: "#2574af",
      text: "#f0f8ff",
      muted: "#a8bfd3",
      accent: "#38bdf8",
      highlight: "#0580c2",
      cursor: { url: "/cursors/tinted/blue/cursor.cur", hotspot: [0, 0] },
      linkCursor: { url: "/cursors/tinted/blue/link.cur", hotspot: [0, 0] },
      textCursor: { url: "/cursors/tinted/blue/text.cur", hotspot: [0, 0] }
    },
    go: {
      name: "go",
      bg: "#0c424e",
      bgAlt: "#09343f",
      surface: "#145f6e",
      surface2: "#166c7e",
      border: "#2fd2eb",
      text: "#effdff",
      muted: "#ace4ea",
      accent: "#00c8e8",
      highlight: "#0099b8"
    },
    purple: {
      name: "purple",
      bg: "#160a24",
      bgAlt: "#0f0718",
      surface: "#241336",
      surface2: "#32194c",
      border: "#6d3aa0",
      text: "#faf5ff",
      muted: "#cdb7df",
      accent: "#a855f7",
      highlight: "#7e22ce",
      cursor: { url: "/cursors/tinted/purple/cursor.cur", hotspot: [0, 0] },
      linkCursor: { url: "/cursors/tinted/purple/link.cur", hotspot: [0, 0] },
      textCursor: { url: "/cursors/tinted/purple/text.cur", hotspot: [0, 0] }
    },
    "cruety-squad": {
      name: "cruety squad",
      bg: "#151008",
      bgAlt: "#0f0c06",
      surface: "#221a0e",
      surface2: "#0e6614",
      border: "#0c8218",
      text: "#f8fbff",
      muted: "#b8b7b3",
      accent: "#0a9b1b",
      highlight: "#087915",
      image: "/cursors/cruety-squad/bg.webp",
      cursor: { url: "/cursors/cruety-squad/cursor.cur", hotspot: [4, 6] },
      linkCursor: { url: "/cursors/cruety-squad/link.cur", hotspot: [10, 12] },
      textCursor: { url: "/cursors/cruety-squad/text.cur", hotspot: [4, 6] }
    },
    "cut-the-rope": {
      name: "cut the rope",
      bg: "#c6a16b",
      bgAlt: "#6b482b",
      surface: "#8b633b",
      surface2: "#d8b17a",
      border: "#c18a4f",
      text: "#f8fbff",
      muted: "#f7ead4",
      accent: "#7fbf2a",
      highlight: "#4f7e1c",
      image: "/cursors/cut-the-rope/bg.webp",
      cursor: { url: "/cursors/cut-the-rope/cursor.cur", hotspot: [0, 0] },
      linkCursor: { url: "/cursors/cut-the-rope/link.cur", hotspot: [0, 0] },
      textCursor: { url: "/cursors/cut-the-rope/text.cur", hotspot: [0, 0] }
    },
    "frutiger-aero": {
      name: "frutiger aero",
      bg: "#8bd8ff",
      bgAlt: "#d7f8ff",
      surface: "#f7ffff",
      surface2: "#b8f25b",
      border: "#24a8e8",
      text: "#06386a",
      muted: "#2c718d",
      accent: "#08a8ee",
      highlight: "#6bd91f",
      image: "/cursors/frutiger-aero/bg.webp",
      cursor: { url: "/cursors/frutiger-aero/cursor.cur", hotspot: [0, 0] },
      linkCursor: { url: "/cursors/frutiger-aero/link.cur", hotspot: [5, 0] },
      textCursor: { url: "/cursors/frutiger-aero/text.cur", hotspot: [0, 0] }
    },
    hands: {
      name: "hands",
      bg: "#44403d",
      bgAlt: "#302d2c",
      surface: "#6d6662",
      surface2: "#6c3926",
      border: "#79371f",
      text: "#f8fbff",
      muted: "#f0f1f3",
      accent: "#853619",
      highlight: "#672a13",
      image: "/cursors/hands/bg.webp",
      cursor: { url: "/cursors/hands/cursor.cur", hotspot: [0, 0] },
      linkCursor: { url: "/cursors/hands/link.cur", hotspot: [10, 0] },
      textCursor: { url: "/cursors/hands/text.cur", hotspot: [0, 0] }
    },
    linux: {
      name: "linux",
      bg: "#3c2a25",
      bgAlt: "#2b1e1b",
      surface: "#61443c",
      surface2: "#693d51",
      border: "#78435f",
      text: "#f8fbff",
      muted: "#e8d7d5",
      accent: "#85496c",
      highlight: "#673954",
      image: "/cursors/linux/bg.webp",
      cursor: { url: "/cursors/linux/cursor.cur", hotspot: [5, 0] },
      linkCursor: { url: "/cursors/linux/link.cur", hotspot: [12, 8] },
      textCursor: { url: "/cursors/linux/text.cur", hotspot: [5, 0] }
    },
    portal: {
      name: "portal",
      bg: "#0b0d0f",
      bgAlt: "#08090b",
      surface: "#121518",
      surface2: "#314d58",
      border: "#3e626f",
      text: "#f8fbff",
      muted: "#acb4ba",
      accent: "#497485",
      highlight: "#395b67",
      image: "/cursors/portal/bg.webp",
      cursor: { url: "/cursors/portal/cursor.cur", hotspot: [3, 0] },
      linkCursor: { url: "/cursors/portal/link.cur", hotspot: [3, 0] },
      textCursor: { url: "/cursors/portal/text.cur", hotspot: [3, 0] }
    },
    wii: {
      name: "wii",
      bg: "#f7f7f5",
      bgAlt: "#d7d7d7",
      surface: "#ffffff",
      surface2: "#e6f8ff",
      border: "#1aa4d1",
      text: "#151515",
      muted: "#5f6467",
      accent: "#159ccd",
      highlight: "#0e80ac",
      image: "/cursors/wii/bg.webp",
      cursor: { url: "/cursors/wii/cursor.cur", hotspot: [8, 2] },
      linkCursor: { url: "/cursors/wii/link.cur", hotspot: [11, 10] },
      textCursor: { url: "/cursors/wii/text.cur", hotspot: [8, 2] }
    }
  };
  function getThemeId(id = localStorage.getItem(THEME_KEY) || "default") {
    return themes[id] ? id : "default";
  }
  function getThemeStylesheets() {
    return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter((link) => {
      const href = link.getAttribute("href") || "";
      return href.endsWith("/css/theme.css") || href.endsWith("css/theme.css");
    });
  }
  function clearThemeVariables(root) {
    ["--bg", "--bg-alt", "--surface", "--surface-2", "--border", "--text", "--text-muted", "--accent", "--highlight", "--radius", "--theme-bg-image", "--theme-bg-opacity", "--cursor-default", "--cursor-link", "--cursor-text"].forEach((name) => {
      root.style.removeProperty(name);
    });
  }
  function cursorValue(cursor) {
    if (!cursor?.url) return "";
    const [x = 0, y = 0] = cursor.hotspot || [];
    return `url("${cursor.url}") ${x} ${y}`;
  }
  function setThemeStylesheetEnabled(enabled) {
    getThemeStylesheets().forEach((link) => {
      link.disabled = !enabled;
    });
  }
  function syncGoMascot(themeId) {
    const existing = document.getElementById("goThemeMascot");
    if (themeId !== "go" || document.getElementById("game")) {
      existing?.remove();
      return;
    }
    if (existing || !document.body) return;
    const mascot = document.createElement("img");
    mascot.id = "goThemeMascot";
    mascot.src = "/png/other/go.webp";
    mascot.alt = "";
    mascot.setAttribute("aria-hidden", "true");
    mascot.draggable = false;
    document.body.appendChild(mascot);
  }
  function syncGoMascotHover(event) {
    const mascot = document.getElementById("goThemeMascot");
    if (!mascot) return;
    const rect = mascot.getBoundingClientRect();
    const isOver = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    mascot.classList.toggle("is-faded", isOver);
  }
  function applyTheme(id = localStorage.getItem(THEME_KEY) || "default") {
    const themeId = getThemeId(id);
    const root = document.documentElement;
    if (id !== themeId && localStorage.getItem(THEME_KEY) === id) localStorage.setItem(THEME_KEY, themeId);
    root.dataset.theme = themeId;
    if (themeId === "default") {
      clearThemeVariables(root);
      setThemeStylesheetEnabled(false);
      syncGoMascot(themeId);
      return;
    }
    const theme = themes[themeId];
    setThemeStylesheetEnabled(true);
    syncGoMascot(themeId);
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--bg-alt", theme.bgAlt);
    root.style.setProperty("--surface", theme.surface);
    root.style.setProperty("--surface-2", theme.surface2);
    root.style.setProperty("--border", theme.border);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--text-muted", theme.muted);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--highlight", theme.highlight);
    root.style.setProperty("--radius", "8px");
    root.style.setProperty("--theme-bg-image", theme.image ? `url("${theme.image}")` : "none");
    root.style.setProperty("--theme-bg-opacity", theme.image ? "1" : "0");
    root.style.setProperty("--cursor-default", cursorValue(theme.cursor) || 'url("/css/comic.cur") 0 0');
    root.style.setProperty("--cursor-link", cursorValue(theme.linkCursor) || 'url("/css/comiclink.cur") 0 0');
    root.style.setProperty("--cursor-text", cursorValue(theme.textCursor) || 'url("/css/comictext.cur") 0 0');
  }
  function saveTheme(id) {
    const themeId = getThemeId(id);
    localStorage.setItem(THEME_KEY, themeId);
    applyTheme(themeId);
    themeChannel?.postMessage({ type: "theme-changed", id: themeId });
  }
  function updateControls() {
    const select = document.getElementById("themeSelect");
    if (select) select.value = getThemeId();
  }
  function initSettingsControls() {
    const select = document.getElementById("themeSelect");
    if (!select) return;
    select.innerHTML = "";
    Object.entries(themes).forEach(([id, theme]) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = theme.name;
      select.appendChild(option);
    });
    select.addEventListener("change", () => {
      saveTheme(select.value);
      updateControls();
    });
    document.getElementById("themeReset")?.addEventListener("click", () => {
      saveTheme("default");
      updateControls();
    });
    updateControls();
  }
  window.TruffledTheme = {
    applyTheme,
    saveTheme,
    themes
  };
  themeChannel?.addEventListener("message", (event) => {
    if (event.data?.type === "theme-changed") {
      applyTheme(event.data.id);
      updateControls();
    }
  });
  document.addEventListener("pointermove", syncGoMascotHover);
  document.addEventListener("pointerleave", () => {
    document.getElementById("goThemeMascot")?.classList.remove("is-faded");
  });
  applyTheme();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSettingsControls, { once: true });
  } else {
    initSettingsControls();
  }
})();
