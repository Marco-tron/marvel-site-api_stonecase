const Sequelize = require("sequelize");
// importing models
const User = require('../api/models/User');
const Favorite = require('../api/models/Favorite');


// you need a nodemon.json file with an object env and a property "DATABASE" with your db URL

// connecting to your DB
const sequelize = new Sequelize(process.env.DATABASE);

//initiating models
User.init(sequelize);
Favorite.init(sequelize);

//associating models
User.associate(sequelize.models);
Favorite.associate(sequelize.models);

// exporting connection
module.exports = sequelize;