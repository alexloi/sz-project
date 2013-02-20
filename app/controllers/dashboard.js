var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , url = require('url')
  , randomString = require('randomstring')
  , _ = require('underscore');

exports.index = function(req,res){
	res.render('suppliers/dashboard/index', { userEmail: req.user.email, first: req.user.first } );
	return;	
}