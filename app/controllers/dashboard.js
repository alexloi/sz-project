var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Store = mongoose.model('Store')
  , url = require('url')
  , randomString = require('randomstring')

  , _ = require('underscore');

exports.index = function(req,res){

    // If user has a store
    if(req.user.store){
        // Get the store
        Store.find({_id: req.user.store}).exec(function(err, store){
            if(err){
                console.log('Error index dashboard:', err);
                res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first, error: err.errors });
                return;
            }else{
                console.log('The store:', store[0]);
                res.render('suppliers/dashboard/index',
                             { 
                                userEmail: req.user.email, 
                                userFirst: req.user.first, 
                                store: store[0]
                            });
                return;
            }
        });
    }
	else res.render('suppliers/dashboard/index', { userEmail: req.user.email, userFirst: req.user.first } );
	return;	
}