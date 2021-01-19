const Sequelize = require("sequelize");

console.log(process.env.DATABASE);
// connecting to your DB
const sequelize = new Sequelize(process.env.DATABASE);

// exporting connection
module.exports = sequelize;