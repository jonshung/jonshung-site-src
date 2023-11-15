"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

function SolidWhiteContainer({ children, postData, selected, setSelected }) {
  const compRef = useRef(null);

  var fallbackState = {
    opacity: 0,
    x: "-20%",
    transition: {
      duration: 0.8,
      ease: "anticipate",
    },
  };

  var animatePostSelected = {
    width: "var(--select-scale-to)",
    transition: {
      duration: 1.5,
      ease: "anticipate",
      delay: 0.3,
    },
  };

  const containerVariants = {
    visible: {
      zIndex: 3,
      opacity: 1,
      x: "0%",
      transition: {
        zIndex: {
          delay: 0.5,
        },
        duration: 0.8,
        ease: "anticipate",
        times: [0, 1],
      },
    },
    hidden: {
      zIndex: -1,
      opacity: 0.3,
      y: "30%",
      x: 0,
    },
  };

  const getAnimate = (selected != -1 && selected != postData.id) ? "hidden" : "visible";

  var x = window.innerWidth / 2;
  var offsetCenter = 0;
  if (compRef.current != null) {
    offsetCenter = x - compRef.current.getBoundingClientRect().x;
  }

  if (selected == postData.id) animatePostSelected.x = offsetCenter * 0.65;
  else animatePostSelected.x = 0;

  const isMobile = /Mobi/i.test(window.navigator.userAgent);
  const mobileStyle = "w-[197px] h-[230px] [--select-scale-to:330px]";
  const mdStyle = "md:w-[231px] md:h-[270px] md:[--select-scale-to:400px]";
  const xlStyle = "xl:w-[300px] xl:h-[350px] xl:[--select-scale-to:800px]";

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
      variants={containerVariants}
      initial={false}
      animate={!isMobile ? getAnimate : {}}
      whileHover={!isMobile ? animatePostSelected : {}}
      whileFocus={!isMobile ? animatePostSelected : {}}
      transition={{ duration: 0.8, ease: "anticipate" }}
      className={`relative flex flex-col pointer-events-auto ${mobileStyle} ${mdStyle} ${xlStyle} max-h-full items-center bg-[#ECE3CE] rounded-lg`}
    >
      {children}
      <Link href={`/blog/${postData.id}`} prefetch={true}>
        <motion.div
          initial={{ opacity: 0.5, scale: 1, y: 5 }}
          whileHover={{ opacity: 1, scale: 1.2, y: 0 }}
          transition={{ ease: "anticipate", duration: 0.5 }}
          className={`absolute flex px-0 xl:px-7 font-bold text-md xl:text-xl top-[90%] left-[40%] xl:left-[40%] h-[20%] w-[70%] max-h-[50px] max-w-[110px] 
          xl:max-h-[70px] xl:max-w-[170px] text-center justify-center items-center bg-[#ECE3CE] z-[5]`}
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
        <div
          className={
            "absolute h-[80%] top-10 -left-[50%] w-[70%] max-w-[500px]"
          }
        >
          {postData.cover ? (
            <Image
              className={"absolute flex object-cover"}
              src={postData.cover}
              sizes="100vw"
              fill
              alt=""
            />
          ) : (
            <></>
          )}
          <div className="absolute w-full h-full bg-gradient-to-b from-black/[.3] to-black flex content-center">
            <h1 className="font-bold text-3xl xl:text-6xl text-white place-self-end mb-5">
              {postData.title ? postData.title : ""}
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
