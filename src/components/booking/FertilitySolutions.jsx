"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Dna,
  HeartPulse,
  MessageCircleHeart,
  Microscope,
  Snowflake,
  Syringe,
  TestTubeDiagonal,
} from "lucide-react";
import ivfImage from "@/assets/Treatments/IVF/about.webp";
import icsiImage from "@/assets/Treatments/ICSI/About.webp";
import iuiImage from "@/assets/Treatments/IUI/About.webp";
import femaleCareImage from "@/assets/Treatments/Female/Banner.webp";
import maleCareImage from "@/assets/Treatments/Male/Banner.webp";
import geneticTestingImage from "@/assets/Treatments/Blastocyst/About.webp";
import labImage from "@/assets/Treatments/IVF/microscope.webp";
import counsellingImage from "@/assets/Home/tab1.webp";

const treatments = [
  {
    id: "ivf",
    label: "IVF",
    title: "IVF (In Vitro Fertilisation)",
    icon: Microscope,
    image: ivfImage,
    description: "Personalised IVF care to support your parenthood journey. From fertility assessment to embryo transfer, our team will explain each step and help you understand your options.",
    steps: [
      "Fertility Assessment & Counselling",
      "Personalised Treatment Planning",
      "Ovarian Stimulation & Monitoring",
      "Egg Collection & Fertilisation",
      "Embryo Transfer & Follow-Up Care",
    ],
  },
  {
    id: "icsi",
    label: "ICSI Treatment",
    title: "ICSI (Intracytoplasmic Sperm Injection)",
    icon: Syringe,
    image: icsiImage,
    description: "ICSI is a fertilisation technique used as part of IVF. Your fertility specialist can explain how it works and discuss whether it fits your treatment plan.",
    steps: ["Fertility Assessment", "Semen Analysis Review", "IVF & ICSI Planning", "Follow-Up Care"],
  },
  {
    id: "iui",
    label: "IUI Treatment",
    title: "IUI (Intrauterine Insemination)",
    icon: TestTubeDiagonal,
    image: iuiImage,
    description: "IUI is a fertility treatment timed around ovulation. Our team can guide you through the assessment, scheduling, and follow-up.",
    steps: ["Initial Consultation", "Cycle Monitoring", "Insemination Planning", "Follow-Up Care"],
  },
  {
    id: "female-care",
    label: "Female Fertility Care",
    title: "Female Fertility Care",
    icon: HeartPulse,
    image: femaleCareImage,
    description: "Discuss your medical history and fertility concerns with a specialist. Together, you can review any recommended tests and decide on your next steps.",
    steps: ["Medical & Cycle History", "Fertility Assessment", "Review of Test Results", "Personalised Care Plan"],
  },
  {
    id: "male-care",
    label: "Male Fertility Care",
    title: "Male Fertility Care",
    icon: HeartPulse,
    image: maleCareImage,
    description: "Our specialists can help you understand male fertility concerns, review your results, and discuss treatment options with you.",
    steps: ["Specialist Consultation", "Semen Analysis Review", "Discussion of Treatment Options", "Follow-Up Planning"],
  },
  {
    id: "pgt",
    label: "Genetic Testing (PGT)",
    title: "Preimplantation Genetic Testing (PGT)",
    icon: Dna,
    image: geneticTestingImage,
    description: "PGT is an option some patients discuss during IVF. Our team can explain what testing may look for, its limitations, and whether to consider it.",
    steps: ["Genetic Counselling", "Review of Testing Options", "IVF Care Coordination", "Results Discussion"],
  },
  {
    id: "cryopreservation",
    label: "Cryopreservation",
    title: "Cryopreservation",
    icon: Snowflake,
    image: labImage,
    description: "Talk with a fertility specialist about preserving eggs, sperm, or embryos for possible future use and what storage involves.",
    steps: ["Fertility Preservation Consultation", "Review of Freezing Options", "Storage Planning", "Ongoing Guidance"],
  },
  {
    id: "counselling",
    label: "Fertility Counselling",
    title: "Fertility Counselling",
    icon: MessageCircleHeart,
    image: counsellingImage,
    description: "Speak with the fertility care team, ask questions, and get support as you consider the next steps in your parenthood journey.",
    steps: ["One-to-One Discussion", "Guidance on Tests & Treatments", "Support With Decisions", "Planning Your Next Steps"],
  },
];

const panelId = "fertility-treatment-panel";
const ease = [0.22, 1, 0.36, 1];
const rowClass =
  "flex min-h-12 w-full min-w-0 items-center gap-2.5 rounded-lg border border-[#e8edf5] bg-white px-3 py-2 text-left text-sm font-medium leading-snug text-[#4a566d] hover:border-[#becff1] hover:text-[#1b347c] motion-safe:transition-colors lg:px-4 lg:text-[.95rem]";
const detailsMotion = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease, staggerChildren: 0.055 } },
};
const detailItemMotion = {
  hidden: { opacity: 0, y: 7 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
};
const listMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};
const rowMotion = {
  hidden: { opacity: 0.7, y: 9 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease } },
};

function TreatmentChevron({ expanded, reduceMotion }) {
  return (
    <motion.span
      aria-hidden="true"
      className="ml-auto grid size-7 shrink-0 place-items-center rounded-full bg-[#eef3fc] text-[#1b347c]"
      initial={false}
      animate={{ rotate: expanded ? 180 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
    >
      <ChevronDown size={16} strokeWidth={2} />
    </motion.span>
  );
}

function TreatmentDetails({ treatment, reduceMotion }) {
  return (
    <motion.div
      variants={reduceMotion ? undefined : detailsMotion}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
    >
      <h3 className="text-[clamp(1.15rem,2.1vw,1.65rem)] font-semibold leading-tight tracking-tight text-[#18223a]">
        {treatment.title}
      </h3>
      <p className="mt-2 max-w-[68ch] font-[family-name:var(--font-inter)] text-[.9rem] leading-relaxed text-[#546078] lg:text-[.97rem]">
        {treatment.description}
      </p>

      <div className="mt-4 grid min-w-0 items-start gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:grid-cols-1 lg:mt-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-5">
        <motion.div
          variants={reduceMotion ? undefined : detailItemMotion}
          className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e1edf8] sm:aspect-square md:aspect-[16/8] lg:aspect-square"
        >
          <Image
            src={treatment.image}
            alt=""
            fill
            sizes="(max-width: 639px) 90vw, (max-width: 767px) 38vw, (max-width: 1023px) 61vw, 28vw"
            className="object-cover"
          />
        </motion.div>

        <div>
          <ul className="space-y-2.5">
            {treatment.steps.map((step) => (
              <motion.li
                key={step}
                variants={reduceMotion ? undefined : detailItemMotion}
                className="flex items-start gap-2.5 text-sm font-medium leading-snug text-[#283754] lg:text-[.95rem]"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#eaf0fc] text-[#1b347c]">
                  <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                </span>
                {step}
              </motion.li>
            ))}
          </ul>
          <motion.a
            variants={reduceMotion ? undefined : detailItemMotion}
            href="#contact-now"
            className="group mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1b347c] px-4 py-2 text-sm font-medium text-white shadow-[0_6px_14px_#1b347c26] hover:bg-[#12275f] motion-safe:transition-colors"
          >
            Book Appointment
            <ArrowRight size={16} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function FertilitySolutions() {
  const [selected, setSelected] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(true);
  const tabRefs = useRef([]);
  const reduceMotion = useReducedMotion();
  const treatment = treatments[selected];

  function selectTreatment(index) {
    setSelected(index);
    setMobileOpen(true);
  }

  function handleTabKey(event, index) {
    let target;
    switch (event.key) {
      case "ArrowUp":
        target = (index - 1 + treatments.length) % treatments.length;
        break;
      case "ArrowDown":
        target = (index + 1) % treatments.length;
        break;
      case "Home":
        target = 0;
        break;
      case "End":
        target = treatments.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectTreatment(target);
    tabRefs.current[target]?.focus();
  }

  return (
    <section
      aria-labelledby="fertility-solutions-title"
      className="mt-8 rounded-2xl bg-[#f1f6ff] px-3 py-8 sm:px-6 md:mt-14 md:rounded-3xl md:py-12 lg:px-10"
    >
      <motion.div
        className="mx-auto mb-6 max-w-3xl text-center motion-reduce:!transform-none motion-reduce:!opacity-100 md:mb-9"
        initial={reduceMotion ? false : { opacity: 0.65, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
      >
        <h2 id="fertility-solutions-title" className="text-balance text-[clamp(1.55rem,3.1vw,2.35rem)] font-semibold leading-tight tracking-tight text-[#181d29]">
          Comprehensive <span className="text-[#1b347c]">Fertility Solutions</span>
        </h2>
        <p className="mx-auto mt-2 max-w-[44ch] text-balance text-[clamp(.97rem,1.6vw,1.25rem)] font-medium leading-snug text-[#29344c]">
          Tailored Treatment Plans Designed Around Your Comfort and Goals.
        </p>
      </motion.div>

      <motion.div
        className="grid min-w-0 gap-2.5 md:!hidden"
        variants={listMotion}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {treatments.map((item, index) => {
          const { id, icon: Icon, label } = item;
          const expanded = mobileOpen && selected === index;
          const triggerId = `fertility-accordion-${id}`;
          const contentId = `fertility-accordion-panel-${id}`;

          return (
            <motion.div key={id} variants={reduceMotion ? undefined : rowMotion} className="min-w-0 rounded-xl bg-white shadow-[0_3px_12px_#1b347c0a] motion-reduce:!transform-none motion-reduce:!opacity-100">
              <h3 className="m-0 leading-none">
                <button
                  type="button"
                  id={triggerId}
                  aria-controls={contentId}
                  aria-expanded={expanded}
                  onClick={() => {
                    if (expanded) setMobileOpen(false);
                    else selectTreatment(index);
                  }}
                  className={rowClass + " scroll-mt-4 aria-expanded:border-[#819ad5] aria-expanded:bg-[#f9fbff] aria-expanded:text-[#1b347c]"}
                >
                  <Icon size={19} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                  <TreatmentChevron expanded={expanded} reduceMotion={reduceMotion} />
                </button>
              </h3>
              <div id={contentId} role="region" aria-labelledby={triggerId} inert={!expanded}>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      className="overflow-hidden"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.32, ease }}
                    >
                      <div className="p-4">
                        <TreatmentDetails treatment={item} reduceMotion={reduceMotion} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mx-auto hidden max-w-[1320px] min-w-0 gap-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-stretch lg:gap-5">
        <motion.div
          role="tablist"
          aria-label="Fertility treatments"
          aria-orientation="vertical"
          className="grid min-w-0 grid-rows-8 gap-2.5"
          variants={listMotion}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {treatments.map(({ id, label, icon: Icon }, index) => (
            <motion.button
              key={id}
              ref={(element) => { tabRefs.current[index] = element; }}
              type="button"
              role="tab"
              id={`fertility-tab-${id}`}
              aria-controls={panelId}
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => selectTreatment(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
              variants={reduceMotion ? undefined : rowMotion}
              className={rowClass + " aria-selected:border-[#819ad5] aria-selected:text-[#1b347c] aria-selected:shadow-[0_4px_12px_#1b347c15] motion-reduce:!transform-none motion-reduce:!opacity-100"}
            >
              <Icon size={19} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
              <span>{label}</span>
              <TreatmentChevron expanded={selected === index} reduceMotion={reduceMotion} />
            </motion.button>
          ))}
        </motion.div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`fertility-tab-${treatment.id}`}
          tabIndex={0}
          className="min-w-0 rounded-xl border border-[#e8edf5] bg-white p-5 shadow-[0_5px_20px_#1b347c0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2682de] lg:p-7"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={treatment.id}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5, transition: { duration: 0.12 } }}
            >
              <TreatmentDetails treatment={treatment} reduceMotion={reduceMotion} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
