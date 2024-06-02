var express = require('express');
var router = express.Router();

/* GET home page. */

const noticias = require("../noticias.json");
const noticiasArray = Object.values(noticias);

const idMap = {}; //creo un mapa para almacenar los id de cada noticia que se vaya creando
noticiasArray.forEach((noticia, index) => {
    idMap[noticia.id] = index; //esta funcion
});


const getNoticias = async function(req, res, next) {
  req.noticias = noticiasArray;
  req.idMap = idMap;
  next();
};


router.get('/', getNoticias ,function(req, res, next) {
  res.locals.title = "Menéame";
  res.locals.noticias = req.noticias;
  res.render('index');
});

router.get('/:id', getNoticias ,function(req, res, next) {
  res.locals.title = "Menéame";
  res.locals.noticias = req.noticias;
  res.locals.id = req.params.id;
  res.locals.idMap = req.idMap;
  res.render('noticia',{ layout: './layouts/layout'});
});

module.exports = router;
