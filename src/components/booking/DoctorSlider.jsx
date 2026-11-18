"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import pradeepa from "@/assets/branch/ambatur/pradeepa.webp";
import dhanabagyam from "@/assets/Home/Founder.webp";

const doctors = [
  {
    name: "Dr. S. Pradeepa Sudhakar",
    role: "Senior Consultant, IVF & ART Specialist",
    headline: "Four Decades of Compassionate Care in Parenthood",
    image: pradeepa,
    imagePosition: "object-[50%_43%]",
    bio: "Dr. Pradeepa specialises in fertility care and assisted reproductive techniques. She combines clinical care with counselling to help patients understand their options at every stage of treatment. As Vice President of Sudha Hospitals, she has helped extend that care to more families.",
  },
  {
    name: "Dr. S. Dhanabagyam",
    role: "Senior Consultant, IVF & ART Specialist",
    headline: "Bringing Fertility Care Closer to Families",
    image: dhanabagyam,
    imagePosition: "object-[56%_center]",
    bio: "Dr. Dhanabagyam helped establish the first Sudha Fertility Centre in Erode in 1995 to make fertility and women’s health care more accessible. She helped grow the centre’s network across South India and Sri Lanka and guides patients through assessment and treatment decisions.",
  },
];

const ease = [0.22, 1, 0.36, 1];
const arrowClass =
  "grid size-11 shrink-0 place-items-center rounded-full border border-[#e3ebfa] bg-[#f5f8ff] text-[#1b347c] hover:bg-[#e5eeff] motion-safe:transition-colors";

export default function DoctorSlider() {
  const [slide, setSlide] = useState({ index: 0, direction: 1 });
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.43, ease };

  const slideVariants = {
    active: { visibility: "visible", transition: { duration: 0, staggerChildren: reduceMotion ? 0 : 0.07 } },
    inactive: { visibility: "hidden", transition: { duration: 0, when: "afterChildren" } },
  };
  const itemVariants = {
    active: { opacity: 1, x: 0, transition },
    inactive: {
      opacity: 0,
      x: reduceMotion ? 0 : slide.direction * 16,
      transition: { duration: reduceMotion ? 0 : 0.18 },
    },
  };

  function move(direction) {
    setSlide(({ index }) => ({
      index: (index + direction + doctors.length) % doctors.length,
      direction,
    }));
  }

  return (
    <section
      aria-labelledby="doctor-slider-title"
      className="mt-8 bg-[radial-gradient(ellipse_at_50%_10%,#e5eeff,#f5f8ff_65%,#fff)] px-4 py-8 sm:mt-12 sm:px-6 md:py-11 lg:mt-14"
    >
      <div className="mx-auto max-w-[1040px]">
        <motion.div
          className="mb-5 text-center motion-reduce:!opacity-100 motion-reduce:!transform-none md:mb-7"
          initial={reduceMotion ? false : { opacity: 0.65, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={transition}
        >
          <p className="mb-2 text-xs font-semibold uppercase leading-none tracking-[.18em] text-[#476294]">Our Doctors</p>
          <h2 id="doctor-slider-title" className="text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight tracking-tight text-[#181d29]">
            Happy <span className="text-[#1b347c]">Parenthood Stories.</span>
          </h2>
        </motion.div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Our doctors"
          className="rounded-[22px] border border-[#e5edfa] bg-white p-3 shadow-[0_14px_45px_#18386a12] sm:p-4 md:rounded-[26px] md:p-5"
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }}
        >
          <div className="grid min-w-0 overflow-x-clip">
            {doctors.map((doctor, index) => {
              const active = index === slide.index;

              return (
                <motion.article
                  key={doctor.name}
                  className="col-start-1 row-start-1 grid min-w-0 gap-4 md:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] md:gap-6 lg:gap-8"
                  aria-label={doctor.name}
                  aria-roledescription="slide"
                  aria-hidden={!active}
                  variants={slideVariants}
                  initial={false}
                  animate={active ? "active" : "inactive"}
                >
                  <motion.div
                    variants={itemVariants}
                    className="relative mx-auto aspect-[5/4] w-full max-w-[300px] self-center overflow-hidden rounded-[15px] bg-[#e2e9f4] motion-reduce:!transform-none sm:max-w-[350px] md:max-w-none"
                  >
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 360px) calc(100vw - 58px), (max-width: 639px) 300px, (max-width: 767px) 350px, (max-width: 1090px) 38vw, 407px"
                      className={"object-cover " + doctor.imagePosition}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="min-w-0 self-center px-1 pb-1 motion-reduce:!transform-none md:px-0 md:pb-0 md:pr-4 lg:pr-8">
                    <h3 className="text-balance text-[clamp(1.35rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-tight text-[#162752]">
                      {doctor.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium leading-snug text-[#476294]">{doctor.role}</p>
                    <div className="mt-4 border-t border-[#e9eef7] pt-4 md:mt-5 md:pt-5">
                      <p className="max-w-[30ch] text-balance text-[clamp(1.06rem,1.7vw,1.35rem)] font-semibold leading-snug text-[#1d2b45]">
                        {doctor.headline}
                      </p>
                      <p className="mt-2 max-w-[53ch] text-pretty font-[family-name:var(--font-inter)] text-[clamp(.91rem,1.18vw,.99rem)] leading-[1.75] text-[#546078]">
                        {doctor.bio}
                      </p>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 border-t border-[#edf1f8] pt-3 md:justify-end">
            <motion.button
              type="button"
              aria-label="Previous doctor"
              className={arrowClass}
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              onClick={() => move(-1)}
            >
              <ChevronLeft aria-hidden="true" size={19} />
            </motion.button>
            <p aria-live="polite" className="whitespace-nowrap text-sm font-semibold leading-none tabular-nums text-[#1b347c]">
              <span className="sr-only">{doctors[slide.index].name}, slide </span>
              {slide.index + 1} / {doctors.length}
            </p>
            <span className="h-1 w-12 overflow-hidden rounded-full bg-[#dce5f5]" aria-hidden="true">
              <motion.span
                className="block h-full origin-left rounded-full bg-[#1b347c]"
                initial={false}
                animate={{ scaleX: (slide.index + 1) / doctors.length }}
                transition={transition}
              />
            </span>
            <motion.button
              type="button"
              aria-label="Next doctor"
              className={arrowClass}
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              onClick={() => move(1)}
            >
              <ChevronRight aria-hidden="true" size={19} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
