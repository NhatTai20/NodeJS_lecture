const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CourseSchema = new Schema({
    _id: {type: Number},
    name: {type: String, require: true,},
    description: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    videoId: {type: String, require: true,},
    level: {type: String, maxLength: 255},
    slug: { type: String, slug: 'name', unique: true },
}, {
    _id: false,
    timestamps: true,   
});

//Custom query helpers
CourseSchema.query.sortable = function(req) {
    if(req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        })
    }
    return this;
}

mongoose.plugin(slug);
CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { 
    deleteAt: true,
    overrideMethods: 'all', });


module.exports =  mongoose.model('Course', CourseSchema);