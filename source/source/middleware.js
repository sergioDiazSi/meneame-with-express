function isAuthenticated(req, res, next) {

    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }

}
    
function isAdmin(req, res, next) {

    if (req.session.rol === 'admin') {
        return next();
    } else {
        res.status(403).send('Acceso denegado');
    }

}
    
    module.exports = { isAuthenticated, isAdmin };