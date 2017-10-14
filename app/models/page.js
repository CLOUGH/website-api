let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PageSchema = new Schema({
    title: String,
    homePage: Boolean,
    slug: {
        type: String,
        index: { unique: true }
    },
    header: new Schema({
        type: {
            type: String,
            required: true
        },
        heading: {
            type: String,
            required: false
        },
        message: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false,
        }
    }, { strict: false }),
    content: new Schema({

    }, { strict: false }),
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Page', PageSchema);