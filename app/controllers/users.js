var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env];

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , url = require('url')
  , randomString = require('randomstring')
  , _ = require('underscore');

exports.signin = function (req, res) {

}

exports.authCallback = function (req, res, next) {
  res.redirect('/');
}


exports.login = function (req, res) {
  if(req.user){
    res.redirect('/suppliers/dashboard');    
  } else {  
    res.render('suppliers/login', {
        title: 'Login'
      , msg: req.flash('error')
    });
  }
}

// sign up
exports.signup = function (req, res) {
  if(req.user){
    res.redirect('/suppliers/dashboard');
  }else{
    res.render('suppliers/signup', {
        title: 'Sign up'
      , user: new User()
    });
  }
}

// logout
exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}

// Forgot password
exports.reset = function(req, res){
  res.render('suppliers/reset');
}

// Restore new password - send out email
exports.restore = function(req, res){
  if(req.body.email == req.body.ver_email){
    User
    .findOne({ email : req.body.email })
      .exec(function (err, user) {
        if(!user || err){
          console.log("ENESHI ETSI USER!");
          res.render('suppliers/signup', { msg: "This user does not exist. Please create a new account!", user: new User()});
          return;

        }
        user = _.extend(user, { password: randomString.generate(7) });
        user.provider = 'local';

        user.save(function(err){
          if(err){
            console.log("Pao na kamo save je en mporo!");
            res.render('suppliers/signup', { msg: "This user does not exist. Create a new account please!", user: new User()});
          }else{
            console.log("Send out email dame!");
            res.render('suppliers/reset', { msg: "A new password was sent to your e-mail"} );
          }
        });
      });  
  } else {
      console.log('EMAILS DONT MATCH!');
      res.render('suppliers/reset', { msg: "Your emails do not match!" });
  }
}

// session
exports.session = function (req, res) {
  var user = req.user;
  console.log("THIS IS THE USER:", user);
  res.redirect('/suppliers/dashboard');
}

// signup
exports.create = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      return res.render('suppliers/signup', { msg: "Please fill out all form elements", user: new User() });
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/suppliers/dashboard');
    });
  });
}

// show profile
exports.show = function (req, res) {
  var user = req.profile;
  console.log('user:: ', user);
  res.render('users/show', {
      title: user.name
    , user: user
  });
}

// find requested user
exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
}

