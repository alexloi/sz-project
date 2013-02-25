var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Store = mongoose.model('Store')
  , Product = mongoose.model('Product')
  , Postcode = mongoose.model('Postcode')
  , url = require('url')
  , randomString = require('randomstring')

exports.index = function(req, res){
    // Find all products
    Product
    .find()
    .exec(function(err, products){
        if(err){
            console.log('Kala re mlk ise gia ton poutso:', err);
            res.render('customers/index', { error: err.error});
            return;
        }else{
            console.log('Initial:', products);
            Store
            .find()
            .exec(function(err, stores){
              res.render('customers/index', { products: products, stores: stores });
              return;
            });
        }
    });
}

exports.singleProductTmpl = function(req,res){
    res.render('customers/templates/product-single', {product: req.body.product, index:req.body.index});
    return;
}

exports.singleProductDetail = function(req,res){
    console.log('erkoume dame je gamiume');
    res.render('customers/templates/product-detail', {product: req.body.product});
    return;
}

exports.storeCoords = function(req,res){
  console.log('ekama store coords:', req.body)
  Postcode
  .findOne({Postcode:req.body.postcode})
  .exec(function(err,postcode){
    if(err){
      console.log(err);
      console.log('error');
      res.send(400);
    }else{
      res.send({lat: postcode.Latitude, lng: postcode.Longitude});
      return;
    }
    
  });

  return;
}