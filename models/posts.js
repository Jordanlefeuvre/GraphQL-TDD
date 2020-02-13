const mongoose = require('mongoose');
/*
 * Option 1: Nested Schema
 * https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/
 */
const AuthorSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String
});
const PostsSchema = new mongoose.Schema({
  _id: String,
  title: String,
  content: String,
  nested: [AuthorSchema],
});

module.exports = {
  posts: mongoose.model('posts', PostsSchema),
};