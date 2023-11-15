import PostHub from "./components/posthub";
import { getAllPostsData } from "./[id]/lib/blogData";

export default async function BlogHub() {
  const allPostsDatas = getAllPostsData();
  return (
    <PostHub allPostsDatas={allPostsDatas} />
  )
}
