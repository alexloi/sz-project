var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Store = mongoose.model('Store')
  , url = require('url')
  , randomString = require('randomstring')
  , _ = require('underscore');


exports.new = function(req,res){
    var store = new Store(req.body)
      , user = req.user; 
    
    store.user = req.user;
    console.log('THis is the store: ', store);

    store.save(function(err,doc){
        console.log('kati paei x');
        if(err){
            console.log('store.save() ERROR : ', err);
            res.render('suppliers/dashboard', { userEmail: req.user.email, userFirst: req.user.first, error: err.errors.name.type });
            return;
        }else{
            console.log('store.save() response: ', doc)
            user = _.extend(user, {store: doc, first: false});
            user.save(function(err, doc){
                if(err){
                    res.render('suppliers/dashboard', { userEmail: req.user.email, userFirst: req.user.first, error: 'This function is currently not available' });
                    return;
                }else{
                    req.user = doc; 
                    console.log('req.user, ', req.user);
                    res.render('suppliers/dashboard', { userEmail: req.user.email, userFirst: req.user.first, store: store});      
                    return;
                } 
            });
        }
    });


}