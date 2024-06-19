var express = require('express');
var router = express.Router();
const { Usuario } = require('../../models.js');


router.get('/', async function(req, res, next) {
  res.locals.title = "Menéame"; 
  let filter = {};
  let usuarios = await Usuario.findAll(filter);
  res.locals.usuarios = usuarios; 
  res.render('admin/users/index.ejs');
});

router.get('/create', async function(req, res, next) {
  res.locals.title = "Menéame";
  res.render('admin/users/form.ejs');
});

router.post('/save', async function(req, res, next) {
  console.log("/users/save",req.body);
  let u = Usuario.build();
  u.nameUser = req.body.nameUser;
  u.email = req.body.email;
  u.password = req.body.password;
  await u.save();
  res.redirect('/admin/users');
});



module.exports = router;
