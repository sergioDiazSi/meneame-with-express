var express = require('express');
var router = express.Router();
const { Categorias } = require('../../models.js');


router.get('/', async function(req, res, next) {
  res.locals.title = "Menéame"; 
  let filter = {};
  let categorias = await Categorias.findAll(filter);
  res.locals.categorias = categorias; 
  res.render('admin/categorias/index.ejs');
});

router.get('/create', async function(req, res, next) {
  res.locals.title = "Menéame";
  res.render('admin/categorias/form.ejs');
});

router.post('/save', async function(req, res, next) {
  let c = Categorias.build();
  c.nombreCategoria = req.body.nombreCategoria;
  await c.save();
  res.redirect('/admin/categorias');
});


module.exports = router;