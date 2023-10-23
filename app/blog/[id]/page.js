import Image from "next/image";
import { BackdropBlurContainer } from "../../layout";
import { getPostData, getPostsPaths } from "./lib/blogPosts";

export async function generateStaticParams() {
  const paths = getPostsPaths();
  return paths;
}

export default async function blogPage({ params }) {
  const blogData = await getPostData(params.id);
  return (
    <BackdropBlurContainer>
      <div className="relative flex h-24 w-full justify-center rounded-xl bg-cover">
        <div className="absolute flex h-[120px] w-[120px] items-center justify-center rounded-full border-[10px] border-white/0 backdrop-blur-md bg-white/0 overflow-hidden">
          <Image
            className="relative h-full w-full object-cover"
            src="/media/images/profile_picture.jpg"
            sizes="100vw"
            fill
            alt="Jons Hung"
            priority={true}
          />
        </div>
      </div>
      <div className="mt-7 flex flex-col items-center">
        <h4 className="text-xl font-bold text-white">Jons Hung</h4>
      </div>
      <h2 className="mt-2 flex flex-col mb-1 items-center text-2xl font-bold text-white">
        <span>Blog</span>
      </h2>
      <div className="w-full relative justify-center items-center">
        <div className="text-center text-xl text-white"> {blogData.title} </div>
        <div className="text-center text-lg mb-4 text-white font-thin italic">
          {" "}
          {blogData.date}{" "}
        </div>
        <div className="relative flex justify-center p-5 bg-white indent-7 m-auto rounded-xl max-w-[85%]">
          <div
            className="text-justify font-normal indent-7"
            dangerouslySetInnerHTML={{ __html: blogData.contentHtml }}
          />
        </div>
      </div>
    </BackdropBlurContainer>
  );
}
