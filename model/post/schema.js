const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  status: String,
  excerpt: String
}, {
  timestamps: true
});


module.exports = postSchema;
