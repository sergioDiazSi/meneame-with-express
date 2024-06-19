var express = require('express');
var router = express.Router();
const Jimp = require('jimp');
const { Noticias, Categorias } = require('../models.js');


router.get('/create', async function(req, res, next) {
  let filter = {};
  let categorias = await Categorias.findAll(filter);
  res.locals.categorias = categorias;
  res.render('noticias/form.ejs');
});

router.post('/save', upload.single('imagen'), async function(req, res, next) {
  console.log(req.file);

  let n = Noticias.build();
  n.titulo = req.body.titulo;
  n.descripcion = req.body.descripcion;
  n.imagen = req.file ? req.file.filename : null;
  n.categoriaId = req.body.categoriaId;
  await n.save();

  //REDIMENSIONAR Y PASAR A WEBP

  if (req.file) {
    try {
      const imagePath = `public/uploads/${req.file.filename}`;
      const image = await Jimp.read(imagePath);

      await image.resize(250, Jimp.AUTO);

      await image.writeAsync(`${imagePath}.webp`);

      console.log('SE CONVIRTIÓ A WEBP');
    } catch (error) {
      console.error('Error al redimensionar o convertir la imagen:', error);
    }
  }

  if (req.session.rol == "admin"){
    res.redirect('/admin/noticias');
  } else {
    res.redirect('/');
  }
});


module.exports = router;