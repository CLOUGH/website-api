const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const homepageSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String }
});


module.exports =  homepageSchema;
