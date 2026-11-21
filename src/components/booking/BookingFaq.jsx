"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

const questions = [
  {
    question: "What is the cost of IVF treatment?",
    answer: "The cost is different for every couple, as it depends on age, test results, medicines and the treatment needed. Our doctors explain the plan and the estimate before you begin. Visit us for a consultation to get a clear estimate for your case.",
  },
  {
    question: "What is the success rate of IVF at Sudha Fertility Centre?",
    answer: "Success depends on age, the cause of infertility and the quality of eggs and sperm. Thousands of IVF babies have been born with Sudha's care. After your tests, you will get an honest picture of your chances and how they can be improved.",
  },
  {
    question: "When is the right time to consult a fertility specialist?",
    answer: "If you are under 35 and have been trying for 12 months without success, it is time to meet a specialist. If you are 35 or above, do not wait more than 6 months. Meet us sooner if you have irregular periods, PCOS, endometriosis, a past surgery or any known sperm problem.",
  },
  {
    question: "What are the common reasons for infertility?",
    answer: "Infertility can come from the woman, the man or both, and sometimes no clear cause is found. In women, common reasons are PCOS, irregular ovulation, blocked tubes, endometriosis and age. In men, it is usually low sperm count or movement. It is no one's fault, and many causes can be treated.",
  },
  {
    question: "What fertility treatments are provided at Sudha Fertility Centre?",
    answer: "We offer IVF, ICSI, IUI, treatment for PCOS/PCOD and other female and male fertility problems, egg and sperm donation, and fertility preservation. You are advised only what you truly need.",
  },
  {
    question: "IVF or IUI: which one is right for us?",
    answer: "IUI is a simpler treatment, often suggested when the tubes are open and sperm quality is fair. IVF is suggested when IUI has not worked, or when there are blocked tubes, low sperm count, endometriosis or advanced age. The right choice is decided together with you after your tests.",
  },
  {
    question: "Is IVF treatment painful?",
    answer: "Most women find IVF comfortable. You may feel mild bloating or tiredness during the medicines. Egg collection is done with short sedation, so you do not feel pain, and most women return to normal routines soon after.",
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
        Honest answers to the questions couples ask us most.
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
