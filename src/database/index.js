const Sequelize = require("sequelize");


// connecting to your DB
const sequelize = new Sequelize(process.env.DATABASE);

// exporting connection
module.exports = sequelize;