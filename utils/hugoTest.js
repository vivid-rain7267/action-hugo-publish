const { post, createPost } = require('./hugo.js');

post.title = "Hello World";
post.date = new Date().toISOString();
post.tags = ["test", "hugo"];
post.slug = "hello-world";
post.content = "Hello World!";

createPost(post, "content");