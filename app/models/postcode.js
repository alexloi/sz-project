var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* SCHEMA DEFINITION */
var PostcodeSchema = new Schema({
    Postcode: {type: String, default: '', trim: true}
  , Latitude: {type: Number}
  , Longitude: {type: Number}
  , Easting: {type: Number}
  , Northing: {type: Number}
  , GridRef: {type: String}
  , County: {type: String}
  , District: {type: String}
  , Ward: {type: String}
  , DistrictCode: {type: String}
  , WardCode: {type: String}
  , Country: {type: String}
  , CountyCode: {type: String}
});

/* VALIDATION FUNCTIONS */
/*
ProductSchema.path('name').validate(function (name) {
  return name.length > 0;
}, 'Product name cannot be blank');
*/
/* MODEL DEFINITION */
mongoose.model('Postcode', PostcodeSchema);