import { getPostData } from "./lib/blogData.js";
import Image
 from "next/image";
export default function blogPage({ params }) {
  const postData = getPostData(params.id);

  return (
    <div className="relative flex w-full h-full flex-col justify-center items-center pt-10 pb-10">
      <div className="absolute w-[50%] h-32 overflow-hidden m-0 rounded-md">
        {postData.cover ? (
          <Image
            className={"object-cover"}
            src={postData.cover}
            fill
            alt=""
          />
        ) : (
          <></>
        )}
      </div>
      <h1 className="text-6xl text-[#ECE3CE]">
        {postData.title ? postData.title : ""}
      </h1>
      {postData.date ? <h2>{postData.date}</h2> : <></>}
      <div
        className="w-[90%] grow text-md text-[#ECE3CE]"
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
    </div>
  );
}
