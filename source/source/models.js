
const { Sequelize, DataTypes } = require('sequelize');

const bcrypt = require('bcryptjs');

const sequelize = new Sequelize('mysql://root:@db:3306/biblioteca');

const Usuario = sequelize.define('Usuario', {
  nameUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
});

const Categorias = sequelize.define(
  'Categorias',
  {
    // Model attributes are defined here
    nombreCategoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  
);

const Noticias = sequelize.define(
  'Noticias',
  {
    // Model attributes are defined here
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    imagen: { 
      type: DataTypes.BLOB('long'),
      allowNull: true 
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categorias', // Nombre de la tabla de referencia
        key: 'id',           // Llave primaria de la tabla de referencia
      }
    },
  },
);

Noticias.belongsTo(Categorias, { as: 'categoria', foreignKey: 'categoriaId' });
Categorias.hasMany(Noticias, { as: 'noticias', foreignKey: 'categoriaId' });


//HASH

Usuario.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(usuario.password, salt);
});

module.exports = {sequelize, Usuario, Categorias, Noticias};

