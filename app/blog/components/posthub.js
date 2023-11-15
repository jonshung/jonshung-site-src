"use client";

import { useEffect, useState } from "react";
import PostCard from "./postcard";
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

  var comps = allPostsDatas.map((postData) => (
    <li key={postData.id} className={`relative`}>
      <PostCard
        postData={postData}
        selected={selected}
        setSelected={setSelected}
      ></PostCard>
    </li>
  ));
  comps = comps.slice(0, 3);

  var k = 0;
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col">
        <motion.div
          className="relative flex place-content-center text-white [--title-move-from:-10%] lg:[--title-move-to:0%]"
          initial={{ x: "var(--title-move-from)" }}
          animate={{ x: "var(--title-move-to)" }}
          transition={{ ease: "anticipate", delay: 0.4, duration: 1 }}
        >
          <h1 className="relative text-center text-[10vw] break-words lg:text-[4vw] font-bold">
            What's on my mind?
          </h1>
        </motion.div>

          <ul
            className="relative flex flex-col lg:flex-row justify-evenly space-y-[13vh] lg:space-x-[10vw] xl:space-x-[13vw] 
                        lg:space-y-0"
          >
            {comps}
          </ul>
      </div>
    </div>
  );
}
