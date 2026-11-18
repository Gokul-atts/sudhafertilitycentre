"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { reviews } from "@/utils/homepageData";

const reviewerNames = new Set(["Padma Naban", "Krish Kumar", "liji arumughan"]);
const patientReviews = reviews.filter(({ name }) => reviewerNames.has(name));
const ease = [0.22, 1, 0.36, 1];
const arrowClass =
  "grid size-11 place-items-center rounded-full border border-[#e3ebfa] bg-white text-[#1b347c] hover:bg-[#eaf1ff] motion-safe:transition-colors";

const reviewAccents = [
  { id: "top-ring", className: "left-[7%] top-6 size-4 rounded-full border border-[#7698de]", drift: 9 },
  { id: "top-dot", className: "left-[17%] top-5 size-1.5 rounded-full bg-[#8da8eb]", drift: -7 },
  { id: "top-diamond", className: "right-[10%] top-8 size-2.5 rounded-[3px] bg-[#a7b8ed]", drift: 8 },
  { id: "bottom-ring", className: "bottom-6 right-[16%] size-3.5 rounded-full border border-[#879fe6]", drift: -10 },
  { id: "bottom-dot", className: "bottom-5 left-[19%] size-2 rounded-full bg-[#9db4ee]", drift: 8 },
];

const accentMotion = {
  rest: { x: 0, y: 0, scale: 1 },
  float: (drift) => ({
    x: [0, drift, -drift * 0.45, 0],
    y: [0, -8, 5, 0],
    scale: [1, 1.2, 0.95, 1],
    transition: { duration: 4.4, ease: "easeInOut" },
  }),
};

function ReviewBackdrop({ reduceMotion }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      initial="rest"
      whileInView={reduceMotion ? undefined : "float"}
      viewport={{ amount: 0.25 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_3%_32%,#dbe7ff,transparent_58%),radial-gradient(ellipse_at_94%_92%,#dfe5ff,transparent_54%)]" />
      {reviewAccents.map(({ id, className, drift }) => (
        <motion.span
          key={id}
          variants={accentMotion}
          custom={drift}
          className={"absolute opacity-75 motion-reduce:!transform-none " + className}
        />
      ))}
      <motion.div
        variants={accentMotion}
        custom={-12}
        className="absolute right-[10%] top-[21%] hidden text-[#9bb1e3] opacity-65 motion-reduce:!transform-none sm:block"
      >
        <Quote size={33} strokeWidth={1.1} />
      </motion.div>
    </motion.div>
  );
}

function formatCount(number) {
  return String(number).padStart(2, "0");
}

export default function PatientReviews() {
  const [slide, setSlide] = useState({ index: 0, direction: 1 });
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.42, ease };
  const total = patientReviews.length;

  const reviewVariants = {
    active: { opacity: 1, x: 0, visibility: "visible", transition },
    inactive: {
      opacity: 0,
      x: reduceMotion ? 0 : slide.direction * -14,
      transition: { duration: reduceMotion ? 0 : 0.17 },
      transitionEnd: { visibility: "hidden" },
    },
  };

  function move(direction) {
    setSlide(({ index }) => ({ index: (index + direction + total) % total, direction }));
  }

  return (
    <section aria-labelledby="patient-reviews-title" className="relative isolate bg-[linear-gradient(145deg,#eaf2ff,#f3f6ff_58%,#eaf0ff)] px-4 py-9 sm:px-6 md:py-12 lg:py-14">
      <ReviewBackdrop reduceMotion={reduceMotion} />
      <motion.div
        className="mx-auto mb-6 text-center motion-reduce:!transform-none motion-reduce:!opacity-100 md:mb-8"
        initial={reduceMotion ? false : { opacity: 0.65, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={transition}
      >
        <h2 id="patient-reviews-title" className="text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight tracking-tight text-[#181d29]">
          What <span className="text-[#1b347c]">Our Patients Say</span>
        </h2>
        <p className="mx-auto mt-2 text-sm leading-snug text-[#546078] md:text-base">Real reviews from real families</p>
        <a
          href="https://maps.app.goo.gl/FzY9JxNQMHxAPzzv9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Coimbatore clinic rating, 4.7 out of 5. View on Google Maps"
          className="mt-3 inline-flex min-h-11 flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-[#dce7fa] bg-white px-3.5 py-2 text-xs text-[#405477] shadow-sm hover:border-[#a9bfe9] sm:text-sm"
        >
          <FcGoogle size={18} aria-hidden="true" />
          <span aria-hidden="true" className="flex items-center gap-0.5 text-[#a96505]">
            {Array.from({ length: 4 }, (_, index) => (
              <Star key={index} size={15} strokeWidth={1.6} className="fill-[#f3b63a]" />
            ))}
            <span className="relative">
              <Star size={15} strokeWidth={1.6} />
              <span className="absolute inset-y-0 left-0 w-[70%] overflow-hidden">
                <Star size={15} strokeWidth={1.6} className="max-w-none fill-[#f3b63a]" />
              </span>
            </span>
          </span>
          <span className="font-semibold text-[#1b347c]">4.7/5</span>
          <span>Google rating · Coimbatore</span>
        </a>
      </motion.div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Patient reviews"
        className="mx-auto grid max-w-[1050px] min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-4 lg:gap-x-5 lg:gap-y-5"
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }}
      >
        <div className="col-span-3 col-start-1 row-start-1 grid min-w-0 overflow-hidden rounded-[22px] border border-[#e9edf5] bg-white px-5 py-6 text-center shadow-[0_8px_30px_#18386a12] sm:px-8 md:min-h-[254px] md:px-10 md:py-7 lg:col-span-1 lg:col-start-2">
          {patientReviews.map(({ name, quote }, index) => {
            const active = index === slide.index;
            const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

            return (
              <motion.figure
                key={name}
                className="col-start-1 row-start-1 flex min-w-0 flex-col items-center justify-center motion-reduce:!transform-none"
                aria-hidden={!active}
                variants={reviewVariants}
                initial={false}
                animate={active ? "active" : "inactive"}
              >
                <figcaption className="flex flex-col items-center gap-2">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-[#e9f0ff] text-sm font-semibold tracking-wide text-[#1b347c]">
                    {initials}
                  </span>
                  <span className="text-base font-semibold capitalize leading-tight text-[#172956]">{name}</span>
                </figcaption>
                <Quote aria-hidden="true" size={19} className="my-3 text-[#a77a28]" />
                <blockquote className="max-w-[76ch]">
                  <p className="font-[family-name:var(--font-inter)] text-[clamp(.89rem,1.18vw,1rem)] leading-[1.75] text-[#546078]">
                    “{quote}”
                  </p>
                </blockquote>
              </motion.figure>
            );
          })}
        </div>

        <motion.button
          type="button"
          aria-label="Previous review"
          className={arrowClass + " col-start-1 row-start-2 lg:row-start-1"}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          onClick={() => move(-1)}
        >
          <ArrowLeft aria-hidden="true" size={19} />
        </motion.button>

        <div className="col-start-2 row-start-2 flex items-center justify-center gap-3 text-sm font-semibold tabular-nums text-[#1b347c]">
          <span role="status" className="sr-only">
            {patientReviews[slide.index]?.name}, review {slide.index + 1} of {total}
          </span>
          <span aria-hidden="true">{formatCount(slide.index + 1)}</span>
          <span aria-hidden="true" className="h-0.5 w-14 overflow-hidden rounded-full bg-[#dbe4f3] sm:w-24">
            <motion.span
              className="block h-full origin-left rounded-full bg-[#1b347c]"
              initial={false}
              animate={{ scaleX: (slide.index + 1) / total }}
              transition={transition}
            />
          </span>
          <span aria-hidden="true">{formatCount(total)}</span>
        </div>

        <motion.button
          type="button"
          aria-label="Next review"
          className={arrowClass + " col-start-3 row-start-2 lg:row-start-1"}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          onClick={() => move(1)}
        >
          <ArrowRight aria-hidden="true" size={19} />
        </motion.button>
      </div>
    </section>
  );
}
