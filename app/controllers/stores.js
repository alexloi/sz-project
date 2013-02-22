var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Store = mongoose.model('Store')
  , Product = mongoose.model('Product')
  , Imager = require('imager')
  , url = require('url')
  , randomString = require('randomstring')
  , _ = require('underscore');


exports.new = function(req,res){
    var store = new Store(req.body)
      , user = req.user
      , imagerConfig = require('../../config/imager.js')
      , imager = new Imager(imagerConfig, 'S3');

    imager.upload(req.files.image, function(err, cdnUri, files){
      store.user = req.user;
      console.log('THis is the store: ', store);
      
      if (err) return res.render('400')
        
      if (files.length) {
        store.images = { cdnUri : cdnUri, files : files }
      }

      store.save(function(err,doc){
        console.log('kati paei x');
        if(err){
            console.log('store.save() ERROR : ', err);
            res.redirect('suppliers/dashboard', {error: err.errors.name.type});
            //res.render('suppliers/dashboard', { userEmail: req.user.email, userFirst: req.user.first, error: err.errors.name.type });
            return;
        }else{
            console.log('store.save() response: ', doc)
            user = _.extend(user, {store: doc, first: false});
            user.save(function(err, doc){
                if(err){
                    res.redirect('suppliers/dashboard', {error: 'Currently unavailable'});
                    //res.render('suppliers/dashboard', { userEmail: req.user.email, userFirst: req.user.first, error: 'This function is currently not available' });
                    return;
                }else{
                    req.user = doc; 
                    console.log('req.user, ', req.user);
                    res.redirect('suppliers/dashboard');
                    //res.render('suppliers/dashboard', { userEmail: req.user.email, userFirst: req.user.first, store: store});      
                    return;
                } 
            });
        }
      });

    }, 'product');
}

exports.newProduct = function(req, res){
  var product = new Product(req.body)
    , user = req.user
    , imagerConfig = require('../../config/imager.js')
    , imager = new Imager(imagerConfig, 'S3');
   
   imager.upload(req.files.image, function (err, cdnUri, files) {
        if (err) return res.render('400')
        
        if (files.length) {
          product.images = { cdnUri : cdnUri, files : files }
        }

        // Setup product
        product.user = req.user._id;
    
        console.log("Ta files mas einai:", req.files);

        Store.findOne({_id: req.user.store}).exec(function(err, store){
          if(err){
              console.log('Error newProduct - find store:', err);
              //res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, error: err.errors });
              res.redirect('suppliers/dashboard');
              return;
          }else{
              // Add store to product
              product.store = store._id;
              // Save product
              product.save(function(err, product){
                if(err){
                  console.log('Error newProduct - save:', err, store);
                  //res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, store: store, error: err.errors});
                  res.redirect('suppliers/dashboard');
                  return;
                } else {
                  // Extend store
                  console.log('Saved product', product);
                  console.log('This is the store: ', store);
                  console.log('These are its products ', store.products);
                  console.log('This is its name: ', store.name);
                  store.products.push(product);
                  // Save store
                  store.save(function(err, newStore){
                    if(err){
                      console.log('Error newNewStore - save:', err);
                      //res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, store: store, error: err.errors});
                      res.redirect('suppliers/dashboard');
                      return;
                    } else {
                      Product.find({store: newStore._id}).exec(function(err, products){
                        if(err){
                          console.log('Error products - get:', err);
                          //res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, store: store, error: err.errors});
                          res.redirect('suppliers/dashboard');
                          return;
                        }else{
                          //res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, store: newStore, products:products});
                          res.redirect('suppliers/dashboard?product_id='+product._id);
                          return;    
                        }
                      });
                    }
                  });
                }
              });
           }
        });
   },'product');
}

exports.editProduct = function(req,res){ 
  console.log("EDIT PRODUCT:", req.body);
  console.log("EDIT PRODUCT ID:", req.body.productId);

  Product.findOne({_id: req.body.productId}).execFind(function(err, product){
    if(err){
      console.log('Product not found', err);
      //res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, error: err.errors });
      res.redirect('suppliers/dashboard');
      return;
    }else{
      delete req.body.productId;
      delete req.body._csrf;
    
      console.log('req after', req.body);
      product[0] = _.extend(product[0], req.body);
      console.log("EDITED PRODUCT:", product[0]);      
      product[0].save(function(err, doc){
        if(err){
          //res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, error: err.errors });
          console.log('CANNOT EDIT PRODUCT, ', err);
          res.redirect('suppliers/dashboard');
          return;
        }else{
          console.log('EDITED PRODUCT', doc);
          res.redirect('suppliers/dashboard?product_id='+doc._id);
          return;  
        }
      });
    }
  });

  exports.deleteProduct = function(req,res){ 
  console.log("DELETE PRODUCT:", req.body);
  console.log("DELETE PRODUCT ID:", req.body.productId);

  Product.findOne({_id: req.body.productId}).execFind(function(err, product){
    if(err){
      console.log('Product not found', err);
      //res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, error: err.errors });
      res.redirect('suppliers/dashboard');
      return;
    }else{
      product[0].remove(function(err){
        res.redirect('suppliers/dashboard');
        return;
      });
      delete req.body.productId;
  });
}

