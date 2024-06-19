var express = require('express');
var router = express.Router();

/* GET home page. */

const noticias = require("../noticias.json");

const noticiasArray = Object.values(noticias);

router.get('/logout', function(req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});


const idMap = {}; //creo un mapa para almacenar los id de cada noticia que se vaya creando
noticiasArray.forEach((noticia, index) => {
    idMap[noticia.id] = index; //esta funcion
});


const getNoticias = async function(req, res, next) {
  req.noticias = noticiasArray;
  req.idMap = idMap;
  next();
};

const sleep = function(ms,fn){ //milisegundos que debe esperar, despues de que espero que se hace
  setTimeout(fn,ms);
}

const sleep2 = function(ms){
  return new Promise(function(resolve,reject){
    setTimeout(resolve,ms); 
  });
}

router.get('/', getNoticias ,function(req, res, next) {
  res.locals.title = "Menéame";
  res.locals.noticias = req.noticias;
  res.render('index');
});

/*router.param("id",function(req,res,next,id){
  req.noticia = noticias[id];
  sleep(2000,function(){
    console.log('Noticia', id, req.noticia);
  if(req.noticia == undefined){
    //res.sendStatus(404);
    throw new Error('Noticia no encontrada');
    return;
  }
  next();
  });
 */

/*  router.param("id",function(req,res,next,id){
    req.noticia = noticias[id];
    sleep2(2000).then(function(){
      console.log('Noticia', id, req.noticia);
    if(req.noticia == undefined){
      //res.sendStatus(404);
      throw new Error('Noticia no encontrada');
      return;
    }

    next();
    }).catch(function(e){
      throw new Error('Noticia no encontrada');
    });

  */  

    router.param("id",async function(req,res,next,id){
      req.noticia = noticias[id];
      await sleep2(2000);
      console.log('Noticia', id, req.noticia);
      
      if(req.noticia == undefined){
        //res.sendStatus(404);
        throw new Error('Noticia no encontrada');
        return;
      }
  
      next();
      
});
 

router.get('/:id' ,function(req, res, next) {
  res.locals.title = "Menéame";
  res.locals.noticia = req.noticia;
  res.locals.id = req.params.id;
  res.locals.layout = './layouts/layout';
  
  res.render('noticia');
});



 
module.exports = router;
