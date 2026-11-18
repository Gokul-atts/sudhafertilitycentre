"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Award, CalendarDays, Compass, HandHeart, HeartPulse, Microscope, Pause, Phone, Play, ReceiptIndianRupee } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import family from "@/assets/Home/tab3.webp";
import consultation from "@/assets/Home/tab1.webp";
import parents from "@/assets/Home/tab4.webp";
import sudhaBuilding from "@/assets/branch/erode/erode.webp";
import emergingIvfAward from "@/assets/About/award1.webp";
import tamilNaduIvfAward from "@/assets/About/award2.webp";
import logo from "@/assets/logo-dark.svg";
import { fetchBranchList } from "@/lib/api/branches";
import FertilitySolutions from "@/components/booking/FertilitySolutions";
import DoctorSlider from "@/components/booking/DoctorSlider";
import PatientReviews from "@/components/booking/PatientReviews";
import BookingFaq from "@/components/booking/BookingFaq";
import useSmoothWheel from "@/components/booking/useSmoothWheel";
import { MarqueeComponent } from "@/components/marqueeSlider";
import { Ambattur } from "@/middleware/imagesroute";

const whatsAppUrl = "https://wa.me/917670076006";
const actionClass = "inline-flex items-center justify-center gap-2 rounded-full bg-[#1b347c] font-medium leading-tight text-white hover:bg-[#12275f]";
const fieldClass = "w-full min-w-0 min-h-[46px] rounded-lg border border-[#cbd1dd] bg-white px-2.5 py-2 text-base text-[#181d29] placeholder:text-[#626979] invalid:[&:is(select)]:text-[#626979] aria-[invalid=true]:border-[#b42318] min-[701px]:min-h-[43px] min-[701px]:text-[.93rem]";
const errorClass = "m-0 text-[.83rem] leading-[1.35] text-[#b42318]";
const slideControlClass = "grid min-h-11 w-11 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10 motion-safe:transition-colors min-[701px]:w-10";
const bannerEase = [0.22, 1, 0.36, 1];

const slides = [
  {
    image: family,
    label: "Fertility Experts in Coimbatore",
    title: "High Success Rates Meet",
    highlight: "Ethical Fertility Care in Coimbatore.",
    description: "Start your parenthood journey with a fertility team that listens and helps you understand your options.",
  },
  {
    image: consultation,
    label: "Personalised Fertility Care",
    title: "Get Answers From",
    highlight: "a Fertility Specialist.",
    description: "Talk about your concerns, learn which tests may help, and discuss treatment options for your needs.",
  },
  {
    image: parents,
    label: "Support for Your Parenthood Journey",
    title: "Take Your First Step",
    highlight: "Towards Parenthood.",
    description: "Book a free consultation and find out what your next step could look like.",
  },
];

function AppointmentForm() {
  const router = useRouter();
  const [branches, setBranches] = useState(null);
  const [branchRequest, setBranchRequest] = useState(0);
  const [submissionError, setSubmissionError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { branch: "" } });

  useEffect(() => {
    let active = true;
    fetchBranchList().then((list) => {
      if (active) setBranches(list);
    });
    return () => { active = false; };
  }, [branchRequest]);

  async function submitAppointment({ name, mobile, branch }) {
    setSubmissionError("");
    const selectedBranch = branches?.find(({ id }) => String(id) === branch);
    if (!selectedBranch) {
      setError("branch", { message: "Select a location." }, { shouldFocus: true });
      return;
    }

    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          branch: selectedBranch.id,
          location: selectedBranch.branch_name,
          formType: "landing page",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        for (const field of ["name", "mobile", "branch"]) {
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
  }

  return (
    <section className="relative z-10 min-w-0 scroll-mt-5 rounded-[clamp(17px,1.8vw,28px)] border border-[#e2e7f0] bg-white p-5 shadow-[0_14px_40px_#12275f24] min-[701px]:border-0 min-[701px]:p-[clamp(17px,1.75vw,30px)]" id="contact-now" aria-labelledby="appointment-title" tabIndex={-1}>
      <h2 id="appointment-title" className="m-0 text-[clamp(1.25rem,5.4vw,1.7rem)] font-bold leading-[1.18] tracking-tight min-[701px]:text-[clamp(1.18rem,1.85vw,1.8rem)]">
        Book Your <span className="text-[#1b347c]">Free Appointment</span>
      </h2>
      <p className="mb-3.5 mt-1.5 text-[clamp(.75rem,.98vw,.92rem)] leading-[1.45] text-[#515b70]">Talk to a fertility specialist. Request a callback below.</p>

      <form className="grid gap-[clamp(9px,1vw,15px)]" onSubmit={handleSubmit(submitAppointment)} noValidate aria-busy={isSubmitting}>
        <div className="grid min-w-0 gap-1 text-[clamp(.78rem,1vw,.96rem)] font-medium">
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

        <div className="grid min-w-0 gap-1 text-[clamp(.78rem,1vw,.96rem)] font-medium">
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

        <div className="grid min-w-0 gap-1 text-[clamp(.78rem,1vw,.96rem)] font-medium">
          <label htmlFor="appointment-location">Location</label>
          <select
            className={fieldClass}
            id="appointment-location"
            required
            disabled={!branches?.length}
            aria-invalid={Boolean(errors.branch)}
            aria-describedby={errors.branch ? "appointment-location-error" : undefined}
            {...register("branch", { required: "Select a location." })}
          >
            <option value="">{branches ? "Select your nearest centre" : "Loading locations…"}</option>
            {branches?.map(({ id, branch_name: name }) => <option key={id} value={id}>{name}</option>)}
          </select>
          {errors.branch && <p id="appointment-location-error" className={errorClass}>{errors.branch.message}</p>}
          {branches?.length === 0 && (
            <p className={errorClass} role="status">
              Locations could not load.{" "}
              <button type="button" className="font-semibold underline" onClick={() => {
                setBranches(null);
                setBranchRequest((attempt) => attempt + 1);
              }}>Try again</button>
            </p>
          )}
        </div>

        <p className="m-0 text-[clamp(.75rem,.98vw,.92rem)] leading-[1.45] text-[#515b70]">Our fertility team will call you on this number.</p>
        {submissionError && <p className={errorClass} role="alert">{submissionError}</p>}
        <button className={actionClass + " min-h-11 w-full px-[13px] py-[9px] text-[clamp(.76rem,1.02vw,.98rem)] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:bg-[#1b347c]"} type="submit" disabled={isSubmitting || !branches?.length}>
          {isSubmitting ? "Submitting…" : "Take Your Free Step Toward Parenthood"}
          <ArrowRight className="shrink-0" size={17} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}

const achievements = [
  { figure: "3.5L+", label: "Infertile Couples Counselled" },
  { figure: "1L+", label: "Laparoscopic Surgeries" },
  { figure: "35k+", label: "IUI Babies" },
  { figure: "60k+", label: "IVF Babies" },
];

const bookingAwards = [
  { title: "No. 1 Emerging IVF Hospital in India", image: emergingIvfAward },
  { title: "No. 1 IVF Hospital in Tamil Nadu", image: tamilNaduIvfAward },
];

const contactActionClass =
  "flex min-h-12 items-center justify-center gap-2 px-3 py-2.5 text-center text-sm font-medium leading-tight hover:bg-white/15 focus-visible:outline-white focus-visible:outline-offset-[-3px] md:flex-col md:gap-1.5 md:text-xs";

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
  { label: "Personalized Fertility Care", icon: HeartPulse },
  { label: "Advanced Medical Technology", icon: Microscope },
  { label: "Transparent Treatment Pricing", icon: ReceiptIndianRupee },
  { label: "Compassionate Patient Care", icon: HandHeart },
  { label: "Complete Fertility Guidance", icon: Compass },
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

function CellShape() {
  return (
    <div className="relative grid size-full place-items-center rounded-[46%_54%_53%_47%/52%_45%_55%_48%] border border-[#a5bcef]/75 bg-[radial-gradient(circle_at_32%_30%,#ffffffbb,#ccdcff88_45%,#a4bcee55_74%,#dce7ffb3)] shadow-[inset_0_0_16px_#9db7ef45]">
      <div className="absolute inset-[9%] rounded-[inherit] border border-white/75" />
      <div className="relative size-[34%] rounded-[45%_55%_48%_52%] border border-[#a8bdf0] bg-[radial-gradient(circle_at_32%_32%,#f3f8ff,#afc3f3)] shadow-[0_0_15px_#9fb8f063]" />
      <span className="absolute left-[25%] top-[27%] size-[5%] rounded-full bg-[#7899e0]/55" />
      <span className="absolute bottom-[24%] right-[26%] size-[7%] rounded-full bg-[#91a9ec]/60" />
      <span className="absolute left-[28%] top-[64%] size-[4%] rounded-full bg-[#91a9ec]/55" />
    </div>
  );
}

function FertilityBackdrop({ reduceMotion }) {
  return (
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
        <CellShape />
      </motion.div>

      <div className="absolute -right-7 top-5 size-32 opacity-50 sm:right-[1%] sm:top-2 sm:size-44 lg:right-[5%] lg:size-52">
        <motion.div className="absolute left-[8%] top-[14%] size-[60%] motion-reduce:!transform-none" variants={cellPair} custom={-1}>
          <CellShape />
        </motion.div>
        <motion.div className="absolute left-[42%] top-[34%] size-[49%] motion-reduce:!transform-none" variants={cellPair} custom={1}>
          <CellShape />
        </motion.div>
      </div>
    </motion.div>
  );
}

function WhyChooseUs({ reduceMotion }) {
  return (
    <section
      aria-labelledby="why-choose-us"
      className="relative isolate mt-8 rounded-2xl bg-[#f7f8fc] px-3 py-8 text-center sm:px-6 md:mt-14 md:rounded-3xl md:py-12 lg:px-8"
    >
      <FertilityBackdrop reduceMotion={reduceMotion} />

      <h2 id="why-choose-us" className="text-[clamp(1.55rem,3vw,2.3rem)] font-semibold leading-tight tracking-tight text-[#181d29]">
        Why Choose Us?
      </h2>
      <p className="mx-auto mt-3 max-w-[62ch] font-[family-name:var(--font-inter)] text-[clamp(.9rem,1.25vw,1rem)] leading-relaxed text-[#5c6270]">
        Experience compassionate fertility care with advanced treatments and expert guidance at every step of your parenthood journey.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-5 lg:gap-4">
        {fertilityBenefits.map(({ label, icon: Icon }, index) => (
          <motion.li
            key={label}
            initial={reduceMotion ? false : { opacity: 0.55, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0 : 0.44, delay: reduceMotion ? 0 : index * 0.055, ease: bannerEase }}
            className="group motion-reduce:!opacity-100 motion-reduce:!transform-none flex min-h-[132px] min-w-0 flex-col items-center justify-center gap-3 rounded-xl border border-[#e6ebf3] bg-white px-2.5 py-4 shadow-[0_4px_16px_#17336608] last:col-span-2 last:w-[calc(50%_-_0.375rem)] last:justify-self-center md:last:col-span-1 md:last:w-full lg:min-h-[152px]"
          >
            <motion.span
              className="grid h-11 w-11 place-items-center rounded-full border border-[#dfe8fa] bg-[#f7faff] text-[#1b347c] motion-reduce:!transform-none lg:h-12 lg:w-12"
              aria-hidden="true"
              initial={reduceMotion ? false : { scale: 0.82, y: 9, rotate: -9 }}
              whileInView={reduceMotion ? undefined : { scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 230, damping: 16, delay: index * 0.07 }}
            >
              <Icon
                className="h-5 w-5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:rotate-[-8deg]"
                strokeWidth={1.7}
              />
            </motion.span>
            <p className="max-w-[15ch] text-balance text-sm font-semibold leading-snug text-[#17213b] lg:text-base">{label}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function BookingBanner({ titleId, reduceMotion }) {
  return (
    <motion.section
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
      <h2 id={titleId} className="max-w-[36ch] text-balance text-[clamp(1.12rem,2.1vw,1.75rem)] font-semibold leading-tight tracking-tight">
        Bring your little one home and start the adventure of parenthood
      </h2>
      <a
        href="#contact-now"
        className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-4 py-2 text-center text-[.82rem] font-semibold leading-tight text-[#1b347c] hover:bg-[#ecf3ff] motion-safe:transition-colors sm:px-5"
      >
        Book Your Free Appointment
        <ArrowRight size={16} aria-hidden="true" className="shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
      </a>
    </motion.section>
  );
}

function BookingDetails() {
  const reduceMotion = useReducedMotion();
  const detailsRef = useRef(null);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowActions(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(detailsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={detailsRef} className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
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
                <dt className="order-2 text-[clamp(.78rem,1.4vw,1.05rem)] leading-snug text-[#5c6270]">{label}</dt>
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
              Four Decades of Compassionate Care in Parenthood
            </p>
            <p className="text-[clamp(.93rem,1.25vw,1.06rem)] leading-[1.75] text-[#5c6270]">
              Sudha Fertility Centre opened in Erode in 1995 to help couples experiencing infertility. Today, our network of more than 40 branches across South India, Bangladesh and Sri Lanka brings fertility care closer to families in cities and rural communities. Our team guides you through your options and supports you at each stage of your parenthood journey.
            </p>
            <Link href="/about-us" className={actionClass + " mt-5 min-h-11 px-5 text-sm"}>
              Know More <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div variants={revealItem} className={revealClass + " group overflow-hidden rounded-2xl md:rounded-3xl"}>
            <Image
              src={sudhaBuilding}
              alt="Exterior of Sudha Fertility Centre"
              className="aspect-[6/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.025]"
              sizes="(max-width: 767px) 95vw, (max-width: 1600px) 42vw, 600px"
            />
          </motion.div>
        </motion.section>

        <WhyChooseUs reduceMotion={reduceMotion} />
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
        <MarqueeComponent
          items={Ambattur.gallery}
          direction="left"
          speed="fast"
          className="mt-4 sm:mt-6 [&_li]:w-[clamp(12rem,22vw,22rem)] [&_img]:aspect-[3/2] [&_img]:object-cover motion-reduce:!overflow-x-auto motion-reduce:[&_ul]:!animate-none"
        />
      </section>

      <DoctorSlider />
      <PatientReviews />

      <BookingBanner titleId="booking-banner-title" reduceMotion={reduceMotion} />

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
      <BookingBanner titleId="booking-footer-banner-title" reduceMotion={reduceMotion} />

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
            className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 divide-x divide-white/20 bg-[#1b347c] pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-4px_22px_#12275f33] md:inset-x-auto md:bottom-auto md:right-3 md:top-[22vh] md:w-[78px] md:grid-cols-1 md:divide-x-0 md:divide-y md:overflow-hidden md:rounded-xl md:pb-0 md:shadow-[0_6px_20px_#12275f33] xl:right-5 xl:w-[86px]"
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
}

export default function BookAppointment() {
  useSmoothWheel();
  const reduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!reducedMotion.matches);
    const handleMotionChange = (event) => setPlaying(!event.matches);
    reducedMotion.addEventListener("change", handleMotionChange);
    return () => reducedMotion.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused) return;
    const timer = window.setTimeout(() => {
      setActiveSlide((index) => (index + 1) % slides.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [activeSlide, focused, hovered, playing]);

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

  return (
    <div className="min-h-[100svh] bg-white text-[#181d29] motion-safe:[html:has(&)]:scroll-smooth motion-reduce:[html:has(&)]:!scroll-auto max-md:[html:has(&)]:scroll-pb-[calc(3.75rem+env(safe-area-inset-bottom))] [&_:is(input,select,button,a):focus-visible]:outline [&_:is(input,select,button,a):focus-visible]:outline-2 [&_:is(input,select,button,a):focus-visible]:outline-offset-2 [&_:is(input,select,button,a):focus-visible]:outline-[#2682de]">
      <div className="mx-auto flex min-h-14 w-[95%] max-w-[1520px] items-center justify-between gap-3 min-[701px]:min-h-[clamp(48px,5vw,75px)]">
        <Link href="/" aria-label="Sudha Fertility Centre home">
          <Image className="block h-auto w-[clamp(90px,9vw,138px)]" src={logo} alt="Sudha Fertility Centre" />
        </Link>
        <a className={actionClass + " min-h-11 whitespace-nowrap px-[clamp(10px,1.4vw,20px)] py-1.5 text-[clamp(.72rem,1.1vw,.98rem)] min-[701px]:min-h-9"} href="tel:+917670076006">
          <Phone size={15} aria-hidden="true" /> +91 767-007-6006
        </a>
      </div>

      <div className="relative isolate mx-auto mt-2.5 grid w-[95%] max-w-[1520px] grid-cols-[minmax(0,1fr)] items-center gap-3.5 rounded-[clamp(14px,1.6vw,26px)] min-[701px]:mt-0 min-[701px]:min-h-[clamp(445px,47vw,720px)] min-[701px]:grid-cols-[minmax(0,1fr)_minmax(265px,34%)] min-[701px]:gap-[clamp(24px,4vw,64px)] min-[701px]:p-[clamp(26px,4.7vw,72px)]">
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[18px] bg-[#213e7d] [grid-area:1/1/2/2] min-[701px]:rounded-[inherit] min-[701px]:[grid-area:auto]" aria-hidden="true">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;

            return (
              <motion.div
                key={slide.title}
                className="absolute inset-0 motion-reduce:!transform-none"
                data-active={isActive}
                initial={index === 0 && !reduceMotion ? { opacity: 1, scale: 1.035 } : false}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive || reduceMotion ? 1 : 1.045 }}
                transition={{ opacity: { duration: reduceMotion ? 0 : 0.68 }, scale: { duration: reduceMotion ? 0 : 1.35, ease: bannerEase } }}
              >
                <Image
                  className="object-cover object-[58%_center] min-[701px]:object-center"
                  src={slide.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1600px) 95vw, 1520px"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                />
              </motion.div>
            );
          })}
          <div className="absolute inset-0 z-10 bg-[linear-gradient(105deg,#0b2052ec,#16366885_58%,#132f5b42),linear-gradient(0deg,#0b2052ad,transparent_72%)] min-[701px]:bg-[linear-gradient(90deg,#0d214ff5,#19366a99_35%,#1c3d772e_72%,#1c3d7712),linear-gradient(180deg,#172e604d,transparent_86%)]" />
        </div>

        <section
          className="min-w-0 px-[clamp(17px,5vw,32px)] pb-4 pt-7 text-white min-[701px]:p-0 [&_:is(button,a):focus-visible]:!outline-white"
          aria-label="Fertility care highlights"
          aria-roledescription="carousel"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          <motion.div
            className="grid motion-reduce:!transform-none motion-reduce:!opacity-100"
            aria-live={playing ? "off" : "polite"}
            initial={reduceMotion ? false : { opacity: 0.78, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
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
                  className="mb-[clamp(15px,2vw,28px)] inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-[clamp(.7rem,1vw,.83rem)] font-semibold leading-snug tracking-[.04em] text-white backdrop-blur-sm"
                >
                  <Award className="shrink-0 text-[#ffd48e]" size={17} aria-hidden="true" />
                  {slide.label}
                </motion.p>
                <motion.h1
                  aria-label={slide.title + " " + slide.highlight}
                  variants={textVariants}
                  className="mb-3.5 text-balance font-outfit text-[clamp(1.85rem,7.8vw,2.7rem)] font-semibold leading-[1.04] tracking-[-.035em] text-white min-[701px]:text-[clamp(1.95rem,3.7vw,3.7rem)]"
                >
                  {slide.title}{" "}
                  <span className="text-[#cde1ff]">{slide.highlight}</span>
                </motion.h1>
                <motion.p
                  variants={textVariants}
                  className="max-w-[42ch] font-[family-name:var(--font-inter)] text-[clamp(.88rem,1.18vw,1.05rem)] font-normal leading-[1.68] text-[#f0f5ff]"
                >
                  {slide.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <a className={actionClass + " group mt-5 min-h-11 border border-white/35 px-5 py-2 text-[.9rem] shadow-[0_6px_24px_#0b205240] motion-safe:transition-colors"} href={whatsAppUrl}>
            Connect With WhatsApp
            <ArrowRight className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1" size={18} aria-hidden="true" />
          </a>

          <div className="mt-2.5 flex w-max items-center" aria-label="Slide controls">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={slideControlClass + " after:h-2 after:w-2 after:rounded-full after:bg-white/50 aria-pressed:after:w-6 aria-pressed:after:bg-white motion-safe:after:transition-[width,background-color]"}
                aria-label={`Show slide ${index + 1}: ${slide.label}`}
                aria-pressed={index === activeSlide}
                onClick={() => {
                  setActiveSlide(index);
                  setPlaying(false);
                }}
              />
            ))}
            <button
              type="button"
              className={slideControlClass}
              aria-label={playing ? "Pause automatic slides" : "Play automatic slides"}
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            </button>
          </div>
        </section>

        <AppointmentForm />
      </div>

      <BookingDetails />
    </div>
  );
}
