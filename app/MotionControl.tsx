"use client";

import { useEffect, useState } from "react";

export function MotionControl() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "playing";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [paused]);

  return (
    <button
      className="motion-control"
      type="button"
      aria-pressed={paused}
      onClick={() => setPaused((current) => !current)}
    >
      <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
      {paused ? "PLAY MOTION" : "PAUSE MOTION"}
    </button>
  );
}
