import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const docPath = path.join(process.cwd(), "doc");

export async function getPostData(blog) {
  const fullPath = path.join(docPath, `${blog}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    blog,
    ...matterResult.data,
    contentHtml,
  };
}

export function getPostsPaths() {
  const fileNames = fs.readdirSync(docPath);
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ""),
    };
  });
}