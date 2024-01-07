import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';
import { post , newPost } from './utils/hugo.js';

try {
    const labels = github.context.payload.issue.labels.map(label => label.name);
    const title = github.context.payload.issue.title;
    const body = github.context.payload.issue.body;

    console.log(`Labels: ${labels}`);
    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);

} catch (error) {
    core.setFailed(error.message);
}
