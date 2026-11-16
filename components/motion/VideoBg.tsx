"use client";

import { useEffect, useRef } from "react";

// A muted, looping background film. It only downloads and plays while on
// screen, and stays on its poster frame for visitors who prefer reduced motion.
// A media fragment on the src ("clip.mp4#t=0,7.2") plays and loops only that span.
export default function VideoBg({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const span = /#t=([\d.]*),([\d.]+)$/.exec(src);
    if (!video || !span) return;
    const start = Number(span[1]) || 0;
    const end = Number(span[2]);
    const check = () => {
      if (video.currentTime >= end - 0.05) {
        video.currentTime = start;
        video.play().catch(() => {});
      }
    };
    // timeupdate is coarse (~4 per second), so the frame callback keeps the cut tight where supported.
    let frame = 0;
    const onFrame = () => {
      check();
      frame = video.requestVideoFrameCallback(onFrame);
    };
    if ("requestVideoFrameCallback" in video) frame = video.requestVideoFrameCallback(onFrame);
    video.addEventListener("timeupdate", check);
    video.addEventListener("pause", check);
    return () => {
      if (frame) video.cancelVideoFrameCallback(frame);
      video.removeEventListener("timeupdate", check);
      video.removeEventListener("pause", check);
    };
  }, [src]);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
