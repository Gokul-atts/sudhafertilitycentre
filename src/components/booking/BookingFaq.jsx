"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

const questions = [
  {
    question: "What fertility treatments are provided at Sudha Fertility Centre?",
    answer: "Sudha Fertility Centre offers IVF, IUI, ICSI and fertility preservation. A specialist can explain which options may suit you and confirm what is available at your chosen branch.",
  },
  {
    question: "Why choose Sudha Fertility Centre for fertility treatments?",
    answer: "Our fertility specialists work with embryologists, nurses and counsellors. We review your medical history, explain the available options and help you plan the next step.",
  },
  {
    question: "What can cause infertility?",
    answer: "Possible causes include problems with ovulation, blocked fallopian tubes, endometriosis, and low sperm count or movement. More than one factor can contribute, and sometimes an evaluation finds no clear cause.",
  },
  {
    question: "When is the right time to consult a fertility specialist?",
    answer: "If there are no known fertility concerns, a fertility evaluation is generally recommended after 12 months of trying to conceive when the female partner is under 35, or after 6 months at age 35 or older. If the female partner is over 40 or either partner has a known fertility concern, seek advice sooner.",
  },
  {
    question: "Can I get counselling from Sudha Fertility Centre?",
    answer: "Yes. Fertility counselling gives you space to ask questions, talk through your concerns and get support as you weigh your treatment options.",
  },
  {
    question: "What can I expect at my first consultation?",
    answer: "Your specialist will ask about your medical history and fertility concerns. They can explain any recommended tests, what those tests may show and what happens next.",
  },
  {
    question: "How much does fertility treatment cost?",
    answer: "Costs depend on the tests and treatment you need. Your care team can explain the estimated costs of your treatment plan during your consultation.",
  },
  {
    question: "How do I book a fertility consultation?",
    answer: "Use the booking form on this page, call the helpline, or message us on WhatsApp. Our team will help you arrange a consultation at your chosen branch.",
  },
];

const initialCount = 5;
const ease = [0.22, 1, 0.36, 1];
const rowMotion = {
  hidden: { opacity: 0.68, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease } },
};
const listMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

function FaqRow({ index, openIndex, setOpenIndex, reduceMotion }) {
  const { question, answer } = questions[index];
  const open = openIndex === index;
  const triggerId = `booking-faq-question-${index}`;
  const answerId = `booking-faq-answer-${index}`;

  return (
    <motion.div variants={reduceMotion ? undefined : rowMotion} className="border-b border-[#dbe3f1] motion-reduce:!opacity-100 motion-reduce:!transform-none">
      <h3 className="m-0">
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpenIndex(open ? null : index)}
          className="group flex min-h-14 w-full items-center justify-between gap-3 rounded-md py-3 text-left text-[clamp(.94rem,1.7vw,1.14rem)] font-semibold leading-snug text-[#18223a] hover:text-[#1b347c] aria-expanded:text-[#1b347c] motion-safe:transition-colors sm:py-4"
        >
          <span>{question}</span>
          <motion.span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f0f5ff] text-[#1b347c]"
            initial={false}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.26, ease }}
          >
            <Plus size={17} strokeWidth={2.2} />
          </motion.span>
        </button>
      </h3>

      <div id={answerId} role="region" aria-labelledby={triggerId} inert={!open}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="overflow-hidden"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
            >
              <p className="max-w-[78ch] pb-4 pr-2 font-[family-name:var(--font-inter)] text-[.9rem] leading-[1.75] text-[#546078] sm:pb-5 md:text-[.96rem]">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function BookingFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const reduceMotion = useReducedMotion();

  function toggleMore() {
    if (showMore && openIndex >= initialCount) setOpenIndex(null);
    setShowMore(!showMore);
  }

  return (
    <section aria-labelledby="booking-faq-title" className="mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 md:py-11">
      <motion.h2
        id="booking-faq-title"
        className="mb-4 text-center text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold leading-tight tracking-tight text-[#18223a] motion-reduce:!opacity-100 motion-reduce:!transform-none md:mb-6"
        initial={reduceMotion ? false : { opacity: 0.68, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.42, ease }}
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.div
        variants={listMotion}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {questions.slice(0, initialCount).map(({ question }, index) => (
          <FaqRow key={question} index={index} openIndex={openIndex} setOpenIndex={setOpenIndex} reduceMotion={reduceMotion} />
        ))}
      </motion.div>

      <div id="booking-faq-more" inert={!showMore}>
        <AnimatePresence initial={false}>
          {showMore && (
            <motion.div
              className="overflow-hidden"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.34, ease }}
            >
              {questions.slice(initialCount).map(({ question }, index) => (
                <FaqRow key={question} index={index + initialCount} openIndex={openIndex} setOpenIndex={setOpenIndex} reduceMotion={reduceMotion} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center md:mt-7">
        <motion.button
          type="button"
          aria-expanded={showMore}
          aria-controls="booking-faq-more"
          onClick={toggleMore}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#1b347c] px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_15px_#1b347c25] hover:bg-[#12275f] motion-safe:transition-colors"
        >
          {showMore ? "View Less" : "View More"}
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ rotate: showMore ? 180 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease }}
          >
            <ArrowRight size={16} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
