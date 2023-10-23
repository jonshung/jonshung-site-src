"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function SolidWhiteContainer({ children, postData, selected, setSelected }) {
  var initialData = { opacity: 0.65, x: "0%" };
  if (selected != "") {
    if (postData.id != selected) initialData = false;
  }

  var animateDataSelected = {
    opacity: 1,
    x: "10%",
    scale: 1.2,
    width: 400,
  };

  const variants = {
    visible: {
      opacity: 1,
      x: "10%",
    },
    hidden: { opacity: 0 },
  };

  return (
    <Link href={`/blog/${postData.id}`}>
      <motion.div
        variants={variants}
        key={postData.id}
        initial={{ opacity: 0, x: "-20%" }}
        animate={
          selected != ""
            ? selected == postData.id
              ? "visible"
              : "hidden"
            : "hidden"
        }
        whileInView={initialData}
        viewport={{ once: true }}
        whileHover={animateDataSelected}
        whileFocus={animateDataSelected}
        onHoverEnd={(e) => {
          setSelected("");
        }}
        onHoverStart={(e) => {
          if (selected == "") setSelected(postData.id);
        }}
        transition={{ duration: 0.8, ease: "anticipate" }}
        className={`relative flex flex-col pointer-events-auto w-[330px] h-[450px] max-h-full max-w-[500px] items-center bg-white shadow-white/[.1] 
                     shadow-xl drop-shadow-lg backdrop-blur-lg`}
      >
        {children}
        <motion.div
          initial={{ y: 20 }}
          variants={variants}
          whileHover={ { y: 0}}
          transition={{ ease: "anticipate", duration: 0.8 }}
          className={`absolute flex px-7 font-bold text-xl top-[98%] left-[56.9%] h-[70px] w-[157px] items-center bg-white shadow-red/[.6] shadow-lg`}
        >
          View more
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function PostCard({ postData, selected, setSelected }) {
  selected = typeof selected == undefined ? "" : selected;
  return (
    <AnimatePresence>
      <SolidWhiteContainer
        postData={postData}
        selected={selected}
        setSelected={setSelected}
      >
        <div className="absolute h-[23rem] top-10 -left-[150px] w-64">
          <Image
            className="absolute flex object-cover"
            src={postData.cover}
            fill
            alt="HCMUS"
          ></Image>
          <div className="absolute w-full h-full bg-gradient-to-b from-black/[.3] to-black flex content-center">
            <h1 className="font-bold text-6xl text-white place-self-end mb-5">
              {postData.title}
            </h1>
          </div>
        </div>
        <div className="w-[60%] h-[100%] ml-36 mt-10 mr-10 relative pb-8">
          <p
            className="text-left line-clamp-[15]"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </SolidWhiteContainer>
    </AnimatePresence>
  );
}
