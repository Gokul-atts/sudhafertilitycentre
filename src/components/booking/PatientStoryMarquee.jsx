"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Pause, Play, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function PatientStoryMarquee({ videoIds }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollerRef = useRef(null);
  const activeVideoId = videoIds[activeIndex];

  function toggleAutoScroll() {
    if (!autoScroll) scrollerRef.current.scrollLeft = 0;
    setAutoScroll(!autoScroll);
  }

  return (
    <>
      <div
        ref={scrollerRef}
        className={`group mt-4 w-full [--animation-duration:20s] motion-reduce:overflow-x-auto sm:mt-6 ${
          autoScroll ? "overflow-x-hidden has-[:focus-visible]:overflow-x-auto" : "overflow-x-auto"
        }`}
      >
        <ul
          aria-labelledby="patient-stories-title"
          className={`flex w-max gap-4 py-4 motion-reduce:animate-none ${
            autoScroll ? "animate-scroll hover:[animation-play-state:paused] group-has-[:focus-visible]:animate-none" : ""
          } ${activeVideoId ? "[animation-play-state:paused]" : ""}`}
        >
          {[...videoIds, ...videoIds].map((videoId, index) => {
            const isCopy = index >= videoIds.length;
            const storyIndex = index % videoIds.length;

            return (
              <li
                key={index}
                aria-hidden={isCopy || undefined}
                className={`w-[clamp(12rem,22vw,22rem)] shrink-0 ${
                  isCopy ? "motion-reduce:hidden group-has-[:focus-visible]:hidden" : ""
                } ${isCopy && !autoScroll ? "hidden" : ""}`}
              >
                <button
                  type="button"
                  tabIndex={isCopy ? -1 : undefined}
                  aria-label={`Play patient story ${storyIndex + 1}`}
                  aria-haspopup="dialog"
                  className="relative grid aspect-video w-full cursor-pointer place-items-center overflow-hidden rounded-2xl bg-[#181d29] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
                  onClick={() => setActiveIndex(storyIndex)}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 872px) 192px, (max-width: 1600px) 22vw, 352px"
                    className="object-cover"
                  />
                  <span className="relative grid h-11 w-14 place-items-center rounded-xl bg-[#b9141b] text-white">
                    <Play size={20} fill="currentColor" aria-hidden="true" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* <div className="flex justify-end px-4 motion-reduce:hidden sm:px-6">
        <button
          type="button"
          onClick={toggleAutoScroll}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-[#1b347c]"
        >
          {autoScroll ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          {autoScroll ? "Pause scrolling" : "Resume scrolling"}
        </button>
      </div> */}

      {activeVideoId && (
        <Dialog open onClose={() => setActiveIndex(null)} className="relative z-[100]">
          <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
          <div className="fixed inset-0 grid place-items-center overflow-y-auto p-4">
            <DialogPanel className="w-full max-w-3xl rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between gap-4 pb-2">
                <DialogTitle className="font-semibold text-[#181d29]">Patient story {activeIndex + 1}</DialogTitle>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close video"
                  className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-[#1b347c] hover:bg-[#e0eafb]"
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </div>
              <iframe
                className="aspect-video w-full rounded-xl bg-[#181d29]"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title={`Sudha Fertility Centre patient story ${activeIndex + 1}`}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
              <a
                href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-[#1b347c] underline"
              >
                Watch on YouTube
              </a>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
}
