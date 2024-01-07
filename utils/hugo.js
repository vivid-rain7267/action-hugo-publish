const fs = require('fs');
const path = require('path');

exports.post = {
    title: '',
    date: '',
    content: '',
    type: '',
    tags: [],
    slug: ''
}

exports.createPost = (post, contentFolder = "content") => {
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

    let contentPath = path.join(contentFolder, post.type, post.slug);

    if (!fs.existsSync(contentPath)) {
        fs.mkdirSync(contentPath, { recursive: true });
    }

    fs.writeFileSync(path.join(contentPath, "index.md"), content);
}