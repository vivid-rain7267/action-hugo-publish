import fs from "fs";
import path from "path";

export const post = {
    title: '',
    date: '',
    content: '',
    type: ''
}

const generatePosts = (posts) => {
    posts.forEach(element => {
        console.log(`Generating ${element.title}...`);
        let destination = path.join('content', 'posts', element.slug);
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }

        let content = `---
            title: ${element.title}
            date: ${new Date(element.created_at).toISOString()}
            draft: false
            toc: false
            ---

            ${element.html}
        `;

        let fileName = path.join(destination, 'index.html');
        fs.writeFileSync(fileName, content.replace(/^\s+/gm, ''));
    });
};

export const newPost = (post) => {
    let content = `---
            title: ${post.title}
            date: ${new Date(post.date).toISOString()}
            draft: false
            toc: false
            ---

            ${post.content}
        `;

    return content;
}