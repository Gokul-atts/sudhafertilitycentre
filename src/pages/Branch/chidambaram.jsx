"use client";
import React, { useState } from "react";
import BgAbout from "@/assets/branch/ambatur/hospital.webp";
import Calendar from "@/assets/branch/ambatur/callender.svg";
import Image from "next/image";
import Button from "@/components/button";
import SudhaAbout from "@/assets/branch/erode/erode_about.webp";
import { motion } from "framer-motion";
import Pradeepa from "@/assets/branch/ambatur/pradeepa.webp";
import Hospital from "@/assets/branch/chidambaram/chidambaram.webp";
import Vanitha from "@/assets/branch/erode/vanitha.webp";
import Deepeka from "@/assets/branch/erode/deepeka.webp";
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
import { Ambattur, Chidambaram, Coimbatore, Erode } from "@/middleware/imagesroute";
import ScrollMotion from "@/components/animation/scrollMotion";
import BranchForm from "@/components/branchForm";
// import { InfiniteMovingCardsDemo } from "@/components/review_Card/reviewCard";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { erodeVideos } from "@/middleware/videosRoute";
import GallerySlider from "@/components/videoCard/videoPlaylistSlider";
import LoadingSpinner from '@/components/ui/loadingSpinner';
import dynamic from "next/dynamic";
// Dynamic imports with same loading component
const InfiniteMovingCardsDemo = dynamic(
  () => import('@/components/review_Card/reviewCard'),
  { loading: () => <LoadingSpinner height="400px" /> }
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function ChidambaramPage() {
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
      setVisibleCount(Erode.faqs.length); // Show all FAQs
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



  const ErodeReview = [
    {
      quote:
        `We were struggling with infertility for 6 years and had lost all hope. A friend suggested Sudha Fertility Centre in Erode, and we decided to give it a try. From the very first consultation, the doctors were kind, supportive, and extremely knowledgeable. They guided us through every step, making sure we were comfortable. After our first IVF attempt, I got pregnant! We are forever grateful to this amazing team. If you are looking for the Best Fertility Centre in Erode, this is the place!`,
      name: "Gokul Krishnan",
      title: "Patient",
    },
    {
      quote:
        `Sudha Hospital in Erode provides excellent medical care with advanced facilities. The doctors and staff are highly experienced and ensure personalized attention for every patient. Their fertility treatments, maternity care, and general medical services are top-notch. The hospital is well-maintained, clean, and equipped with modern technology.
  
  ✅ Expert Doctors
  ✅ Caring & Supportive Staff
  ✅ Advanced Fertility & Maternity Care
  ✅ Clean & Well-Organized Facility
  
  Highly recommended for anyone looking for quality healthcare in Erode!`,
      name: "Gokul C",
      title: "Patient",
    },
    {
      quote:
        `My friend struggled with infertility for years, but high treatment costs kept her from seeking help. Then she found Sudha Fertility Hospital in Erode, which offered her quality treatment at an affordable cost. She is now pregnant, and I have never seen her happier. If you are looking for an affordable yet highly successful IVF Centre in Erode, Sudha is the best choice. Their treatments are effective, and the success rate is high!`,
      name: "ELGx LM",
      title: "Patient",
    },
    {
      quote:
        "One of my close friends had been trying to conceive for years. They went to Sudha IVF Centre in Erode, and the treatment worked wonders for them. Now, they are happy parents to a beautiful baby. The success rates here are excellent, and the doctors are highly professional. If you need fertility treatment, this is the right place!",
      name: "SHAmjaD",
      title: "Patient",
    },
    {
      quote:
        "I would like to thank sudha fertility centre for continuous support and given best fertility treatment during my friend's parenthood journey. All the doctors and staffs, and their efforts made the whole process so easy, and they are always caring about his wife and explained everything in detail. I would highly recommend this hospital for all kind of fertility treatment. His wife conceived in first attempt of IVF. The best fertility centre ever , Thank you sudha fertility centre erode!",
      name: "Mohammed Shafwan",
      title: "Patient",
    },
    {
      quote:
        "I recommended Sudha Fertility Centre in Erode to my brother and sister-in-law for IVF treatment. Their experience at the hospital was truly wonderful. With the right guidance and constant support, they underwent IVF treatment, and today, they are happy parents. Their words say it all Best Fertility Centre in Erode!",
      name: "Karthik k.s",
      title: "Patient",
    },
    {
      quote:
        "I underwent treatment at Sudha Fertility Centre in Erode. From the very first day, the doctors explained everything clearly. It was very scary, but the advanced treatments here and the high success rate gave me complete confidence. Today, I am a mother, and this is the greatest happiness of my life. Best Fertility Centre in Erode, thank you!",
      name: "Santhiya Sankarapandian",
      title: "Patient",
    },
    {
      quote:
        "I will definitely suggest sudha fertility centre when it comes in fertility treatments. I got positive results from sudha fertility centre Erode, One of my friends suggested this fertility centre to me. I suffered a lot due to my infertility issues. I visited lots of hospitals but all the end results was disappointed me. But, My last try was not wasted my time and money. I am always grateful to Sudha fertility centre in erode. This is the best fertility centre in Tamilnadu I ever visited. They gave me all the supports and care till my delivery. Thank Sudha team. All doctors and staffs, Thank you so much!!!",
      name: "Kavinaya B",
      title: "Patient",
    },
    {
      quote:
        "My brother's daughter had been treated by the Dr.Pradeepa mam, the best doctor ever, I always recommended to all, who are searching for a best fertility treatment. She is very polite ,caring and openly speaks about treatment and suggests the best advices to consider, also the staff and members are good , Thank You Dr.Pradeepa mam and sudha fertility centre.",
      name: "Balakrishnan Rasu",
      title: "Patient",
    },
    {
      quote:
        "First, I thank Sudha fertility centre for all the supports and care. The entire team was helps us during our parenthood journey, each and every process and procedure clearly explained to us. Before we consulting in sudha hospital we thought the whole treatment need huge money and we can't get pregnant. But, after entered into sudha fertility centre erode, we forgot all our worries and happiliy undergoes our treatment without any financial burden. Now, we are pregnant. Thank you the best fertility centre in Erode.",
      name: "Bharath Raj",
      title: "Patient",
    },
    {
      quote:
        "It's been great to give feedback about one of the top class fertility centre in Erode. I am really happy because we were blessed with twin baby. Really thankful to Dr.Pradeepa mam, Dr.Sandhiya Rani mam, Dr.Deepika mam and support staff. All the staffs are very polite and supportive. Special thanks to NICU staffs who are given wonderful care to babies. Pediatrician Doctor Mr.Gowri Shankar sir & Mr.Rangesh sir also rendered almost care to babies after birth. Really i am statisfied with their service.",
      name: "Anguraj K",
      title: "Patient",
    },
    {
      quote:
        "Very good response and treatment given. Y by Dr Pratheeba mam and Hospital service also nice. Car parking facility rest room and all very good. We are Waiting for positive result.",
      name: "Spganesh Kumar",
      title: "Patient",
    },
    {
      quote:
        "One of the best fertility centre in erode . Dr. Pradeepa mam explain everything clam and give hope to us. The staff care too well . Price of the treatment also less than others. Thank u sudha fertility team",
      name: "Karthi Keyan",
      title: "Patient",
    },
    {
      quote:
        `Sudha Mother and Child care hospital is the best in all. Dr.Pradeepa Madam and Dr.Vanitha madam gives utmost care for each and everyone. They are very professional in their approach. The best thing I like about this hospital is that, they do a thorough investigation and understand the real reason for fertility issues and provide the right treatment.
  They take all precautions to ensure healthy pregnancy and will be there with us in every step until the mother and baby are safe back at home. I am thankful that I visited Sudha Mother and Care hospital. I have been recommending this hospital to all in my known circle of family and friends, who are in need of fertility care and will continue to do so.`,
      name: "Sirish kumar",
      title: "Patient",
    },
    {
      quote:
        "I am very happy to taking treatment sudha hospital and following the procedure. We got a positive result. Very Good services doctors and sisters. Thank you doctor pradeepa and deepika mam.  Thank you",
      name: "Radhakrishnan sala",
      title: "Patient",
    },
    {
      quote:
        "My sister came for infertility treatment and married for 5 years.. We came to sudha hospitals last year and start our treatment as soon as earlier and their cooperation and explanation, I'm inspired. We start with full of hope and at the end of i am enjoying my motherhood. Thanks to sudha mother and child care hospitals, doctors (Dr.Pardeepa mam, Dr. Vanitha mam and Dr. Deepika) who gave treatment, employees, reception staffs.",
      name: "Thenmozhi S",
      title: "Patient",
    },
    {
      quote:
        "Very good facility with 24x7 emergency care for children. Never seen such a clean facility in erode. Doctors are providing attention to details.",
      name: "Piranesh V",
      title: "Patient",
    },
    {
      quote:
        "My self Karthika getting pregnancy treatment and delivered twin babies happily after these years.. thanks to the doctors(Dr.vanitha,Dr.Pradeepa and Dr.Deepeka ) and all those staffs for good caring.. Thankyou so much again",
      name: "BOOPATHI RAJA",
      title: "Patient",
    },
    {
      quote:
        `We had a very good experience with Sudha mother and child care for our newborn's delivery. The infrastructure and cleanliness was top notch. It was a great team work pulled by a group of efficient medical professionals that made it possible to see. our baby girl. The below members deserves individual appreciation for their work definitely.
  
  Dr Pradeepa, for her swift decision making and leadership on handling patients
  Dr Saranya who is someone completely filled with optimism and her motivation played a major role
  Dr Vanitha who took continuous care and helped us in each step through clear medical management
  All of their continuous guidance, treatment, support with ever smiling face and positivity had helped us in closing this journey successfully.
  
  Special mention to Dr Deepeka for her motivation, Dr Sathya Lakshmi who helped with target scans, Dr Amutha for her timely interventions in anaesthetics, Dr G Sathish Kumar who pulled the surgery successfully, Dr S Sathish for diabetics consultation, Rajarajeswari for her significant support, Dr Gowrishankar and Dr Rangesh from Pediatrics who helped us child care and all other PG docs.
  
  The billing and reception staff were also kindly enough who helped to get our insurance processed without any hassle.
  
  The major factor that turned our experience better and one that is different from other hospitals would be definitely the staff nurses in inpatient wards. They were extremely empathetic, available 24/7 to support, ready to go the extra mile to help mother and child to feel better. Not even once they shown any signs of disengagement and fully committed to patient care. Would like call out Sisters Nebi,Chithra,Vanitha,Vasantha,Sai,Kabila,Jasmine,Devika,Jeni, Sowmya, Reshma and Nandini from NICU for their incredible work ethics. The housekeeping also did a great job in keeping the environment tidy.
  Probably only area of improvement could be the cafeteria which is a very trivial concern.
  
  Overall it is an excellent setup with effective medical and paramedical staff.`,
      name: "KN Harish",
      title: "Patient",
    },
  ];



  return (
    <>
      <div className="relative min-h-[850px] md:min-h-[600px] lg:min-h-[600px]">
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
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                  >
                    <h2 className="text-[#FFC65C]  font-semibold uppercase">
                      VANAKKAM CHIDAMBARAM
                    </h2>
                    <h1 className="font-bold mt-4">
                      Best Fertility Centre In <br className="hidden sm:block" />
                      <span className="text-[#FDCB58]">Chidambaram</span>
                    </h1>
                    <h2 className="mt-4 text-[22px] leading-[1.6]">
                      Caring for your dreams, guiding you towards parenthood.
                    </h2>
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

         <div className="w-full ">
          <InfiniteMovingCardsDemo reviews={ErodeReview} />
        </div>
        <div
          className="absolute bottom-0 w-full h-36"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 1), transparent)",
          }}
        ></div>
      </div>

    <div className="container mx-auto ">
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
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                  >
                     <div className="w-full lg:w-1/2 mt-5">
                      <h3 className="text-[#173366] mb-2  font-semibold">
                        About
                      </h3>
                      

                      <h2 className="mt-2 text-[#173366] text-[24px] font-semibold">
                        About Sudha Fertility Centre in Chidambaram:
                      </h2>
                      <p className="mt-3 mb-3 text-gray-600">
                        Sudha Fertility Centre in Chidambaram brings specialised fertility care and advanced reproductive treatments closer to couples seeking help to build their families. With experienced fertility specialists and a range of treatment options, the centre provides medical support for different fertility requirements.
                      </p>
                      <p className="mt-3 mb-3 text-gray-600">
                       The fertility team evaluates your medical history and fertility concerns before planning the appropriate course of treatment. From fertility assessment and initial treatment to advanced assisted reproductive procedures, couples can receive guidance and care through the different stages of their treatment.
                      </p>
                    

                    </div>
                    <div className="w-full lg:w-1/2 mt-5 sm-hidden">
                      <Image
                        src={SudhaAbout}
                        alt="Ambattur"
                        className="w-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                  <motion.div>
                      <p className="mt-3 mb-3 text-gray-600">
                       With its expertise in reproductive medicine, Sudha Fertility Centre provides couples in Chidambaram access to comprehensive fertility services supported by modern medical facilities. The focus remains on providing appropriate treatment, clear guidance and continued medical support throughout the fertility journey.
                      </p>

                      <h2 className=" text-[#173366] text-[24px] font-semibold mt-5">
                      Best Fertility Treatments in Chidambaram
                    </h2>

                    <p className="mt-3 mb-3 text-gray-600">
                      At Sudha Fertility Centre in Chidambaram, couples can access a wide range of fertility treatments under one roof. The available options cover different stages of fertility care, from assisted conception procedures to advanced sperm and embryo-related treatments.

                    </p>
                    <p className="mt-3 mb-3 text-gray-600">
                     Our fertility services include:
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ul className="text-md text-gray-600 list-disc pl-4 leading-[2.2]">
                      <li> <b>IVF:</b> In Vitro Fertilization</li>
                      <li><b>IUI:</b> Intrauterine Insemination </li>
                      <li><b>ICSI:</b> Intracytoplasmic Sperm Injection  </li>
                      <li><b>IMSI:</b> Intracytoplasmic Morphologically Selected Sperm Injection </li>
                      <li>
                        <b>TESE:</b> Testicular Sperm Extraction
                      </li>
                      <li> <b>PESA:</b> Percutaneous Epididymal Sperm Aspiration</li>
                      <li><b>LAH:</b> Laser Assisted Hatching</li>
                      <li><b>Ovarian ABCD:</b> Ovarian Rejuvenation using Autologous Blood Cell Derivative</li>
                      <li>
                        <b>FET:</b> Frozen Embryo Transfer
                      </li>
                      <li><b>Endometrium PRP:</b> Platelet Rich Plasma</li>
                    </ul>
                    <p className="mt-3 text-gray-600">
                      The centre also provides gynaecological procedures including C section, laparoscopy, hysteroscopy, SSG, cervical cerclage, cyst and fluid aspiration, myomectomy, ERA and OBS. Fertility preservation procedures are also available based on individual medical requirements.
                    </p>
                    <div className="w-full lg:w-1/2 mt-5 sm-block hidden">
                      <Image
                        src={SudhaAbout}
                        alt="Ambattur"
                        className="w-full object-cover rounded-xl"
                      />
                    </div>
                    <h2 className=" text-[#173366] text-[24px] font-semibold mt-5">
                      Why Choose Sudha Fertility Centre in Chidambaram?
                    </h2>
                    <p className="text-gray-600 mt-3">With a range of fertility treatments, experienced specialists and supporting medical facilities, Sudha Fertility Centre in Chidambaram provides couples with access to comprehensive fertility care in one place.</p>
                    <p className="text-gray-600 mt-3">Our fertility specialists assess each patient's medical and fertility history before recommending the next step. This allows treatment to be planned according to the individual's requirements rather than following a standard approach.</p>
                    <p className="text-gray-600 mt-3">Medical guidance continues beyond the initial consultation. From investigations and treatment planning to procedures and follow-up, our team remains available to guide couples through the different stages of care.</p>
                    <p className="text-gray-600 mt-3">The centre combines Sudha's experience in fertility and reproductive medicine with modern technology and patient-focused care, helping couples in Chidambaram access specialised fertility services closer to home.</p>
                    {/* <p className="text-gray-600 mt-3">
                      Recognised as the best IVF hospital in Erode with the best IVF doctors, we ensure that every couple receives personalised attention. Our goal is to bring joy and fulfilment to families through our dedicated services.
                    </p> */}
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
                      <h2 className="text-[#173366] text-[24px]  font-semibold">
                        Facilities
                      </h2>
                      <h5 className="text-[#173366] text-[24px]  font-semibold">
                        Facilities at Sudha Fertility Centre in Chidambaram
                      </h5>
                      <p className="text-gray-600 mt-3">
                        Sudha Fertility Centre in Chidambaram is equipped to support the medical requirements involved in fertility evaluation and treatment. Diagnostic services, laboratory facilities, operation theatres, and supporting medical services are available to help the medical team manage different stages of patient care.
                      </p>
                      <p className="text-gray-600 mt-3">Our facilities include:</p>
                      <ul className="text-gray-600 list-disc pl-4 leading-[2.2]">
                        <li>State-of-the-art IVF Laboratory </li>
                        <li>Comprehensive Diagnostic Services </li>
                        <li>Supporting Medical Staff </li>
                        <li>Cost-effective Procedures </li>
                        <li>Round-the-clock Pharmacy </li>
                        <li>24/7 Medical Care </li>
                        
                      </ul>
                      <p className="text-gray-600 mt-3">Together, these facilities provide the medical support required during fertility treatment and help patients receive coordinated care throughout their treatment journey.</p>
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
                      <h3 className=" mb-3 text-[24px] text-[#173366] font-semibold leading-[1.4]">
                        Fertility Specialists <br />
                        in Erode
                      </h3>
                      <h3 className="text-[20px] font-semibold mt-2 leading-[1.4]">
                        Chief Experts of Sudha Fertility Centre in Erode
                      </h3>
                      <h4 className="text-[18px] text-[#173366] font-semibold mt-3">
                        Dr.S.Pradeepa Sudhakar.,
                      </h4>
                      <p className="text-md text-[#000000] mt-3">
                        MBBS, DGO, DNB (OG), MNAMS, FICOG Senior Consultant IVF & ART
                      </p>
                      {/* <p className="text-[#000000] mt-3">
                        Senior Consultant IVF & ART Specialist Senior Faculty FNB (Reproductive Medicine - NBEMS)
                      </p> */}
                      <p className="text-[#000000] mt-3">
                        Vice President - Sudha Hospitals Pvt. Ltd.
                      </p>
                      <p className="text-md text-gray-600 mt-3 ">
                        Dr. S. Pradeepa Sudhakar is a Senior Consultant IVF and ART Specialist with extensive experience in fertility care and advanced reproductive techniques. Her clinical work focuses on helping couples understand their fertility concerns and guiding them towards appropriate treatment options.
                      </p>
                      <div className="sm-block hidden">
                        <p className="text-md  text-gray-600 mt-3">
                          Along with her clinical responsibilities, she has played an important role in the growth of Sudha Fertility Centre and its expanding network. She is also recognised for her approach to patient counselling, helping couples understand their treatment journey with greater clarity and confidence.
                        </p>
                        <h3 className="text-[20px] font-semibold mt-4">Awards & Achievements:</h3>
                        <p className="text-md  text-gray-600 mt-3">Dr. S. Pradeepa Sudhakar is associated with leading professional organisations in reproductive medicine and women's health.</p>
                        <ul className="text-gray-600 list-disc pl-4 mt-3 leading-[2.2]">
                          <li>
                            Member of the American Society for Reproductive Medicine (ASRM)
                          </li>
                          <li>Member of ESHRE (European Society of Human Reproduction and Embryology) </li>
                          <li>Lifetime Member of ISAR (Indian Society for Assisted Reproduction)</li>
                          <li> Lifetime Member of the Federation of Obstetrics and Gynaecology Societies of India </li>
                          <li>Faculty Member, International Federation of Fertility Societies </li>

                        </ul>
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
                       Along with her clinical responsibilities, she has played an important role in the growth of Sudha Fertility Centre and its expanding network. She is also recognised for her approach to patient counselling, helping couples understand their treatment journey with greater clarity and confidence.
                    </p>
                    <h3 className="text-[20px] font-semibold mt-4">Awards & Achievements:</h3>
                    <ul className="text-gray-600 list-disc pl-4 mt-3 leading-[2.2]">
                      <li>
                        Member of the American Society for Reproductive Medicine (ASRM)
                      </li>
                      <li>Member of ESHRE (European Society of Human Reproduction and Embryology)</li>
                      <li>Lifetime Member of ISAR (Indian Society for Assisted Reproduction)</li>
                      <li> Lifetime Member of the Federation of Obstetrics and Gynaecology Societies of India </li>
                      <li>Faculty Member, International Federation of Fertility Societies</li>
                    </ul>
                  </motion.div>

                 
              

                  <hr className="mt-4 border-gray-300" />
                </section>
              </ScrollMotion>

              <ScrollMotion>
                <section id="gallery">
                  <h2 className="text-[#173366] text-[24px] mt-4 font-semibold">
                    Gallery
                  </h2>
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
                      <h3 className="text-[#173366] font-semibold">
                        Location
                      </h3>
                      <h4 className="font-semibold mt-2">
                        Book Your Free Appointment
                      </h4>
                      <p className="text-gray-600 mt-3">
                        Start your parenthood journey.
                      </p>

                      <div className="rounded-lg space-y-6 mt-5">
                        {/* Phone Section */}
                        <div className="flex items-center lg:space-x-4 sm:space-x-1 space-x-1">
                          <div className="bg-white xl:p-2 lg:p-2 p-1 rounded-full">
                            <IoCallOutline className="text-xl text-black size-3 sm:size-3 xl:size-4 lg:size-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-500">
                              CALL
                            </p>
                            <p className="font-semibold">
                              <Link href="tel:7670076006">+91 76-7007-6006</Link>
                            </p>
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
                              Sudha Fertility centre, Malaikatti street, Chidambaram - 608001
                            </p>
                            <Link href="https://maps.app.goo.gl/QRnPZGeBBKfqS9aw8">
                              <button className="button-all mt-4 md:mx-0 md:mr-auto flex items-center gap-2">
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
                            <p className="font-semibold">
                              <Link href="mailto:care@sudhahopitals.com">care@sudhahospitals.com</Link>
                            </p>
                          </div>
                        </div>

                        {/* Social Media Section */}
                        {/* <div>
                          <div className="flex items-center mb-2">
                            <div className="w-[20px] border-t border-2 border-black ml-2"></div>
                            <p className="p-1 text-sm sm:text-base md:text-lg font-bold">
                              Connect with us:
                            </p>
                          </div>
                          <div className="flex space-x-4">
                            <Link
                              href="https://www.facebook.com/sudhafertilitycentre"
                              target="_blank"
                            >
                              <FaFacebook className="text-4xl  text-gray-600 bg-white p-2 rounded-full" />
                            </Link>
                            <Link
                              href="https://www.youtube.com/@sudhafertilitycentre"
                              target="_blank"
                            >
                              <FaYoutube className="text-4xl text-gray-600 bg-white p-2 rounded-full" />
                            </Link>
                            <Link
                              href="https://instagram.com/sudhafertilitycentre/"
                              target="_blank"
                            >
                              <FaInstagram className="text-4xl text-gray-600 bg-white p-2 rounded-full" />
                            </Link>
                          </div>
                        </div> */}
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

            <h2 className="font-semibold text-center mb-6">
              Frequently Asked Questions
            </h2>
            {Chidambaram.faqs.slice(0, visibleCount).map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggle={() => toggleFAQ(index)}
              />
            ))}
            {Chidambaram.faqs.length > 5 && ( // Ensure button is shown if there are more than 5 FAQs
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

          </section>
        </div>
      </div>

      <section>
        {/* <div className="container mx-auto">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 h-full"> */}
        {/* <MarqueeComponent
          items={Erode.gallery}
          direction="left"
          speed="fast"
          className="custom-class"
        /> */}

        <GallerySlider items={erodeVideos} />

        <div className="flex justify-center flex-wrap gap-4 items-center mt-4 mb-4">
          <h3 className=" font-semibold text-center ">
            Childless Couples to Happy Parents
          </h3>
          <Buttonbottm text="Watch on Youtube" link="https://www.youtube.com/@sudhafertilitycentre" />
        </div>
        {/* <MarqueeComponent
          items={Erode.gallery}
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

export default ChidambaramPage;
