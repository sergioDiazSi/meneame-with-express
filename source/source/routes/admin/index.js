var express = require('express');
var router = express.Router();
var categoriasRouter = require('./categorias');
var usersRouter = require('./users');
var noticiasAdminRouter = require('./noticiasAdmin');


router.use('/categorias',categoriasRouter);
router.use('/users',usersRouter);
router.use('/noticias',noticiasAdminRouter);

router.get('/', async function(req,res,next){
    res.render('admin/index.ejs');
});



module.exports = router;