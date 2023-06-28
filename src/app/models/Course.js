const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
//mongoose.plugin(slug);
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const CourseSchema = new Schema({

    name: { type: String, maxLength: 255, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String },

},
    {

        timestamps: true,
    }
);
//Add plugin
// CourseSchema.plugin(AutoIncrement);
//Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        })
    }
    return this;
}

CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);