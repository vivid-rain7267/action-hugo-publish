import fs from "fs";
import path from "path";

export const post = {
    title: '',
    date: '',
    content: '',
    type: '',
    tags: [],
    slug: ''
}

export const createPost = (post, contentFolder = "content") => {
    console.log(`Generating ${post.title}...`);

    let content = `---
            title: ${post.title}
            date: ${new Date(post.date).toISOString()}
            draft: false
            toc: false
            tags: ${JSON.stringify(post.tags)}
            ---

            ${post.content}
        `;

    let path = path.join(contentFolder, post.type, post.slug);

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }

    fs.writeFileSync(path.join(path, "index.md"), content);
}