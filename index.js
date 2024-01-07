const core = require('@actions/core');
const github = require('@actions/github');
const { post, createPost } = require('./utils/hugo.js');
const { execSync } = require('child_process');

try {
    const labels = github.context.payload.issue.labels.map(label => label.name);
    const title = github.context.payload.issue.title;
    const body = github.context.payload.issue.body;
    const tags = labels.filter(label => label.startsWith('tag:')).map(label => label.replace('tag:', ''));
    const type = labels.filter(label => label.startsWith('type:')).map(label => label.replace('type:', ''))[0];
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const created_at = github.context.payload.issue.created_at;

    

    post.title = title;
    post.date = created_at
    post.tags = tags;
    post.slug = slug;
    post.content = body;

    if (type !== '' || type !== undefined) {
        post.type = type;
    }

    createPost(post, "content");

    createCommit(post.title);

} catch (error) {
    core.setFailed(error.message);
}

function createCommit(title) {
    execSync('git config --global user.name "Hugo Publish Bot"');
    execSync('git config --global user.email "hugo-publish@github.com"');
    execSync('git add .');
    execSync('git commit -m "New post: ' + title + '"');
}