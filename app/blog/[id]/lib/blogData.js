import matter from "gray-matter";
import fs from "fs";
import path from "path";

export function getPostData(id) {
  const folder = path.join(process.cwd(), "app/blog/_content");
  const folderFiles = fs.readdirSync(folder);
  const found = folderFiles.filter((x) => x.includes(id))[0];
  const fullPath = path.join(folder, found);
  const content = fs.readFileSync(fullPath, "utf-8");

  const parseResult = matter(content);
  const parsedObj = {
    id: found.replace(/\.md$/, ''),
    ...parseResult.data,
    content: parseResult.content,
  };
  return parsedObj;
}

export function getAllPostsData() {
  const folder = path.join(process.cwd(), "app/blog/_content");
  const folderFiles = fs.readdirSync(folder);
  const parsedObj = folderFiles.map((filename) => {
    const id = filename.replace(/\.md$/, "");
    const fullPath = path.join(folder, filename);
    const content = fs.readFileSync(fullPath, "utf-8");
    const parsed = matter(content);
    return {
      id: id,
      ...parsed.data,
      content: parsed.content,
    };
  });

  return parsedObj;
}
