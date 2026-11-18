"use client";
import React, { useState } from "react";
import BgAbout from "@/assets/branch/ambatur/hospital.webp";
import Image from "next/image";
import Button from "@/components/button";
import SudhaAbout from "@/assets/branch/erode/erode_about.webp";
import { motion } from "framer-motion";
import Pradeepa from "@/assets/branch/ambatur/pradeepa.webp";
import Hospital from "@/assets/branch/karur/Karur.webp";
import Dhivya from "@/assets/branch/karur/Dhivya.webp";
import ImageGrid from "@/components/imagegrid";
import Buttonbottm from "@/components/button";
import { MdArrowOutward, MdLocationOn } from "react-icons/md";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

import { IoCallOutline } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import FAQItem from "@/components/accordion";
import AppointmentForm from "@/components/appointmentForm";
import Navbar from "@/components/branchNav";
import ImageSlider from "@/components/imageSlider";
import { MarqueeComponent } from "@/components/marqueeSlider";
import { Ambattur, Erode, Karur } from "@/middleware/imagesroute";
import ScrollMotion from "@/components/animation/scrollMotion";
import BranchForm from "@/components/branchForm";
// import { InfiniteMovingCardsDemo } from "@/components/review_Card/reviewCard";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import dynamic from "next/dynamic";
// Dynamic imports with same loading component
const InfiniteMovingCardsDemo = dynamic(
  () => import("@/components/review_Card/reviewCard"),
  { loading: () => <LoadingSpinner height="400px" /> },
);

function KarurPage() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to track if all FAQs are shown

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleViewMore = () => {
    if (showAll) {
      setVisibleCount(5); // Reset to initial count when showing less
      setShowAll(false); // Properly toggle state
    } else {
      setVisibleCount(Karur.faqs.length); // Show all FAQs
      setShowAll(true); // Properly toggle state
    }
  };
  const sections = [
    { id: "about", label: "About" },
    { id: "facilities", label: "Facilities" },
    { id: "specialists", label: "Fertility Specialists" },
    { id: "gallery", label: "Gallery" },
    { id: "location", label: "Location" },
  ];

  const KarurReview = [
    {
      quote:
        "sudha hospital is a best treatment for fertiity and 100% best result.we are so happy.staff also softly handle and anytime clear any doubt. thanks sudha hospital",
      name: "Surya P",
      title: "Patient",
    },
    {
      quote:
        "Nice IVF center and that they got IVF success in their first try.  The team was very good and soft spoken, and that the treatment was transparent.",
      name: "Pushpa Valli",
      title: "Patient",
    },
    {
      quote:
        "Very good hospital for fertility treatment, friendly staffs and doctor. After 4 months of treatment, now the result came positively and I'm happy to share.",
      name: "Kaviyarasi K",
      title: "Patient",
    },
    {
      quote:
        "I'm really happy to share this... Today my UPT card positive 😍now I'm pregnant.... I'm really very very happy.. thanks for sudha team",
      name: "Kanagumani Kanagumani",
      title: "Patient",
    },
    {
      quote:
        "This is radhika. Iam taking treatment in sudha fertility centre karur branch. I followed mam advice. Now iam pregnant. Thank you so much sudha hospital team.",
      name: "Radhika Saravanan",
      title: "Patient",
    },
    {
      quote: `HI I AM NITHISH
  HAPPY TO DELIVER THE FEEDBACK HERE ..
  SINCERE THANKS TO DR.DHIVYA SUSHIL MAM..
  I HOPE THAT ALL MY FAMILY FEELS SO VERY HAPPY BECAUSE OF AM BLESSED WITH A BABY GIRL...DR.DHIVYA MAM WISELY TEACHES HOW TO TAKE MEDICINES AND FOLLOWUPS ... PERFECT HOSPITAL AND GOOD ATMOSPHERE...I SUGGEST THOSE WHO NEEDS FERTILITY TREATMENT FOR CHILD PLEASE VISIT HERE.... 💯 SAFE AND SECURED NURSES ,UMA SISTER,SATHYA SISTER AND ALL STAFFS ARE FRIENDLY
  UMA SISTER SHE EXPLAINS EVERYTHING TO THE PATIENTS CLEARLY WITH A SOFT MANNER...THANKS TO KARUR SUDHA HOSPITAL AND GROUPS...`,
      name: "Nithish",
      title: "Patient",
    },
    {
      quote:
        "This is anushiya.Iam taking treatment in sudha hospital karur branch.doctor advice in IUI procedure.I followed.now today UPT is positive. Iam very happy.thank you so much mam. Really iam happy.",
      name: "Anu Anushya",
      title: "Patient",
    },
    {
      quote:
        "Really we r proud to be a family of Karur Sudha Fertility hospitals because they treat very well and they explain everything...best hospital for fertility treatments,Dr.Mrs DIVYA SUSHIL mam explains all about our treatments and converse with every patients cleary...I prefer that sudha hospital has completely secure and excellent good atmosphere...Excellent nurses UMA sister, SATHYA sister they cares every patient properly and wisely...Best hospital if you r trying for prngncy choose KARUR SUDHA FERTILITY CENTRE....",
      name: "Nithish Nithu ERD",
      title: "Patient",
    },
    {
      quote:
        "Good atmosphere.They are providing good treatment.They explain clearly.I am happy to share my experience with sudha hospitals.I strongly recommend to all.",
      name: "Mohith Monish",
      title: "Patient",
    },
    {
      quote:
        "Iam kowsala .iam taking treatment in karur Sudha hospital.treatment wise clearly explained.and doctor is friendly.",
      name: "Kowsi karthick",
      title: "Patient",
    },
    {
      quote:
        "Iam gowri. Iam taking treatment in sudha fertility centre Karur branch. Dr. Very clearly explained . Good atmosphere and staffs are very friendly.",
      name: "T Gowri",
      title: "Patient",
    },
    {
      quote:
        "Uma is taking fertility treatment in sudha hospital at karur.she feels so satisfied for taking treatment here.",
      name: "maha lakshmi",
      title: "Patient",
    },
    {
      quote:
        "Hii this is vijay.iam taking treatment in sudha fertility centre in karur.good treatment.and dr clearly explained.thank you",
      name: "Vijay mallar",
      title: "Patient",
    },
    {
      quote:
        "Sudha hospital Karur is the best hospital .caring and friendly dr.dhivya mam.good environment.",
      name: "Chithra Chithra1805",
      title: "Patient",
    },
    {
      quote:
        "I am prefer to sudha hospital.there is clearly explain our problem. Good caring and treatment",
      name: "Rithika Raja",
      title: "Patient",
    },
    {
      quote:
        "Dr.dhivya mam is very friendly and clearly explained the procedure.good atmosphere.",
      name: "Palani Samy",
      title: "Patient",
    },
    {
      quote:
        "Treatment and approach to patent very kind and very good....I personally very satisfied and fulfilled",
      name: "Varatharaj",
      title: "Patient",
    },
    {
      quote: "Treatment is good and staff are very friendly.and low cost .",
      name: "Bala Subramani",
      title: "Patient",
    },
    {
      quote:
        "After 17 years of marriage after three months of treatment at Sudha Hospital I am now eight months pregnant with twins thanks to Sudha Hospital.",
      name: "Malarkodi gopi",
      title: "Patient",
    },
    {
      quote:
        "Hello people... 🙏🏻 It has been 9 years since we both got married. But we don't have children. We were very sad. We came to know about Sudha Fertility Center and took treatment at Karur branch. We did IUI treatment and now I am 3 months pregnant. We are very happy now. Thank you Sudha Fertility Centre. For remembering our long dream. India best fertility center Sudha Fertility Center...",
      name: "Dharma T",
      title: "Patient",
    },
  ];

  return (
    <>
      <div className="relative w-full min-h-[850px] md:min-h-[600px] lg:min-h-[600px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover -top-40 bg-center"
          style={{
            backgroundImage: `url(${BgAbout.src}), linear-gradient(to bottom, rgba(23, 51, 102, 0.7), rgba(255, 255, 255, 1))`,
          }}
        />

        <div>
          <div className="relative py-10 md:py-16">
            <div className="container mx-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  {/* Left Content */}
                  <motion.div
                    className="text-white w-full lg:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-[#FFC65C]  font-semibold uppercase">
                      VANAKKAM Karur
                    </h2>
                    <h1 className="font-bold mt-4">
                      Best Fertility Centre In{" "}
                      <br className="hidden sm:block" />
                      <span className="text-[#FDCB58]">Karur</span>
                    </h1>
                    <p className="mt-4 text-[22px] leading-[1.6]">
                      Embracing your parenthood journey with expert fertility
                      guidance.
                    </p>
                    <Button
                      styleClass="mt-6"
                      text="Connect with WhatsApp"
                      link="https://wa.me/917670076006?text=Hi,%20Can%20I%20get%20more%20info%20on%20this?"
                      icon={<IoMdArrowForward />}
                    />
                  </motion.div>

                  {/* Right Content - Form */}
                  <BranchForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-80 lg:-bottom-64 w-full">
          <InfiniteMovingCardsDemo reviews={KarurReview} />
        </div>
        <div
          className="absolute bottom-0 w-full h-36"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 1), transparent)",
          }}
        ></div>
      </div>

      <div className="container mx-auto mt-72 lg:mt-60">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="w-full pe-5">
              {/* Navbar */}
              <Navbar sections={sections} />

              {/* Sections */}
              <ScrollMotion>
                <section id="about" className="  pt-2">
                  <div
                    className="flex flex-col lg:flex-row gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full lg:w-1/2 mt-5">
                      <h3 className="text-[#173366] mb-3  font-semibold">
                        About
                      </h3>

                      <p className="mt-3  text-gray-600">
                        Sudha Fertility Centre in Karur provides advanced
                        fertility care with experienced fertility specialists,
                        modern treatment options, and personalised care for
                        couples on their journey to parenthood. Our approach
                        centres on understanding each couple's needs and
                        providing the right guidance and treatment based on
                        their medical history and fertility requirements.
                      </p>
                    </div>
                    <div className="w-full lg:w-1/2 mt-5 sm-hidden">
                      <Image
                        src={SudhaAbout}
                        alt="Ambattur"
                        className="w-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                  <motion.div>
                    <p className="mt-3  text-gray-600">
                      With a trusted legacy in fertility care, Sudha Fertility
                      Centre brings its expertise and comprehensive fertility
                      services closer to couples in Karur and surrounding areas.
                      From fertility evaluation and diagnosis to advanced
                      assisted reproductive treatments, our team is committed to
                      supporting couples through every stage of their treatment
                      journey.
                    </p>
                  </motion.div>
                  <motion.div>
                    <p className="mt-3  text-gray-600">
                      The Karur centre offers a range of fertility treatments
                      and related gynaecological services, supported by
                      experienced medical professionals and essential diagnostic
                      and treatment facilities. Our focus is to provide quality
                      fertility care in a supportive and comfortable environment
                      for couples seeking to build their families.
                    </p>
                  </motion.div>

                  <h3 className=" text-[#173366] font-semibold mt-5">
                      Best Fertility Treatments in Karur
                    </h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="mt-3 mb-3 text-gray-600">
                      Sudha Fertility Centre in Karur offers a range of fertility treatments designed to meet the individual needs of couples facing different fertility challenges. Our fertility specialists assess each patient carefully and recommend a suitable treatment based on their medical condition, fertility history and treatment requirements.
                    </p>
                    <h5 className=" text-[#173366] font-semibold mt-5">
                     Our fertility treatment options include:
                    </h5>

                    <ul className="text-md text-gray-600 list-disc pl-4 leading-[2.2]">
                      <li> Normal Delivery: Natural Labour for Mothers</li>
                      <li>IVF: In Vitro Fertilization</li>
                      <li>IUI: Intrauterine Insemination</li>
                      <li>ICSI: Intracytoplasmic Sperm Injection</li>
                      <li> IMSI: Intracytoplasmic Morphologically Selected Sperm Injection </li>
                      <li>TESE - Testicular Sperm Extraction</li>
                      <li>PESA - Percutaneous Epididymal Sperm Aspiration</li>
                      <li>TESE: Testicular Sperm Extraction</li>
                      <li>PESA: Percutaneous Epididymal Sperm Aspiration</li>
                      <li>
                        LAH: Laser Assisted Hatching
                      </li>
                      <li>Ovarian ABCD: Ovarian Rejuvenation using Autologous Blood Cell Derivative</li>
                      <li>FET: Frozen Embryo Transfer</li>
                      <li>Endometrium PRP: Platelet Rich Plasma</li>
                    </ul>
                    <p className="mt-3 text-gray-600">
                      The centre also provides gynaec-related procedures including C-section, laparoscopy, hysteroscopy, SSG, cervical cerclage, cyst and fluid aspiration, myomectomy and ERA. Fertility preservation services are also available based on individual medical requirements.
                    </p>
                    <div className="w-full lg:w-1/2 mt-5 hidden sm-block">
                      <Image
                        src={SudhaAbout}
                        alt="Ambattur"
                        className="w-full object-cover rounded-md"
                      />
                    </div>
                    <h3 className=" text-[#173366] font-semibold mt-5">
                      Why Sudha Fertility Centre is the Best Fertility Centre in Karur?
                    </h3>
                    <p className="text-gray-600 mt-3">
                      Choosing a fertility centre is an important decision, especially when every couple's journey is different. At Sudha Fertility Centre in Karur, we focus on understanding each couple's individual needs and providing care that is appropriate for their fertility journey.
                    </p>
                    <p className="text-gray-600 mt-3">
                      Our experienced fertility specialists, trained medical team, and advanced fertility treatment options allow us to provide comprehensive care under one roof. From diagnosis and counselling to treatment and follow-up, our team supports couples throughout the process.
                    </p>
                    <p className="text-gray-600 mt-3">
                      We believe fertility care is not only about treatment. It is also about listening, explaining every step clearly, and making couples feel supported throughout their journey. At Sudha Fertility Centre in Karur, we strive to provide compassionate care along with the medical expertise and technology needed to help couples move confidently towards parenthood.
                    </p>
                  </motion.div>

                  <hr className="mt-4" />
                </section>
              </ScrollMotion>

              <ScrollMotion>
                <section id="facilities">
                  <motion.div
                    className="flex flex-col lg:flex-row gap-8 mt-5 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full lg:w-1/2 mt-5">
                      <h3 className="text-[#173366]  font-semibold">
                        Facilities
                      </h3>
                      <p className=" text-gray-600 mt-2">
                        Sudha Fertility Centre in Karur combines modern fertility care with a supportive environment designed around the needs of patients. Our facilities support the different stages of fertility evaluation and treatment, while our medical team focuses on providing safe and comfortable care throughout the journey.
                      </p>
                      <h5 className=" text-[#173366] font-semibold mt-5">
                      Our facilities include:
                    </h5>
                      <ul className="text-md text-gray-600 list-disc pl-4 leading-[2.2] mt-3">
                        <li>Fully equipped Diagnostic Services</li>
                        <li>IVF Laboratory</li>
                        <li>State-of-the-art Operation Theatres </li>
                        <li>Supporting Medical Staff </li>
                        <li>Cost-effective Procedures</li>
                        <li>24*7 Medical Care </li>
                      </ul>
                      <p className=" text-gray-600 mt-2">Our aim is to make fertility care convenient and accessible while providing patients with the medical support they need throughout their treatment.</p>
                    </div>
                    <div className="w-full lg:w-1/2 mt-5">
                      <ImageSlider images={Ambattur.Facilities.Facilitiesimg} />
                    </div>
                  </motion.div>
                  <hr className="mt-4 border-gray-300" />
                </section>
              </ScrollMotion>

              <ScrollMotion>
                <section id="specialists">
                  <motion.div
                    className="flex flex-wrap lg:flex-nowrap gap-8 mt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full lg:w-1/2 mt-5">
                      <h3 className="text-[#173366] font-semibold leading-[1.4]">
                        Fertility Specialists <br />
                        in Karur
                      </h3>
                      {/* <h4 className="text-[20px] font-semibold mt-3 leading-[1.4]">
                        Chief Experts of Sudha Fertility Centre in Karur
                      </h4> */}
                      <h4 className="text-[18px] text-[#173366] font-semibold mt-3">
                        Dr.S.Pradeepa Sudhakar.,
                      </h4>
                      <p className="text-md text-[#000000] mt-3">
                        MBBS, DGO, DNB (OG), MNAMS, FICOG Senior Consultant IVF
                        & ART Specialist
                      </p>
                      {/* <p className="text-[#000000] mt-3">
                        Senior Consultant IVF & ART Specialist Senior Faculty FNB (Reproductive Medicine - NBEMS)
                      </p> */}
                      <p className="text-[#000000] mt-3">
                        Vice President - Sudha Hospitals Pvt. Ltd.
                      </p>
                      <p className=" text-gray-600 mt-3 ">
                        Dr. S. Pradeepa Sudhakar is a Senior Consultant IVF and ART Specialist with extensive experience in fertility care and advanced reproductive techniques. She is known for her clinical expertise and patient-focused approach to fertility treatment.

                      </p>
                      <div className="sm-block hidden">
                        <p className="text-md  text-gray-600 mt-3">
                         As Vice President of Sudha Fertility Centre, Dr. Pradeepa has played an important role in the growth and expansion of the organisation. She has been closely involved in establishing more than 40 branches and continues to contribute to the development of fertility care across the network.
                        </p>
                        <p className="text-md  text-gray-600 mt-3">
                          Along with her clinical expertise, Dr. Pradeepa places strong emphasis on counselling and patient support, helping couples understand their treatment options and guiding them through their fertility journey with care and compassion.
                        </p>
                       
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 mt-5">
                      <Image
                        src={Pradeepa}
                        alt="Pradeepa"
                        className="w-full h-auto rounded-xl"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="sm-hidden">
                    <p className="text-md  text-gray-600 mt-3">
                      As Vice President of Sudha Fertility Centre, Dr. Pradeepa has played an important role in the growth and expansion of the organisation. She has been closely involved in establishing more than 40 branches and continues to contribute to the development of fertility care across the network.
                    </p>
                    <p className="text-md  text-gray-600 mt-3">
                      Along with her clinical expertise, Dr. Pradeepa places strong emphasis on counselling and patient support, helping couples understand their treatment options and guiding them through their fertility journey with care and compassion.
                    </p>
                    
                  </motion.div>


                  <hr className="mt-4 border-gray-300" />
                </section>
              </ScrollMotion>

              <ScrollMotion>
                <section id="gallery">
                  <h3 className="text-[#173366] mt-4 font-semibold">Gallery</h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ImageGrid images={Erode.gallery} />
                  </motion.div>

                  <hr className="mt-4 border-gray-300" />
                </section>
              </ScrollMotion>

              <ScrollMotion>
                <section id="location">
                  <motion.div
                    className="flex flex-col lg:flex-row gap-8 mt-5 bg-[#F0F5FF] p-5 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full lg:w-1/2">
                      <h3 className="text-[#173366] font-semibold">Location</h3>
                      <h4 className="font-semibold mt-2">
                        Book Your Free Appointment
                      </h4>
                      <p className="text-gray-600 mt-3">
                        Take the first step towards your parenthood journey.
                      </p>

                      <div className=" rounded-lg space-y-6 mt-5">
                        {/* Phone Section */}
                        <div className="flex items-center lg:space-x-4 sm:space-x-1 space-x-1">
                          <div className="bg-white xl:p-2 lg:p-2 p-1 rounded-full">
                            <IoCallOutline className="text-xl text-black size-3 sm:size-3 xl:size-4 lg:size-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-500">CALL</p>
                            <p className="font-semibold">+91 76-7007-6006</p>
                          </div>
                        </div>
                        <div className="flex items-start lg:space-x-4 sm:space-x-1 space-x-1">
                          <div className="bg-white xl:p-2 lg:p-2 p-1 rounded-full flex items-start justify-start shadow-md">
                            <CiLocationOn className="text-xl text-black size-3 sm:size-3 xl:size-4 lg:size-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-500 uppercase">
                              Address
                            </p>
                            <p className="font-semibold">
                              Sudha Fertility Centre 2/881/1 & 2/881/2, Vadivel Nagar, Erode Main Road, Karur - 639002.
                            </p>
                            <Link href="https://maps.app.goo.gl/dgpaEbyMhXPUiahcA">
                              <button className="button-all mt-4  md:mx-0 md:mr-auto flex items-center gap-2">
                                <p>Get Directions</p>
                                <MdLocationOn size={22} />
                              </button>
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-start lg:space-x-4 sm:space-x-1 space-x-1">
                          <div className="bg-white xl:p-2 lg:p-2 p-1 rounded-full flex items-start justify-start shadow-md">
                            <AiTwotoneMail className="text-xl text-black size-3 sm:size-3 xl:size-4 lg:size-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-500">
                              EMAIL US
                            </p>
                            <p className=" font-semibold">
                              care@sudhahospitals.com
                            </p>
                          </div>
                        </div>

                        {/* Social Media Section */}
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <div className=" rounded-lg shadow-md max-w-sm mx-auto">
                        <div className="relative">
                          <Image
                            src={Hospital}
                            alt="Building"
                            className="rounded-lg w-full"
                            layout="responsive" // Ensures the image is responsive
                            width={700} // Set a default width
                            height={500} // Set a default height
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px" // Define sizes for different breakpoints
                          />
                          {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs flex justify-around items-center p-2 rounded-b-lg">
                            <div className="flex items-center space-x-1">
                              <FaWalking />
                              <span>3D Walk Through</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaMapMarkerAlt />
                              <span>Get Direction</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaShareAlt />
                              <span>Share</span>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>
              </ScrollMotion>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="max-w-md mx-auto  bg-white shadow-lg rounded-lg sticky top-[145px]">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 h-full">
          <section>
            {/* <div className="max-w-2xl mx-auto p-4"> */}
            <h2 className=" font-semibold text-center mb-6">
              Frequently Asked Questions
            </h2>
            {Karur.faqs.slice(0, visibleCount).map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggle={() => toggleFAQ(index)}
              />
            ))}
            {Karur.faqs.length > 5 && ( // Ensure button is shown if there are more than 5 FAQs
              <div className="text-center mt-16">
                <button
                  className="button-all mx-auto"
                  onClick={toggleViewMore} // Updated onClick handler
                >
                  {showAll ? (
                    <div className="flex gap-3 items-center">
                      View Less <IoMdArrowBack />
                    </div>
                  ) : (
                    <div className="flex gap-3 items-center">
                      View More <IoMdArrowForward />
                    </div>
                  )}
                </button>
              </div>
            )}
            {/* </div> */}
          </section>
        </div>
      </div>
      <section>
        {/* <div className="container mx-auto">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 h-full"> */}
        {/* <MarqueeComponent
          items={Karur.gallery}
          direction="left"
          speed="fast"
          className="custom-class"
        />
        <div className="flex justify-center flex-wrap gap-4 items-center mt-4 mb-4">
          <h3 className=" font-semibold text-center ">
            Childless Couples to Happy Parents
          </h3>
          <Buttonbottm
            text="Watch on Youtube"
            link="https://www.youtube.com/@sudhafertilitycentre"
          />
        </div> */}
        {/* <MarqueeComponent
          items={Karur.gallery}
          direction="right"
          speed="fast"
          className="custom-class"
        /> */}
        {/* </div>
          </div> */}
      </section>
    </>
  );
}

export default KarurPage;
