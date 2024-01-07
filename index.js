import * as core from '@actions/core';
import * as github from '@actions/github';
import { post , createPost } from './utils/hugo.js';
import * as execSync from 'child_process';

try {
    const labels = github.context.payload.issue.labels.map(label => label.name);
    const title = github.context.payload.issue.title;
    const body = github.context.payload.issue.body;
    const tags = labels.filter(label => label.startsWith('tag:')).map(label => label.replace('tag:', ''));
    const type = labels.filter(label => label.startsWith('type:')).map(label => label.replace('type:', ''))[0];
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const created_at = github.context.payload.issue.created_at;

    if (type === '' || type === undefined) {
        type = 'posts';
    }

    post.title = title;
    post.date = created_at
    post.tags = tags;
    post.slug = slug;
    post.content = body;

    createPost(post, "content");

    createCommit(post.title);

} catch (error) {
    core.setFailed(error.message);
}

const createCommit = (title) => {
    execSync('git config --global user.name "Hugo Publish Bot"');
    execSync('git config --global user.email "hugo-publish@github.com"');
    execSync('git add .');
    execSync('git commit -m "New post: ' + title + '"');
}