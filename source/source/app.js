var createError = require('http-errors');
var express = require('express');
var session = require('express-session')
var path = require('path');
const bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer  = require('multer');
upload = multer({ dest: 'public/uploads/' });

const { isAuthenticated, isAdmin } = require('./middleware');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var noticiasRouter = require('./routes/noticias');

const { sequelize, Usuario, Categorias, Noticias } = require('./models');

/*async function crearUsuarioAdministrador() {
  try {
    // Primero, verifica si el usuario admin ya existe
    let adminUser = await Usuario.findOne({ where: { email: 'admin@example.com' } });

    if (!adminUser) {
      // Si no existe, crea un nuevo usuario administrador
      adminUser = await Usuario.create({
        nameUser: 'Admin',
        email: 'admin@mail.com',
        password: 'admin12345',
        rol: 'admin'
      });

      console.log('Usuario administrador creado:', adminUser.email);
    } else {
      console.log('El usuario administrador ya existe:', adminUser.email);
    }
  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
  }
}*/
 
/*crearUsuarioAdministrador();*/

var app = express();

const layouts = require('express-ejs-layouts'); // vamos a necesitarlo para hacer mi plantilla layout

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(layouts); //use layouts
app.set('layout', './layouts/layout'); //buscar un archivo que se llame layouts
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(function(req, res, next){
  console.log("");

  let params = req.query;
  if ( req.method == "POST" ) params = req.body;

  if ( req.method == "GET" ) console.log("REQUEST", req.method,  req.originalUrl, req.query);
  if ( req.method == "POST" ) console.log("REQUEST", req.method, req.originalUrl, req.body);

 

  res.locals.title = "Meneame";
  res.locals.usuario = req.session.username;
  res.locals.rol = req.session.rol;

  console.log("Usuario Conectado",res.locals.usuario);
  console.log("Usuario Conectado",res.locals.rol); 

  next();
});
 


app.use('/login',loginRouter);
app.use('/users',require('./routes/users/index'));
app.use('/admin', isAdmin, require('./routes/admin/index'));
app.use('/noticias', isAuthenticated, noticiasRouter);
app.use('/', indexRouter);

console.log("9", new Date());


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos y tablas sincronizadas');
  })
  .catch(err => {
    console.error('Error sincronizando la base de datos:', err);
  });

  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
