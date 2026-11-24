"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ambulance, ArrowRight, Award, CalendarDays, HandHeart, Hospital, MessagesSquare, Phone, ReceiptIndianRupee, Stethoscope } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import familyPhoto from "@/assets/book-appointment/hero-family-desktop.webp";
import carePhoto from "@/assets/book-appointment/hero-consultation-desktop.webp";
import motherAndBabyPhoto from "@/assets/book-appointment/hero-mother-and-baby.webp";
import sudhaBuilding from "@/assets/book-appointment/hospitals.webp";



import emergingIvfAward from "@/assets/About/award1.webp";
import tamilNaduIvfAward from "@/assets/About/award2.webp";
import logo from "@/assets/logo-dark.svg";
import FertilitySolutions from "@/components/booking/FertilitySolutions";
import DoctorSlider from "@/components/booking/DoctorSlider";
import PatientReviews from "@/components/booking/PatientReviews";
import PatientStoryMarquee from "@/components/booking/PatientStoryMarquee";
import BookingFaq from "@/components/booking/BookingFaq";
import useSmoothWheel from "@/components/booking/useSmoothWheel";

const whatsAppUrl = "https://wa.me/917670076006";
const bookingPhoneHref = "tel:+917670076006";
const actionClass = "inline-flex items-center justify-center gap-2 rounded-full bg-[#1b347c] font-medium leading-tight text-white hover:bg-[#12275f]";
const fieldClass = "w-full min-w-0 min-h-[46px] rounded-lg border border-[#cbd1dd] bg-white px-2.5 py-2 text-base text-[#181d29] placeholder:text-[#626979] invalid:[&:is(select)]:text-[#626979] aria-[invalid=true]:border-[#b42318] min-[701px]:min-h-[43px] min-[701px]:text-[.93rem]";
const errorClass = "m-0 text-[.83rem] leading-[1.35] text-[#b42318] max-sm:text-sm";
const formLabelClass = "grid min-w-0 gap-1 text-[clamp(.78rem,1vw,.96rem)] font-medium max-sm:text-base";
const formHintClass = "text-[clamp(.75rem,.98vw,.92rem)] leading-[1.45] text-[#515b70] max-sm:text-sm";
const slideControlClass = "grid size-11 cursor-pointer place-items-center rounded-full text-[#1b347c] hover:bg-[#e0eafb] motion-safe:transition-colors";
const bannerEase = [0.22, 1, 0.36, 1];

const patientStoryVideoIds = [
  "iWEGwQd4wvg",
  "NzhJPHufpzU",
  "e82CoIgfjk0",
  "P2U5EPh-vPw",
  "93y5Wbgv-JE",
  "IDs0YwhagKo",
  "f9ZTLwA9u1o",
  "3vMPqaEFzfw",
  "llt2lwBjACc",
  "6jcLO3srNto",
];

const slides = [
  {
    image: familyPhoto,
    imageAlt: "Parents smiling as they hold their baby",
    label: "40+ Years of Expertise | 50+ Branches",
    title: "Your Dream of Parenthood",
    highlight: "Starts Here",
    description: "Caring doctors, gentle treatment and a team that stands by you at every step.",
  },
  {
    image: carePhoto,
    imageAlt: "A clinician reassuring a patient",
    label: "4 Lakh+ Couples Counselled | 1 Lakh+ Happy Families",
    title: "You Are Not Alone",
    highlight: "on This Journey",
    description: "Every worry, every question, every hope. Bring them all to us, and we will guide you with care.",
  },
  {
    image: motherAndBabyPhoto,
    imageAlt: "A mother smiling at her baby",
    label: "60,000+ IVF Babies | 35,000+ IUI Babies",
    title: "Every Family Deserves",
    highlight: "Its Little Joy",
    description: "Come with your hopes and your questions. We will bring the care, the experience and the patience.",
  },
];

const achievements = [
  { figure: "50+", label: "Branches in India" },
  { figure: "40+", label: "Years of Experience" },
  { figure: "4 Lakh+", label: "Couples Counselled" },
  { figure: "1 Lakh+", label: "Happy Families" },
];

const bookingAwards = [
  { title: "No. 1 Emerging IVF Hospital in India", image: emergingIvfAward },
  { title: "No. 1 IVF Hospital in Tamil Nadu", image: tamilNaduIvfAward },
];

const contactActionClass =
  "flex min-h-12 items-center justify-center gap-2 px-3 py-2.5 text-center text-sm font-medium leading-tight hover:bg-white/15 focus-visible:outline-white focus-visible:outline-offset-[-3px] max-sm:text-[.9375rem] md:flex-col md:gap-1.5 md:text-xs";

const revealGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.54, ease: bannerEase } },
};

const revealViewport = { once: true, amount: 0.15 };
const revealClass = "motion-reduce:!opacity-100 motion-reduce:!transform-none";

const fertilityBenefits = [
  { label: "Experienced Fertility Specialists", icon: Stethoscope },
  { label: "State of the art feacility", icon: Hospital },
  { label: "Transparant Pricing", icon: ReceiptIndianRupee },
  { label: "Personalised care for all", icon: HandHeart },
  { label: "Counselling That Heals the Heart", icon: MessagesSquare },
  { label: "24/7 Emergency Support", icon: Ambulance },
];

const cellDrift = {
  rest: { x: 0, y: 0, scale: 1 },
  float: {
    x: [0, 12, 4, 0],
    y: [0, -8, 5, 0],
    scale: [1, 1.06, 1.02, 1],
    transition: { duration: 4.4, ease: "easeInOut" },
  },
};

const cellPair = {
  rest: { x: 0, y: 0, scale: 1 },
  float: (direction) => ({
    x: [0, direction * 16, direction * 9, 0],
    y: [0, direction * 7, direction * 12, 0],
    scale: [1, 0.96, 1.05, 1],
    transition: { duration: 4.6, ease: "easeInOut" },
  }),
};

export default function BookAppointment() {
  useSmoothWheel();
  const reduceMotion = useReducedMotion();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [isCarouselFocused, setIsCarouselFocused] = useState(false);
  const shouldRotate = !reduceMotion && !isCarouselHovered && !isCarouselFocused;

  const heroRef = useRef(null);
  const [showActions, setShowActions] = useState(false);

  const router = useRouter();
  const [submissionError, setSubmissionError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { location: "" } });

  useEffect(() => {
    if (!shouldRotate) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveSlide((activeSlide + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [activeSlide, shouldRotate]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShowActions(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const submitAppointment = async ({ name, mobile, location }) => {
    setSubmissionError("");

    try {
      const response = await fetch("/api/booking-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, location }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) {
        for (const field of ["name", "mobile", "location"]) {
          if (result.errors?.[field]) {
            setError(field, { type: "server", message: result.errors[field] });
          }
        }
        setSubmissionError(result.message || "We could not request your appointment. Please try again.");
        return;
      }
      router.push("/thank-you");
    } catch {
      setSubmissionError("Check your connection and try again.");
    }
  };

  const copyVariants = {
    active: {
      visibility: "visible",
      transition: reduceMotion ? { duration: 0 } : { duration: 0, delayChildren: 0.15, staggerChildren: 0.09 },
    },
    inactive: { visibility: "hidden", transition: { duration: 0, when: "afterChildren" } },
  };
  const textVariants = {
    active: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.62, ease: bannerEase } },
    inactive: { opacity: 0, y: reduceMotion ? 0 : 14, transition: { duration: reduceMotion ? 0 : 0.16 } },
  };

  const appointmentForm = (
    <section className="relative z-10 min-w-0 scroll-mt-5 rounded-[clamp(17px,1.8vw,28px)] border border-[#e2e7f0] bg-white p-5 shadow-[0_14px_40px_#12275f24] min-[701px]:border-0 min-[701px]:p-[clamp(17px,1.75vw,30px)]" id="contact-now" aria-labelledby="appointment-title" tabIndex={-1}>
      <h2 id="appointment-title" className="m-0 text-[clamp(1.25rem,5.4vw,1.7rem)] font-bold leading-[1.18] tracking-tight max-sm:text-[clamp(1.5rem,5.6vw,1.85rem)] min-[701px]:text-[clamp(1.18rem,1.85vw,1.8rem)]">
        Book Your <span className="text-[#1b347c]">Free Appointment</span>
      </h2>
      <p className={formHintClass + " mb-3.5 mt-1.5"}>Talk to a fertility specialist. Request a callback below.</p>

      <form className="grid gap-[clamp(9px,1vw,15px)]" onSubmit={handleSubmit(submitAppointment)} noValidate aria-busy={isSubmitting}>
        <div className={formLabelClass}>
          <label htmlFor="appointment-name">Name</label>
          <input
            className={fieldClass}
            id="appointment-name"
            placeholder="Enter your name"
            autoComplete="name"
            required
            maxLength={50}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "appointment-name-error" : undefined}
            {...register("name", {
              validate: (value) => /^[a-zA-Z .]{2,50}$/.test(value.trim()) || "Enter at least two characters using letters, spaces, or periods.",
            })}
          />
          {errors.name && <p id="appointment-name-error" className={errorClass}>{errors.name.message}</p>}
        </div>

        <div className={formLabelClass}>
          <label htmlFor="appointment-mobile">WhatsApp number</label>
          <input
            className={fieldClass}
            id="appointment-mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="Enter your WhatsApp number"
            required
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={errors.mobile ? "appointment-mobile-error" : undefined}
            {...register("mobile", {
              validate: (value) => /^(?:91)?[6-9]\d{9}$/.test(value.replace(/\D/g, "")) || "Enter a valid 10-digit mobile number.",
            })}
          />
          {errors.mobile && <p id="appointment-mobile-error" className={errorClass}>{errors.mobile.message}</p>}
        </div>

        <div className={formLabelClass}>
          <label htmlFor="appointment-location">Location</label>
          <input
            className={fieldClass}
            id="appointment-location"
            type="text"
            placeholder="Enter your city or area"
            autoComplete="address-level2"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "appointment-location-error" : undefined}
            {...register("location", {
              validate: (value) => value.trim().length >= 2 || "Enter your city or area.",
            })}
          />
          {errors.location && <p id="appointment-location-error" className={errorClass}>{errors.location.message}</p>}
        </div>

        <p className={formHintClass + " m-0"}>Our fertility team will call you on this number.</p>
        {submissionError && <p className={errorClass} role="alert">{submissionError}</p>}
        <button className={actionClass + " min-h-11 w-full px-[13px] py-[9px] text-[clamp(.76rem,1.02vw,.98rem)] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:bg-[#1b347c] max-sm:text-base"} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Take Your Free Step Toward Parenthood"}
          <ArrowRight className="shrink-0" size={17} aria-hidden="true" />
        </button>
      </form>
    </section>
  );

  const cellShape = (
    <div className="relative grid size-full place-items-center rounded-[46%_54%_53%_47%/52%_45%_55%_48%] border border-[#a5bcef]/75 bg-[radial-gradient(circle_at_32%_30%,#ffffffbb,#ccdcff88_45%,#a4bcee55_74%,#dce7ffb3)] shadow-[inset_0_0_16px_#9db7ef45]">
      <div className="absolute inset-[9%] rounded-[inherit] border border-white/75" />
      <div className="relative size-[34%] rounded-[45%_55%_48%_52%] border border-[#a8bdf0] bg-[radial-gradient(circle_at_32%_32%,#f3f8ff,#afc3f3)] shadow-[0_0_15px_#9fb8f063]" />
      <span className="absolute left-[25%] top-[27%] size-[5%] rounded-full bg-[#7899e0]/55" />
      <span className="absolute bottom-[24%] right-[26%] size-[7%] rounded-full bg-[#91a9ec]/60" />
      <span className="absolute left-[28%] top-[64%] size-[4%] rounded-full bg-[#91a9ec]/55" />
    </div>
  );

  const fertilityBackdrop = (
    <motion.div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
      aria-hidden="true"
      initial="rest"
      whileInView={reduceMotion ? undefined : "float"}
      viewport={{ amount: 0.25 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_15%,#dfebff,transparent_53%),radial-gradient(ellipse_at_93%_80%,#e8e8ff,transparent_52%)]" />

      <motion.div
        className="absolute -left-10 top-4 size-24 opacity-45 motion-reduce:!transform-none sm:left-[3%] sm:top-5 sm:size-32 lg:left-[6%] lg:top-7 lg:size-40"
        variants={cellDrift}
        data-cell-motion="drift"
      >
        {cellShape}
      </motion.div>

      <div className="absolute -right-7 top-5 size-32 opacity-50 sm:right-[1%] sm:top-2 sm:size-44 lg:right-[5%] lg:size-52">
        <motion.div className="absolute left-[8%] top-[14%] size-[60%] motion-reduce:!transform-none" variants={cellPair} custom={-1}>
          {cellShape}
        </motion.div>
        <motion.div className="absolute left-[42%] top-[34%] size-[49%] motion-reduce:!transform-none" variants={cellPair} custom={1}>
          {cellShape}
        </motion.div>
      </div>
    </motion.div>
  );

  const whyChooseUs = (
    <section
      aria-labelledby="why-choose-us"
      className="relative isolate mt-8 rounded-2xl bg-[#f7f8fc] px-3 py-8 text-center sm:px-6 md:mt-14 md:rounded-3xl md:py-12 lg:px-8"
    >
      {fertilityBackdrop}

      <h2 id="why-choose-us" className="text-[clamp(1.55rem,3vw,2.3rem)] font-semibold leading-tight tracking-tight text-[#181d29]">
        Why Lakhs of Families Trust Sudha Hospitals
      </h2>
      <p className="mx-auto mt-3 max-w-[62ch] font-[family-name:var(--font-inter)] text-[clamp(.9rem,1.25vw,1rem)] leading-relaxed text-[#5c6270] max-sm:text-base">
        Where Advanced Fertility Care Meets Genuine Compassion 
      </p>

      <ul className="mt-6 grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 md:mt-8 lg:gap-4 xl:grid-cols-6">
        {fertilityBenefits.map(({ label, icon: Icon }, index) => (
          <motion.li
            key={label}
            initial={reduceMotion ? false : { opacity: 0.55, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0 : 0.44, delay: reduceMotion ? 0 : index * 0.055, ease: bannerEase }}
            className="group flex min-h-[132px] min-w-0 flex-col items-center justify-center gap-3 rounded-xl border border-[#e6ebf3] bg-white px-2.5 py-4 shadow-[0_4px_16px_#17336608] motion-reduce:!opacity-100 motion-reduce:!transform-none lg:min-h-[152px]"
          >
            <motion.span
              className="grid size-12 shrink-0 place-items-center rounded-full border border-[#dfe8fa] bg-[#f7faff] text-[#1b347c] motion-reduce:!transform-none lg:size-14"
              aria-hidden="true"
              initial={reduceMotion ? false : { scale: 0.82, y: 9, rotate: -9 }}
              whileInView={reduceMotion ? undefined : { scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 230, damping: 16, delay: index * 0.07 }}
            >
              <Icon
                className="size-6 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:rotate-[-8deg] lg:size-7"
              />
            </motion.span>
            <p className="max-w-[min(18ch,100%)] text-balance break-words text-[.9375rem] font-semibold leading-snug text-[#17213b] max-sm:text-base lg:text-lg">{label}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );

  const [bookingBanner, footerBookingBanner] = ["booking-banner-title", "booking-footer-banner-title"].map((titleId) => (
    <motion.section
      key={titleId}
      aria-labelledby={titleId}
      className={revealClass + " mx-auto mt-5 flex w-[94%] max-w-[1320px] flex-col items-center justify-between gap-3.5 relative isolate overflow-hidden rounded-2xl bg-gradient-to-b from-[#3c61cd] to-[#182e75] px-4 py-5 text-center text-white sm:flex-row sm:gap-6 sm:px-7 sm:text-left md:mt-7 md:px-9 md:py-6"}
      variants={revealItem}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-[10%] -z-10 size-40 rounded-full border border-white/20 bg-white/10 motion-reduce:!transform-none"
        initial={false}
        whileInView={reduceMotion ? undefined : { x: [0, 21, 0], y: [0, 11, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3.8, ease: "easeInOut" }}
        viewport={{ amount: 0.3 }}
      />
      <h2 id={titleId} className="text-balance text-[clamp(1.12rem,2.1vw,1.55rem)] font-semibold leading-tight tracking-tight max-sm:text-xl">
        Your journey to parenthood starts with one simple conversation.
      </h2>
      <a
        href="#contact-now"
        className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-4 py-2 text-center text-[.82rem] font-semibold leading-tight text-[#1b347c] hover:bg-[#ecf3ff] motion-safe:transition-colors max-sm:text-sm sm:px-5"
      >
        Book Your Free Appointment
        <ArrowRight size={16} aria-hidden="true" className="shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
      </a>
    </motion.section>
  ));

  const bookingDetails = (
    <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="mx-auto w-[95%] max-w-[1520px] px-1 pt-9 sm:pt-12 lg:pt-16">
        <motion.section
          aria-labelledby="achievements-title"
          className="text-center"
          variants={revealGroup}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.div variants={revealItem} className={revealClass}>
            <h2 id="achievements-title" className="mx-auto max-w-[30ch] text-[clamp(1.45rem,3.1vw,2.35rem)] font-semibold leading-tight tracking-tight text-black">
              Driven By The Happiness of Lakhs of Families
            </h2>
            <p className="mt-2 text-lg font-semibold leading-tight text-black md:text-[1.45rem]">Our Achievements</p>
          </motion.div>

          <dl className="mx-auto mt-6 grid max-w-[1320px] grid-cols-2 gap-3 sm:gap-4 md:mt-8 md:grid-cols-4 lg:gap-6">
            {achievements.map(({ figure, label }) => (
              <motion.div key={label} variants={revealItem} className={revealClass + " flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-[#e8ebf0] px-3 py-4 sm:px-4 sm:py-6 lg:py-8"}>
                <dt className="order-2 text-[clamp(.78rem,1.4vw,1.05rem)] leading-snug text-[#5c6270] max-sm:text-sm">{label}</dt>
                <dd className="order-1 text-[clamp(1.5rem,3vw,2.45rem)] font-bold leading-none text-[#1b347c]">{figure}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.section>

        <motion.section
          aria-labelledby="about-sudha-title"
          className="mt-8 grid items-start gap-6 md:mt-12 md:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)] md:gap-10 xl:gap-16"
          variants={revealGroup}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.div variants={revealItem} className={revealClass}>
            <h2 id="about-sudha-title" className="text-[clamp(1.4rem,3vw,2.3rem)] font-semibold leading-tight tracking-tight text-[#1b347c]">
              About Sudha Fertility Centre
            </h2>
            <p className="mb-3 mt-2 text-[clamp(1rem,1.7vw,1.3rem)] font-medium leading-snug text-black md:mb-4">
              From One Wish in Erode to Families Across South India
            </p>
            <p className="text-[clamp(.93rem,1.25vw,1.06rem)] leading-[1.75] text-[#5c6270] max-sm:text-base">
              Sudha Fertility Centre in Erode provides comprehensive fertility and reproductive healthcare services for couples seeking support on their parenthood journey. Backed by 40+ years of experience and a network of 50+ branches across India, treatment options include IVF, IUI, and ICSI, with personalised care plans tailored to individual clinical evaluation. Experienced fertility specialists, advanced diagnostics, and modern medical facilities support patients through each stage of care. Dedicated pregnancy care is also available for women. Committed to providing safe, high-quality healthcare through transparent treatment practices and compassionate patient care, Sudha Hospitals build lasting trust with every patient and family.
            </p>
           
            <Link href="/about-us" className={actionClass + " mt-5 min-h-11 px-5 text-sm"}>
              Know More <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div variants={revealItem} className={revealClass + " group overflow-hidden rounded-2xl md:rounded-3xl"}>
            <Image
              src={sudhaBuilding}
              alt="Exterior of Sudha Fertility Centre"
              className="aspect-[6/4] w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.025]"
              sizes="(max-width: 767px) 95vw, (max-width: 1600px) 42vw, 600px"
            />
          </motion.div>
        </motion.section>

        {whyChooseUs}
        <FertilitySolutions />
      </div>

      <section aria-labelledby="patient-stories-title" className="mt-8 w-full sm:mt-12 lg:mt-14">
        <motion.div
          className={revealClass + " flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-4 text-center"}
          variants={revealItem}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={revealViewport}
        >
          <h2 id="patient-stories-title" className="text-[clamp(1.5rem,2.8vw,1.25rem)] font-semibold leading-tight tracking-tight text-[#181d29]">
            Happy Patients, Happy Stories
          </h2>
          <a
            href="https://www.youtube.com/@sudhafertilitycentre"
            target="_blank"
            rel="noopener noreferrer"
            className={actionClass + " min-h-11 px-5 text-sm shadow-[0_6px_14px_#1b347c26]"}
          >
            View YouTube <FaYoutube size={15} aria-hidden="true" />
          </a>
        </motion.div>
        <PatientStoryMarquee videoIds={patientStoryVideoIds} />
      </section>

      <DoctorSlider />
      <PatientReviews />

      {bookingBanner}

      <motion.section
        aria-labelledby="booking-awards-title"
        className="mt-7 bg-[#f6f8fc] px-4 py-8 sm:px-6 md:mt-10 md:py-10"
        variants={revealGroup}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={revealViewport}
      >
        <div className="mx-auto max-w-[1060px]">
          <motion.h2
            id="booking-awards-title"
            variants={revealItem}
            className={revealClass + " mb-5 text-center text-[clamp(1.45rem,3.2vw,2.1rem)] font-semibold leading-tight tracking-tight text-[#18223a] md:mb-6"}
          >
            Awards &amp; Recognitions
          </motion.h2>
          <div className="grid min-w-0 items-center gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:gap-7 lg:gap-10">
            <motion.div variants={revealItem} className={revealClass + " text-center md:text-left"}>
              <h3 className="text-balance text-[clamp(1.12rem,2.15vw,1.55rem)] font-semibold leading-tight tracking-tight text-[#1b347c]">
                Recognised for Excellence in IVF
              </h3>
              <p className="mx-auto mt-2.5 max-w-[34ch] text-sm leading-relaxed text-[#546078] md:mx-0">
                These recognitions celebrate the teams behind IVF care at Sudha Fertility Centre. Our fertility specialists, embryologists, nurses and counsellors support patients from their first assessment through treatment and follow-up.
              </p>
            </motion.div>

            <ul className="grid min-w-0 grid-cols-2 gap-2.5 sm:gap-4">
              {bookingAwards.map(({ title, image }) => (
                <motion.li
                  key={title}
                  variants={revealItem}
                  className={revealClass + " group flex min-w-0 flex-col items-center justify-center gap-2.5 rounded-xl border border-[#e4ebf6] bg-white px-2.5 py-3.5 text-center shadow-[0_3px_12px_#18386a08] sm:px-4 sm:py-4"}
                >
                  <Image
                    src={image}
                    alt=""
                    sizes="(max-width: 639px) 94px, 116px"
                    className="h-auto w-[94px] max-w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 sm:w-[116px]"
                  />
                  <span className="max-w-[24ch] text-balance text-[.78rem] font-semibold leading-snug text-[#283754] sm:text-sm">
                    {title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <BookingFaq />
      {footerBookingBanner}

      <footer role="contentinfo" aria-label="Booking page footer" className="mt-6 border-t border-[#e0e6ef] bg-white px-4 sm:mt-8 sm:px-6">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center justify-between gap-1.5 py-3 text-center text-[#283754] sm:flex-row sm:gap-4 sm:text-left">
          <p className="text-xs leading-snug">Copyright © 2026 sudhafertilitycentre.com. All rights reserved.</p>
          <p className="shrink-0 text-xs leading-snug">
            Powered by{" "}
            <a
              href="https://arionmediacorp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1b347c] underline decoration-[#819ad5] underline-offset-2 hover:decoration-[#1b347c]"
            >
              Arion Media Corp
            </a>
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showActions && (
          <motion.nav
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.26, ease: "easeOut" }}
            aria-label="Quick appointment actions"
            className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 divide-x divide-white/20 bg-[#1b347c] pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-4px_22px_#12275f33] md:inset-x-auto md:bottom-auto md:right-3 md:top-[22vh] md:w-[78px] md:grid-cols-1 md:divide-x-0 md:divide-y md:overflow-hidden md:rounded-xl md:pb-0 md:shadow-[0_6px_20px_#12275f33] xl:right-0 xl:w-[86px]"
          >
            <a href="#contact-now" className={contactActionClass}>
              <CalendarDays size={19} className="shrink-0" aria-hidden="true" />
              <span>Book Appointment</span>
            </a>
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className={contactActionClass}>
              <FaWhatsapp size={21} className="shrink-0" aria-hidden="true" />
              <span>Chat with Us</span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-[100svh] bg-white text-[#181d29] [--booking-header-height:clamp(48px,5vw,75px)] motion-safe:[html:has(&)]:scroll-smooth motion-reduce:[html:has(&)]:!scroll-auto max-md:[html:has(&)]:scroll-pb-[calc(3.75rem+env(safe-area-inset-bottom))] [&_:is(input,select,button,a):focus-visible]:outline [&_:is(input,select,button,a):focus-visible]:outline-2 [&_:is(input,select,button,a):focus-visible]:outline-offset-2 [&_:is(input,select,button,a):focus-visible]:outline-[#2682de]">
      <div className="mx-auto flex min-h-14 w-[95%] max-w-[1520px] items-center justify-between gap-3 min-[701px]:min-h-[var(--booking-header-height)]">
        <Link href="/" aria-label="Sudha Fertility Centre home">
          <Image className="block h-auto w-[clamp(110px,10vw,160px)]" src={logo} alt="Sudha Fertility Centre" />
        </Link>
        <a className={actionClass + " min-h-11 whitespace-nowrap px-[clamp(10px,1.4vw,20px)] py-1.5 text-[clamp(.72rem,1.1vw,.98rem)] max-sm:text-sm min-[701px]:min-h-9"} href={bookingPhoneHref}>
          +91 767 007 6006
        </a>
      </div>

      <div ref={heroRef} className="overflow-hidden border-y border-[#e6ecf3] bg-[#f4f5f2] bg-[radial-gradient(ellipse_at_56%_75%,#e0eaf4,transparent_65%)]">
        <div className="mx-auto grid max-w-[1480px] min-w-0 items-center gap-4 px-5 pb-6 pt-5 sm:gap-6 sm:px-8 sm:pt-0 lg:min-h-[max(clamp(460px,37vw,575px),calc(100svh-var(--booking-header-height)-2px))] lg:grid-cols-[minmax(0,1fr)_minmax(280px,29%)] lg:px-10 lg:pb-0 xl:gap-8 xl:px-12">
          <div className="mx-auto w-full min-w-0 max-w-[560px] sm:row-start-2 lg:col-start-2 lg:row-start-1 lg:max-w-none lg:py-8">
            {appointmentForm}
          </div>

          <section
            className="grid min-w-0 items-center gap-4 sm:row-start-1 sm:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] sm:gap-5 lg:col-start-1 lg:self-stretch"
            aria-label="Fertility care highlights"
            aria-roledescription="carousel"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setIsCarouselHovered(true);
            }}
            onPointerLeave={() => setIsCarouselHovered(false)}
            onFocusCapture={(event) => setIsCarouselFocused(event.target.matches(":focus-visible"))}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsCarouselFocused(false);
            }}
          >
            <div className="min-w-0 pt-2 sm:col-start-1 sm:row-start-1 sm:py-9 lg:py-12">
              <motion.div
                className="grid motion-reduce:!transform-none motion-reduce:!opacity-100"
                aria-live={shouldRotate ? "off" : "polite"}
                initial={reduceMotion ? false : { y: 9 }}
                animate={{ y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.75, ease: bannerEase }}
              >
                {slides.map((slide, index) => (
                  <motion.div
                    className="col-start-1 row-start-1 min-w-0 max-w-[36rem] self-end"
                    key={slide.title}
                    data-active={index === activeSlide}
                    aria-hidden={index !== activeSlide}
                    variants={copyVariants}
                    initial={false}
                    animate={index === activeSlide ? "active" : "inactive"}
                  >
                    <motion.p
                      variants={textVariants}
                      className="mb-4 flex w-fit max-w-full items-center gap-2 text-base font-bold leading-snug text-[#1b347c] xl:text-lg"
                    >
                      <Award className="shrink-0 text-[#9a6415]" size={17} aria-hidden="true" />
                      {slide.label}
                    </motion.p>
                    <motion.h1
                      aria-label={slide.title + " " + slide.highlight}
                      variants={textVariants}
                      className={`mb-4 font-outfit font-semibold leading-[1.08] tracking-[-.035em] text-[#132950] ${index === 0
                        ? "text-[clamp(1.75rem,5.6vw,2.25rem)] sm:text-[clamp(1.6rem,2.65vw,2.7rem)]"
                        : "text-[clamp(2rem,6.2vw,2.75rem)] sm:text-[clamp(1.9rem,3.25vw,3.25rem)]"}`}
                    >
                      {slide.title}{" "}
                      <span className="block text-[#24549d]">{slide.highlight}</span>
                    </motion.h1>
                    <motion.p
                      variants={textVariants}
                      className="max-w-[40ch] font-[family-name:var(--font-inter)] text-[clamp(.94rem,1.25vw,1.125rem)] leading-relaxed text-[#3d4d67] max-sm:text-base"
                    >
                      {slide.description}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              
                <a className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-[#186247] hover:bg-[#e3efe9] max-sm:text-base" href={whatsAppUrl}>
                  <FaWhatsapp size={18} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>

              <div className="mt-2.5 flex w-max items-center" role="group" aria-label="Slide controls">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    className={slideControlClass + " after:h-2 after:w-2 after:rounded-full after:bg-[#798fb4] aria-pressed:after:w-6 aria-pressed:after:bg-[#1b347c] motion-safe:after:transition-[width,background-color]"}
                    aria-label={`Show slide ${index + 1}: ${slide.label}`}
                    aria-pressed={index === activeSlide}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>
            </div>

            <div className="relative isolate mx-auto h-[clamp(234px,75vw,350px)] w-full max-w-[500px] self-end [mask-image:linear-gradient(#000_88%,transparent)] sm:col-start-2 sm:row-start-1 sm:h-[clamp(300px,48vw,450px)] lg:h-[clamp(330px,29vw,440px)] lg:self-center lg:[mask-image:linear-gradient(#000_84%,transparent)]">
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;
                const isLandscape = slide.image.width > slide.image.height;

                return (
                  <motion.div
                    key={slide.title}
                    className={`absolute inset-x-[6%] bottom-0 ${isLandscape
                      ? "top-[8%] lg:-inset-x-[3%] lg:top-0"
                      : "top-[3%] lg:inset-x-[8%] lg:top-auto lg:aspect-[7/6]"}`}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.48, ease: bannerEase }}
                  >
                    <Image
                      className="object-contain object-bottom"
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="(max-width: 639px) 75vw, (max-width: 1023px) 39vw, (max-width: 1480px) 34vw, 500px"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "low"}
                    />
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {bookingDetails}

      <a
        href={bookingPhoneHref}
        aria-label="Call Sudha Fertility Centre"
        className={actionClass + " fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 size-12 shadow-[0_6px_20px_#12275f55] md:bottom-5 md:right-5 md:size-14"}
      >
        <Phone size={22} aria-hidden="true" />
      </a>
    </div>
  );
}
