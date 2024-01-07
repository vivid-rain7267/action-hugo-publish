import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';
import { post , newPost } from './utils/hugo.js';

try {
    const labels = github.context.payload.issue.labels.map(label => label.name);
    const title = github.context.payload.issue.title;
    const body = github.context.payload.issue.body;
    const tags = labels.filter(label => label.startsWith('tag:')).map(label => label.replace('tag:', ''));
    const type = labels.filter(label => label.startsWith('type:')).map(label => label.replace('type:', ''))[0];
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    if (type === '' || type === undefined) {
        type = 'post';
    }

    console.log(`Labels: ${labels}`);
    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);
    console.log(`Tags: ${tags}`);
    console.log(`Type: ${type}`);
    console.log(`Slug: ${slug}`);

} catch (error) {
    core.setFailed(error.message);
}
