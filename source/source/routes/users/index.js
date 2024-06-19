var express = require('express');
var router = express.Router();

const { Usuario } = require('../../models.js');


router.get('/create', async function(req, res, next) {
  res.locals.title = "Menéame";
  res.render('users/users/form.ejs');
});

router.post('/save', async function(req, res, next) {
  let u = Usuario.build();
  u.nameUser = req.body.nameUser;
  u.email = req.body.email;
  u.password = req.body.password;
  await u.save();
  res.redirect('/');
});



module.exports = router;