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
var StoreSchema = new Schema({
    name: {type: String, default: '', trim: true}
  , user: {type : Schema.ObjectId, ref : 'User'}
  , products: [{type : Schema.ObjectId, ref : 'Product'}]
  , tags: {type: [], get: getTags, set: setTags}
  , images: [{cdnUri: String, files: [] }]
  , address: {type: String}
  , city: {type: String}
  , postCode: {type: String}
  , categories: []
  , createdAt: {type: Date, default: Date.now}
});

/* VALIDATION FUNCTIONS */

StoreSchema.path('name').validate(function (name) {
  return name.length > 0;
}, 'Store name cannot be blank');

StoreSchema.path('postCode').validate(function (postCode){
  return postCode.length > 0;
}, 'Postcode cannot be blank');

/* MODEL DEFINITION */
mongoose.model('Store', StoreSchema);
