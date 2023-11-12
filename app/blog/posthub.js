"use client";

import { useEffect, useState } from "react";
import PostCard from "./components/postcard";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

function Loading({}) {
  return <h1>Loading...</h1>;
}

export default function PostHub({ allPostsDatas }) {
  const [selected, setSelected] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return <Loading />;
  }
  var k = 0;
  return (
    <div className="flex flex-col m-auto pb-10">
      <motion.div
        className="relative mb-16 basis-full lg:-top-16 text-white bottom-5 [--title-move-to:] lg:[--title-move-to:20%]"
        animate={{ x: "var(--title-move-to)" }}
        transition={{ ease: "anticipate", duration: 2.5 }}
      >
        <h1 className="text-8xl lg:text-7xl font-bold">What's on my mind?</h1>
      </motion.div>

      <AnimatePresence mode="wait">
        <ul
          className="left-[5%] lg:left-10 w-full h-full flex-auto relative flex flex-col lg:flex-row justify-evenly space-y-[13vh] lg:space-x-[10vw] xl:space-x-[13vw] 
                        lg:space-y-0"
        >
          {
          allPostsDatas.map((postData) => (
            <li key={postData.id} className={`relative`}>
              <PostCard
                postData={postData}
                selected={selected}
                setSelected={setSelected}
              ></PostCard>
            </li>
          ))
          }
        </ul>
      </AnimatePresence>
    </div>
  );
}
