var express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();
const { Usuario } = require('../models.js');


// Ruta para mostrar el formulario de login
router.get('/', function(req, res, next) {
    res.locals.title = "Login";
    res.render('login/login.ejs');
});




router.post('/auth', async function(req, res, next) {
    const { email, password } = req.body;
  
    try {
      let usuario = await Usuario.findOne({ where: { email: email } });
  
      if (usuario) {
        const match = await bcrypt.compare(password, usuario.password);
  
        if (match) {

          req.session.userId = usuario.id;
          req.session.username = usuario.nameUser;
          req.session.email = usuario.email;
          req.session.rol = usuario.rol;

          res.redirect('/');
        } else {
          res.status(401).send('Credenciales inválidas');
        }
      } else {
        res.status(401).send('Credenciales inválidas');
      }
    } catch (error) {
      next(error);
    }
  });

  

module.exports = router;
