"use client";
import { useTypewriter } from "./hook/typing";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function homePage() {
  const isDoneTypewriter1 = useRef(false);
  const isDoneTypewriter2 = useRef(false);

  const placeholder1 = "Hello there, \n";
  const placeholder2 = "<Jons> here.";
  const helloText = useTypewriter(
    placeholder1,
    100,
    1000,
    isDoneTypewriter1,
    true
  );
  const nameText = useTypewriter(
    placeholder2,
    100,
    100,
    isDoneTypewriter2,
    isDoneTypewriter1.current
  );

  return (
    <div className="w-full h-full flex flex-row">
      <div className="relative w-[var(--intro-width)] h-full bg-[#739072]">
        <h1 className="relative left-16 top-64 text-[#2f3f2f] whitespace-pre-wrap">
          <span className=" text-[70px] ">{helloText}</span>
          <span className=" text-[110px] ">{nameText}</span>
        </h1>
      </div>
      <div className="relative flex flex-1 w-[calc(100vh-var(--intro-width))] h-full border-t-[2px] border-[#3A4D39]">
        <div className="grow">
          <div className="relative block h-full bg-[#ECE3CE]">
            <AnimatedProfile shouldFire={isDoneTypewriter2.current} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedProfile({ shouldFire }) {
  const pictureVariant = {
    done: {
      scale: 1,
      opacity: 1,
      visibility: "visible",
      x: 0,
      transition: {
        duration: 0.5,
        ease: "anticipate",
        scale: {
          duration: 0.1,
          type: "spring",
          stiffness: 100,
          restDelta: 0,
        },
        x: {
          type: "spring",
          stiffness: 200,
          mass: 10,
          damping: 30,
        },
      },
    },
    hold: {
      scale: 0.7,
      opacity: 0,
      visibility: "hidden",
      x: 100,
    },
  };
  const blogButtonVariant = {
    done: {
      opacity: 1,
      visibility: "visible",
      y: 0,
      transition: {
        duration: 0.5,
        ease: "anticipate",
        y: {
          type: "spring",
          stiffness: 200,
          damping: 30,
        },
      },
    },
    hold: {
      opacity: 0,
      visibility: "hidden",
      y: 100,
    },
  };
  return (
    <motion.div
      animate={shouldFire ? "done" : "hold"}
      className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center"
    >
      <motion.div
        initial={false}
        variants={pictureVariant}
        className="relative h-[250px] w-[250px] rounded-full overflow-hidden"
      >
        <Image
          className="h-full w-full object-cover"
          src="/media/images/profile_picture.jpg"
          sizes="100vw"
          fill
          alt="Jons Hung"
          priority={true}
        />
      </motion.div>
      {/* <motion.div
        className="flex flex-col justify-center items-center"
        initial={false}
        variants={blogButtonVariant}
      >
        <span className="mt-10 text-[#3A4D39] font-bold underline underline-offset-[16px]">
          Care to find out more?
        </span>
        <motion.div className="mt-8 "
        initial={false}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.5, ease: "anticipate" }}>
          <Link
            href="/blog"
            className="relative w-[120px] h-12 bg-[#2f3f2f] shadow-[1px_1px_4px_0_#2f3f2f] flex justify-center items-center"
          >
            <span className="text-[#ECE3CE] font-semibold">My blog</span>
          </Link>
        </motion.div>
  </motion.div> */}
    </motion.div>
  );
}
