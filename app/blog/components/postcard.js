"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

function SolidWhiteContainer({ children, postData, selected, setSelected }) {
  const compRef = useRef(-1);

  var initialData = { opacity: 1, x: "0%" };
  if (selected != -1) {
    if (postData.id != selected) initialData = false;
  }
  var fallbackState = { 
    opacity: 0, 
    x: "-20%",
    transition: {
      duration: 0.8,
      ease: "anticipate"
    }
  }

  var animateDataSelected = {
    width: "var(--select-scale-to)",
    transition: {
      duration: 1.5,
      ease: "anticipate",
      delay: 0.3,
    },
  };
  const visible = {
    zIndex: [null, 100],
    zIndex: 5,
    opacity: 1,
    x: "0%",
    transition: {
      duration: 0.8,
      ease: "anticipate",
      times: [0, 1]
    },
  };
  const hidden = {
    zIndex: 0,
    opacity: 0.3,
    y: "30%",
    x: 0,
  };

  const getAnimate =
    selected != -1 ? (selected == postData.id ? visible : hidden) : visible;

  var x = window.innerWidth / 2;
  var offsetCenter = 0;
  if (compRef.current != -1) {
    offsetCenter = x - compRef.current.getBoundingClientRect().x;
  }
  if (selected == postData.id) animateDataSelected.x = offsetCenter * 0.65;
  else animateDataSelected.x = 0;

  return (
    <motion.div
      ref={compRef}
      onHoverStart={() => {
        if (selected == -1) setSelected(postData.id);
        else selected = -1;
      }}
      onHoverEnd={() => {
        setSelected(-1);
      }}
      key={postData.id}
      initial={fallbackState}
      animate={getAnimate}
      whileHover={animateDataSelected}
      whileFocus={animateDataSelected}
      transition={{ duration: 0.8, ease: "anticipate" }}
      className={`relative flex flex-col pointer-events-auto w-[200px] h-[250px] md:w-[300px] md:h-[300px] xl:w-[350px] xl:h-[450px] max-h-full items-center bg-white shadow-white/[.1] 
                     shadow-xl drop-shadow-xl [--select-scale-to:230px] md:[--select-scale-to:400px] xl:[--select-scale-to:800px]`}
    >
      {children}
      <Link href={`/blog/${postData.id}`} prefetch={true}>
        <motion.div
          initial={{ opacity: 0.5, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ ease: "anticipate", duration: 0.5 }}
          className={`absolute flex px-0 xl:px-7 font-bold text-md xl:text-xl top-[90%] left-[40%] xl:left-[40%] h-[20%] w-[70%] max-h-[50px] max-w-[110px] xl:max-h-[70px] xl:max-w-[170px] text-center justify-center items-center bg-white shadow-black shadow-sm z-[100]`}
        >
          View more
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function PostCard({ postData, selected, setSelected }) {
  selected = typeof selected == undefined ? -1 : selected;
  return (
    <div className="relative w-full h-full">
      <SolidWhiteContainer
        postData={postData}
        selected={selected}
        setSelected={setSelected}
      >
        <div className={"absolute h-[80%] top-10 -left-[40%] w-[70%] max-w-[500px]"}>
          <Image
            className={"absolute flex object-cover"}
            src={postData.cover}
            fill
            alt="HCMUS"
          ></Image>
          <div className="absolute w-full h-full bg-gradient-to-b from-black/[.3] to-black flex content-center">
            <h1 className="font-bold text-3xl xl:text-6xl text-white place-self-end mb-5">
              {postData.title}
            </h1>
          </div>
        </div>
        <div className="w-[60%] h-[100%] ml-24 mt-5 mr-10 md:ml-36 xl:ml-36 xl:mt-10 xl:mr-10 relative pb-16">
          <p
            className="text-left line-clamp-[9] xl:line-clamp-[15] text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>
      </SolidWhiteContainer>
    </div>
  );
}
