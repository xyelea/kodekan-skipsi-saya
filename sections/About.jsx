"use client";

import { motion } from "framer-motion";
import { TypingText } from "../components/landing_page";

import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}>
      <TypingText title="| Tentang Kodeverse" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white">
        <span className="font-extrabold text-white">Kodeverse</span> adalah ide
        awal dan alasan dibangunnya kodekan, sebuah platform yang akan menjadi{" "}
        <span className="font-extrabold text-white">one stop solution</span>{" "}
        bagi mereka yang ingin belajar ngoding di era pembelajaran daring,
        dimana <span className="font-extrabold text-white">Pengguna</span> dapat
        mempelajari skill - skill baru dengan lebih efisien melalui fitur dan
        alat yang tersedia pada platform,{" "}
        <span className="font-extrabold text-white"> jelajahi</span> apa yang
        kami tawarkan dengan cara scroll kebawah
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
