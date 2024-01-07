const fs = require('fs');
const path = require('path');

exports.post = {
    title: '',
    date: '',
    content: '',
    type: 'posts',
    tags: [],
    slug: ''
}

exports.createPost = (post, contentFolder = "content") => {
    let contentPath = '';

    let content = `---
            title: ${post.title}
            date: ${new Date(post.date).toISOString()}
            draft: false
            toc: false
            tags: ${JSON.stringify(post.tags)}
            ---

            ${post.content}
        `;

    if (post.type !== 'page') {
        contentPath = path.join(contentFolder, post.type, post.slug);
    } else {
        contentPath = path.join(contentFolder, post.slug);
    }
    
    if (!fs.existsSync(contentPath)) {
        fs.mkdirSync(contentPath, { recursive: true });
    }

    console.log(`Generating ${post.title} with type ${post.type}...`);
    console.log(`Saving to ${contentPath}...`);

    fs.writeFileSync(path.join(contentPath, "index.md"), content.replace(/^\s+/gm, ''));
}