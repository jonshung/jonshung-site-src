"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function BackgroundFilter({ isOpen }) {
  const style = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "easeInOut",
      },
    },
    close: {
      opacity: 0,
      transition: {
        duration: 1,
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };
  return (
    <motion.div
      variants={style}
      initial={{ opacity: 0 }}
      className={`fixed w-full z-[1] h-full bg-black/[.4] backdrop-blur-sm`}
    />
  );
}

export function SideBar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "close"}
      className="relative flex z-[4]"
    >
      <BackgroundFilter isOpen={isOpen} />
      <ReferenceList isOpen={isOpen} />
      <OuterBar openHook={setOpen} />
    </motion.div>
  );
}

function ReferenceList({ isOpen }) {
  const sidebar = {
    open: {
      width: "6vw",
      transition: {
        type: "spring",
        stiffness: 100,
        restDelta: 2,
      },
    },
    close: {
      width: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };
  const items = {
    open: {
      opacity: 1,
      transition: {
        type: "easeInOut",
      },
    },
    close: {
      opacity: 0,
      transition: {
        opacity: {
          duration: 0.2,
          type: "easeInOut",
        },
      },
    },
  };

  // Todo: Credit SVG from Icon8

  return (
    <motion.div
      variants={sidebar}
      className={`relative z-[3] h-full bg-[#ECE3CE] transition ease-in-out`}
    >
      <motion.ul
        variants={items}
        className="h-full relative left-5 grid grid-flow-row justify-items-center space-y-32 items-center grid-cols-1"
      >
        <ReferenceItem
          icon="/icons/facebook.svg"
          alt="facebook"
          link="https://www.facebook.com/jonshung.g/"
        />
        <ReferenceItem
          icon="/icons/linkedin.svg"
          alt="LinkedIn"
          link="https://www.linkedin.com/in/jonshung/"
        />
        <ReferenceItem
          icon="/icons/instagram.svg"
          alt="Instagram"
          link="https://www.instagram.com/kh_wanderingshow/"
        />
        <ReferenceItem
          icon="/icons/github.svg"
          alt="Github"
          link="https://github.com/jonshung"
        />

        <li className="absolute w-full flex place-content-center font-extralight text-sm justify-self-end bottom-2">
          Icons by&nbsp;<Link className="hover:underline hover:underline-offset-2" href="https://icons8.com/"> Icons8</Link>
        </li>
      </motion.ul>
    </motion.div>
  );
}

function ReferenceItem({ icon, alt, link }) {
  return (
    <motion.li className="w-[35px] h-[35px]">
      <Link href={link}>
        <Image
          src={icon}
          sizes="100vw"
          width={25}
          height={25}
          alt={alt}
          priority={true}
        />
      </Link>
    </motion.li>
  );
}

function OuterBar({ isOpen, openHook }) {
  const toggleStyle = {
    open: {
      rotate: 180,
      transition: {
        type: "spring",
        stiffness: 100,
        restDelta: 2,
      },
    },
    close: {
      rotate: 0,
      transition: {
        opacity: {
          duration: 0.5,
        },
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };
  return (
    <div className="relative z-[2] w-16 bg-[#ECE3CE] h-full grid grid-flow-col justify-items-center grid-cols-1">
      <motion.div
        className="relative self-center cursor-pointer"
        initial={false}
        variants={toggleStyle}
      >
        <Image
          onClick={() => openHook((vl) => !vl)}
          src="/media/more-svgrepo-com.svg"
          width={30}
          height={30}
          alt="more"
        />
      </motion.div>
    </div>
  );
}
