'use client'
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import PostCard from "./components/postcard";

function Loading({}) {
    return <h1>Loading...</h1>;
}

export default function PostHub({ allPostsDatas }) {
    const [ selected, setSelected ] = useState("");
    const [ isMounted, setIsMounted ] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    if(!isMounted) {
        return <Loading />
    }
    return (
        <ul className="left-10 w-full h-full flex-auto top-20 relative flex flex-row justify-evenly space-x-[13vw]">
          {allPostsDatas.map((postData) => (
            <li key={postData.id}>
              <PostCard postData={postData} selected={selected} setSelected={setSelected}></PostCard>
            </li>
          ))}
        </ul>
      );
}