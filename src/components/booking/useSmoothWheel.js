"use client";

import { useEffect } from "react";

export default function useSmoothWheel() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine) and (hover: hover)");
    const root = document.scrollingElement;
    if (!root) return;

    let listeners;
    let frame = null;
    let position = 0;
    let target = 0;
    let lastTime = 0;

    function stop() {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
    }

    function step(time) {
      const elapsed = Math.max(0, Math.min(time - lastTime, 48));
      lastTime = time;
      position += (target - position) * (1 - Math.exp(-elapsed / 78));
      const arrived = Math.abs(target - position) < 1;

      window.scrollTo({ top: arrived ? target : position, behavior: "instant" });
      frame = arrived ? null : window.requestAnimationFrame(step);
    }

    function onWheel(event) {
      const mode = event.deltaMode;
      if (!event.cancelable || event.defaultPrevented || event.ctrlKey || event.metaKey ||
          event.shiftKey || !event.deltaY || Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
          event.target?.closest?.("textarea, select, input[type='number'], [data-native-scroll]")) {
        stop();
        return;
      }

      const unit = mode === WheelEvent.DOM_DELTA_LINE ? 16
        : mode === WheelEvent.DOM_DELTA_PAGE ? root.clientHeight
        : 1;
      const delta = event.deltaY * unit;
      const scrollTop = root.scrollTop;
      const max = root.scrollHeight - root.clientHeight;
      const continuing = frame !== null && Math.sign(target - position) === Math.sign(delta);
      const from = continuing ? target : scrollTop;
      const next = Math.max(0, Math.min(from + delta, max));

      if (next === scrollTop) {
        stop();
        return;
      }

      event.preventDefault();
      target = next;
      if (frame === null) {
        position = scrollTop;
        lastTime = performance.now();
        frame = window.requestAnimationFrame(step);
      }
    }

    function updatePreference() {
      listeners?.abort();
      stop();
      if (!preference.matches) return;

      listeners = new AbortController();
      const { signal } = listeners;
      window.addEventListener("wheel", onWheel, { passive: false, signal });
      for (const event of ["pointerdown", "touchstart", "keydown", "hashchange", "resize"]) {
        window.addEventListener(event, stop, { passive: true, signal });
      }
    }

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => {
      preference.removeEventListener("change", updatePreference);
      listeners?.abort();
      stop();
    };
  }, []);
}
