import { getAllPosts, getPost } from "../../../../components/firebase";
import matter from "gray-matter";

export async function getAllPostsData() {
  const rawFetch = getAllPosts();
  const parsedObj = (await rawFetch).map((item) => {
    const parseResult = matter(item.raw);
    return {
      ...parseResult.data,
      content: parseResult.content,
      id: item.id,
    }
  });
  return parsedObj;
}