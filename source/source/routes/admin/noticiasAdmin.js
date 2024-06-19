var express = require('express');
var router = express.Router();
const { Noticias, Categorias } = require('../../models.js');


router.get('/', async function(req, res, next) {
    res.locals.title = "Menéame"; 
    try {
      let noticias = await Noticias.findAll({
        include: [{
          model: Categorias,
          as: 'categoria', 
          attributes: ['nombreCategoria']
        }] 
      });
      res.locals.noticias = noticias; 
      res.render('noticias/index.ejs');
    } catch (error) {
      next(error); 
    }
  });

  module.exports = router;