var mongoose = require('mongoose')
  , async = require('async');

module.exports = function (app, passport, auth) {
 
  // User routes
  var users = require('../app/controllers/users');
  
  app.get('/', auth.supplierCheckAuth, users.login);
  app.get('/suppliers', auth.supplierCheckAuth, users.login);
  app.get('/suppliers/signup', auth.supplierCheckAuth, users.signup);
  app.get('/signup', auth.supplierCheckAuth, users.signup);
  app.get('/suppliers/login', auth.supplierCheckAuth, users.login);
  app.get('/login', auth.supplierCheckAuth, users.login);
  app.get('/suppliers/logout', users.logout);

  app.post('/suppliers/session', passport.authenticate('local', {failureRedirect: '/suppliers/login', failureFlash: 'Invalid email or password.'}), users.session);
  app.post('/suppliers/create', users.create);

  // Suppliers dashboard routes
  var dashboard = require('../app/controllers/dashboard');
  app.get('/suppliers/dashboard', auth.supplierRequiresLogin, dashboard.index);

  // Store routes
  var stores = require('../app/controllers/stores');
  app.post('/suppliers/stores/new', auth.supplierRequiresLogin, stores.new);
  app.post('/suppliers/products/new', auth.supplierRequiresLogin, stores.newProduct);
  app.post('/suppliers/products/edit', auth.supplierRequiresLogin, stores.editProduct);
  app.post('/suppliers/products/delete', auth.supplierRequiresLogin, stores.deleteProduct);
  
  // Templates routes
  var templates = require('../app/controllers/templates');
  app.post('/suppliers/templates/product-preview-tmpl', auth.supplierRequiresLogin, templates.productSingle);
  app.post('/suppliers/templates/product-edit-tmpl', auth.supplierRequiresLogin, templates.productEdit);
  app.get('/suppliers/templates/product-add-tmpl', auth.supplierRequiresLogin, templates.productAdd);

  // // Demo routes
  // var demos = require('../app/controllers/demos');
  
  // // Home route
  // app.get('/', demos.index);

  // app.get('/demos/new', demos.new);
  // app.post('/demos',  demos.create);
  // app.get('/demos/:id', demos.show);
  // app.get('/demos/:id/edit', demos.edit);
  // app.put('/demos/:id', demos.update);
  // app.del('/demos/:id',  demos.destroy);

  // app.param('demoId', function (req, res, next, id) {
  //   Demo
  //     .findOne({ _id : id })
  //     .exec(function (err, demo) {
  //       if (err) return next(err);
  //       if (!demo) return next(new Error('Failed to load Demo ' + id));
  //       req.profile = demo;
  //       next();
  //     });
  // });

  // app.param('id', function(req, res, next, id){
  //   Article
  //     .findOne({ _id : id })
  //     .populate('user', 'name')
  //     .populate('comments')
  //     .exec(function (err, article) {
  //       if (err) return next(err)
  //       if (!article) return next(new Error('Failed to load article ' + id))
  //       req.article = article

  //       var populateComments = function (comment, cb) {
  //         User
  //           .findOne({ _id: comment._user })
  //           .select('name')
  //           .exec(function (err, user) {
  //             if (err) return next(err)
  //             comment.user = user
  //             cb(null, comment)
  //           })
  //       }

  //       if (article.comments.length) {
  //         async.map(req.article.comments, populateComments, function (err, results) {
  //           next(err)
  //         })
  //       }
  //       else
  //         next()
  //     })
  // })

  

}
