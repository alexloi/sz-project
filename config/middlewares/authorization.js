/*
 *  Generic require login routing middleware
 */
exports.supplierRequiresLogin = function (req, res, next) {
  console.log('requires login gmton!');
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

exports.supplierCheckAuth = function(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/suppliers/dashboard');
  }
  next();
}


/*
 *  User authorizations routing middleware
 */
exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.profile.id != req.user.id) {
        return res.redirect('/users/'+req.profile.id);
      }
      next();
    }
}
