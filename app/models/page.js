let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PageSchema = new Schema({
    title: String,
    homePage: Boolean,
    slug: {
        type: String,
        index: { unique: true }
    },
    heading: new Schema({
        type: {
            type: String,
            required: true
        },
        title: {
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

    sections: [],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now,
    }
});

PageSchema.pre('save', function (next) {
    var self = this;

    if (self.homePage == true) {
        this.model('Page').update({ homePage: true, _id: { $ne: this._id } }, { homePage: false }, { multi: true })
            .then(function () {
                console.log('Changed existing home page to not be home page')
                next();
            }, function () {
                console.error('An error has ocurred while trying to change the previous active')
                next();
            })
    }
    else {
        next();
    }
})

module.exports = mongoose.model('Page', PageSchema);