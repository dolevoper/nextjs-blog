import fs from "fs"
import path from "path"
import matter from "gray-matter"
import remark from "remark"
import remarkHtml from "remark-html"

export const postsDirectory = path.join(process.cwd(), "posts")

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf-8")
        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort((a, b) => {
        return a.date - b.date
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => ({
        params: {
            id: fileName.replace(/\.md$/, "")
        }
    }))
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf-8")
    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(remarkHtml)
        .process(matterResult.content)

    return {
        id,
        contentHtml: processedContent.toString(),
        ...matterResult.data
    }
}