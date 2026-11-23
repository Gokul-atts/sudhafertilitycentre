"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Dna,
  Microscope,
  Snowflake,
  Syringe,
} from "lucide-react";
import { MdOutlinePregnantWoman } from "react-icons/md";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import oneImage from "@/assets/book-appointment/one.webp";
import twoImage from "@/assets/book-appointment/two.webp";
import threeImage from "@/assets/book-appointment/three.webp";
import fourImage from "@/assets/book-appointment/four.webp";
import fiveImage from "@/assets/book-appointment/five.webp";
import sixImage from "@/assets/book-appointment/six.webp";
import sevenImage from "@/assets/book-appointment/seven.webp";
import eightImage from "@/assets/book-appointment/eight.webp";


const treatments = [
  {
    id: "ivf",
    label: "IVF & ICSI Treatment",
    title: "IVF & ICSI Treatment",
    icon: Microscope,
    iconClass: "bg-blue-50 text-blue-700",
    image: oneImage,
    description: "When simpler treatments have not worked, IVF and ICSI can open the door to parenthood. In IVF, an egg and sperm are brought together in our lab. In ICSI, one healthy sperm is placed directly into the egg, which helps greatly when sperm count or movement is low. Our doctors choose what suits you best and guide you gently through each stage.",
    steps: [
      "Fertility Assessment & Counselling",
      "Personalised Treatment Planning",
      "Ovarian Stimulation & Monitoring",
      "Egg Collection & Fertilisation (by IVF or ICSI)",
      "Embryo Transfer & Follow-Up Care",
    ],
  },
  {
    id: "icsi",
    label: "IUI Treatment",
    title: "IUI Treatment",
    icon: Syringe,
    iconClass: "bg-teal-50 text-teal-700",
    image: twoImage,
    description: "IUI is a simple, gentle first step for many couples. Healthy, well-prepared sperm are placed inside the womb around the time of ovulation, so they have a shorter way to travel. It is a quick procedure with no surgery.",
    steps: ["Fertility Check-Up & Suitability Assessment", "Ovulation Tracking & Gentle Medicines (if needed)", "Sperm Preparation in Our Lab", "Quick and Comfortable IUI Procedure","Pregnancy Test & Follow-Up Guidance"],
  },
  {
    id: "iui",
    label: "Female Fertility Care",
    title: "Female Fertility Care",
    icon: TbGenderFemale,
    iconClass: "bg-rose-50 text-rose-700",
    image: threeImage,
    description: "Many women carry their worries silently. We find the cause with kindness and treat it with care, whether it is irregular periods, PCOS/PCOD or blocked tubes.",
    steps: ["Detailed History & Hormone Tests", "Scan-Based Check of Ovaries and Womb", "PCOS/PCOD & Irregular Period Care", "Laparoscopic Treatment, When Surgery Is Needed","Diet Plans & Counselling Support"],
  },
  {
    id: "female-care",
    label: "Male Fertility Care",
    title: "Male Fertility Care",
    icon: TbGenderMale,
    iconClass: "bg-indigo-50 text-indigo-700",
    image: fourImage,
    description: "Male factors are part of many couples' stories, and there is nothing to feel ashamed of. We offer private, respectful evaluation and treatment to improve sperm health and your chance of becoming a father.",
    steps: ["Semen Analysis & Hormone Tests", "Private, Judgement-Free Consultation", "Treatment for Low Count, Low Movement or Shape Problems", "Medicines, Lifestyle Guidance & Counselling","Sperm Retrieval Procedures Like TESE & PESA, When Needed"],
  },
  {
    id: "male-care",
    label: "Fertility Preservation",
    title: "Fertility Preservation",
    icon: Snowflake,
    iconClass: "bg-sky-50 text-sky-700",
    image: fiveImage,
    description: "Thinking about preserving your fertility for later? Protect your chances for tomorrow. Eggs or sperm can be safely frozen and stored until the time is right, whether for career plans, a health treatment or a personal choice.",
    steps: ["Preservation Counselling & Planning", "Egg Freezing", "Sperm Freezing", "Guidance on the Right Time to Freeze","Safe Storage & Use When You Are Ready"],
  },
  {
    id: "laparoscopy",
    label: "Laparoscopy & Hysteroscopy",
    title: "Laparoscopy & Hysteroscopy",
    icon: RiSurgicalMaskLine,
    iconClass: "bg-emerald-50 text-emerald-700",
    image: sixImage,
    description: "Sometimes a small physical block, fibroid, or polyp stands in the way of pregnancy. Using a thin camera and tiny keyhole instruments, our specialists gently examine and treat issues inside the womb or pelvis, helping you heal faster with minimal discomfort.",
    steps: ["Gentle Keyhole Evaluation of Womb & Tubes", "Removal of Fibroids, Polyps or Cysts", "Endometriosis & Blocked Tube Care", "Minimal Scarring & Quick Recovery","Personalised Post-Procedure Fertility Plan"],
  },
  {
    id: "genetic",
    label: "Genetic Testing (PGT)",
    title: "Genetic Testing (PGT)",
    icon: Dna,
    iconClass: "bg-violet-50 text-violet-700",
    image: sevenImage,
    description: "Every parent wishes for a healthy baby. Preimplantation Genetic Testing checks embryos for chromosomal or inherited conditions before transfer, helping our doctors choose the healthiest embryo and giving you greater peace of mind from the very start.",
    steps: ["Genetic Counselling & Family History Review", "Safe, Gentle Cell Sampling from the Embryo", "Screening for Chromosomal Balance", "Selection of Healthy Embryos for Transfer","Compassionate Guidance Throughout the Process"],
  },
  {
    id: "pregnancy",
    label: "Pregnancy & Antenatal Care",
    title: "Pregnancy & Antenatal Care",
    icon: MdOutlinePregnantWoman,
    iconClass: "bg-amber-50 text-amber-800",
    image: eightImage,
    description: "Our care does not stop the day you see a positive pregnancy test. From your very first heartbeat scan to safe delivery, our obstetricians walk beside you with regular check-ups, nutrition advice, and round-the-clock support.",
    steps: ["Early Pregnancy & Heartbeat Scans", "Regular Check-Ups & Growth Monitoring", "High-Risk & IVF Pregnancy Care", "Nutrition, Wellness & Emotional Support","Safe Delivery Planning & Newborn Care"],
  },

];

const panelId = "fertility-treatment-panel";
const ease = [0.22, 1, 0.36, 1];
const rowClass =
  "flex min-h-12 w-full min-w-0 items-center gap-2.5 rounded-lg border border-[#e8edf5] bg-white px-3 py-2 text-left text-sm font-medium leading-snug text-[#4a566d] hover:border-[#becff1] hover:text-[#1b347c] lg:px-4 lg:text-[.95rem]";
const tabClass =
  "group relative hover:z-10 hover:bg-[#fcfdff] hover:shadow-[0_6px_16px_#1b347c1a] focus-visible:z-10 " +
  "aria-selected:border-[#819ad5] aria-selected:bg-[#f9fbff] aria-selected:text-[#1b347c] aria-selected:shadow-[0_4px_12px_#1b347c15] " +
  "motion-safe:transition-[scale,background-color,border-color,color,box-shadow] motion-safe:duration-200 " +
  "motion-safe:hover:[scale:1.025] motion-safe:focus-visible:[scale:1.025] motion-reduce:!transform-none motion-reduce:!opacity-100";
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

function TreatmentIcon({ icon: Icon, iconClass }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-8 shrink-0 place-items-center rounded-lg motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-110 motion-safe:group-focus-visible:scale-110 ${iconClass}`}
    >
      <Icon size={19} strokeWidth={1.7} />
    </span>
  );
}

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
          Dedicated fertility expertise and compassionate care built around your dream of parenthood. 
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
          const { id, icon, iconClass, label } = item;
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
                  className={rowClass + " scroll-mt-4 aria-expanded:border-[#819ad5] aria-expanded:bg-[#f9fbff] aria-expanded:text-[#1b347c] motion-safe:transition-colors"}
                >
                  <TreatmentIcon icon={icon} iconClass={iconClass} />
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
          {treatments.map(({ id, label, icon, iconClass }, index) => (
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
              className={`${rowClass} ${tabClass}`}
            >
              <TreatmentIcon icon={icon} iconClass={iconClass} />
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
