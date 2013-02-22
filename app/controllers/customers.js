var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Store = mongoose.model('Store')
  , Product = mongoose.model('Product')
  , url = require('url')
  , randomString = require('randomstring')

exports.index = function(req, res){
    // Find all products
    Product
    .find()
    .exec(function(err, doc){
        if(err){
            console.log('Kala re mlk ise gia ton poutso:', err);
            res.render('customers/index', { error: err.error});
            return;
        }else{
            console.log('Initial:', doc);
            res.render('customers/index', { products: doc });
            return;
        }
    });
}

exports.singleProductTmpl = function(req,res){
    res.render('customers/templates/product-single', {product: req.body.product, index:req.body.index});
    return;
}