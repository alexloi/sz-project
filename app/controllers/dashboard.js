var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Store = mongoose.model('Store')
  , Product = mongoose.model('Product')
  , url = require('url')
  , randomString = require('randomstring')

  , _ = require('underscore');

exports.index = function(req,res){
    // If user has a store
    if(req.user.store){
        // Get the store
        Store.findOne({_id: req.user.store}).exec(function(err, store){
            if(err){
                console.log('Error index dashboard:', err);
                res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, error: err.errors });
                return;
            }else{
                console.log('The store:', store);
                if(store.products && store.products.length > 0){
                  // Find products for this store
                  Product.find({store: store._id}).execFind(function(err, products){
                    if(err){
                      console.log('Error index dashboard:', err);
                      res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, store: store, error: err.errors });
                      return;
                    } else {
                      console.log('Found products:', products);
                      var params = url.parse(req.url, true);
                      console.log('params', params);

                      if(params.query.product_id){
                        console.log('ivra params', params)
                        res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, store: store, products: products, selected: params.query.product_id });
                      }else{
                        res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, store: store, products: products, selected: products[0]._id });
                      }
                      return;

                    }
                  });
                } else {
                  res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, store: store});
        
                  return;
                }
            }
        });
    }
	else res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first } );
	
  return;	
}