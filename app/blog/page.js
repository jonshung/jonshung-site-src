import PostHub from "./posthub";
import { getAllPostsData } from "./[id]/lib/blogPosts";

export default async function blogHub() {
  const allPostsDatas = await getAllPostsData();
  return (
    <PostHub allPostsDatas={allPostsDatas} />
  )
}
