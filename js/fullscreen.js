(function () {
  const button = document.getElementById("fullscreen");
  if (!button) return;
  const is_mobile_page = !!document.getElementById("game") && !!document.getElementById("controls");
  let fallback_on = false;
  function get_fullscreen() {
    return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
  }
  function ask_fullscreen(element) {
    const request = element.requestFullscreen ||
      element.webkitRequestFullscreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullscreen;
    if (!request) {
      return Promise.reject(new Error("no"));
    }
    return Promise.resolve(request.call(element));
  }
  function leave_fullscreen() {
    const exit = document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;
    if (!exit) {
      return Promise.reject(new Error("no"));
    }
    return Promise.resolve(exit.call(document));
  }
  function get_target() {
    if (is_mobile_page) {
      return document.documentElement;
    }

    return document.getElementById("gameframe") ||
      document.getElementById("iframeid") ||
      document.documentElement;
  }
  function set_button(active) {
    button.classList.toggle("isactive", active);
    button.title = active ? "exit" : "full";

    const icon = button.querySelector("i");
    if (icon) {
      icon.className = active ? "fas fa-compress" : "fas fa-expand";
    } else {
      button.textContent = active ? "exit" : "full";
    }
  }

  function set_fake_fullscreen(active) {
    fallback_on = active;
    document.body.classList.toggle("fullscreenfallbackactive", active);
    set_button(active);
    if (active) {
      window.scrollTo(0, 1);
    }
  }

  function sync_fullscreen() {
    const active = !!get_fullscreen() || fallback_on;
    document.body.classList.toggle("fullscreenactive", active);
    set_button(active);
  }

  async function toggle_fullscreen(event) {
    event.preventDefault();

    if (fallback_on) {
      set_fake_fullscreen(false);
      return;
    }

    if (get_fullscreen()) {
      await leave_fullscreen().catch(() => {});
      sync_fullscreen();
      return;
    }

    try {
      await ask_fullscreen(get_target());
      sync_fullscreen();
    } catch (error) {
      if (is_mobile_page) {
        set_fake_fullscreen(true);
      } else {
        console.warn("fullscreen failed", error);
      }
    }
  }

  button.addEventListener("click", toggle_fullscreen);
  document.addEventListener("fullscreenchange", sync_fullscreen);
  document.addEventListener("webkitfullscreenchange", sync_fullscreen);
  document.addEventListener("mozfullscreenchange", sync_fullscreen);
  sync_fullscreen();
})();
