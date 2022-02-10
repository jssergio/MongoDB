const req = require("express/lib/request")

module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.perfil == 1) {
          return next();
        }
        req.flash('error_msg', 'Area Restrita')
        res.redirect('/login')
    }
}