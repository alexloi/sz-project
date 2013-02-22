var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* HELPER FUNCTIONS */
var getTags = function (tags) {
  return tags.join(',');
}

var setTags = function (tags) {
  return tags.split(',');
}

/* SCHEMA DEFINITION */
var ProductSchema = new Schema({
    name: {type: String, default: '', trim: true}
  , user: {type: Schema.ObjectId, ref : 'User'}
  , store: {type: Schema.ObjectId, ref: 'Store'}
  , tags: {type: [], get: getTags, set: setTags}
  , images: [ {cdnUri: String, files: [] } ]
  , price: {type: Number, default: 0}
  , description: {type: String}
  , specifics: {type: String}
  , made_from: {type: String}
  , quantity: {type: Number, default: 0}
  , status: {type: String, default: 'active'}
  , categories: []
  , createdAt: {type: Date, default: Date.now}
});

/* VALIDATION FUNCTIONS */
/*
ProductSchema.path('name').validate(function (name) {
  return name.length > 0;
}, 'Product name cannot be blank');
*/
/* MODEL DEFINITION */
mongoose.model('Product', ProductSchema);