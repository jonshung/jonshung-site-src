import PostHub from "./posthub";
import { getPostsPaths, getPostData } from "./[id]/lib/blogPosts";

export default async function blogHub() {
  const allPostsPaths = getPostsPaths();
  const allPostsDatas = await Promise.all(
    allPostsPaths.map(async (postId) => {
      return await getPostData(postId.id);
    })
  );

  return (
    <PostHub allPostsDatas={allPostsDatas} />
  )
}
