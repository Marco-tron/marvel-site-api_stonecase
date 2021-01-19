const Sequelize = require("sequelize");

// you need a nodemon.json file with an object env and a property "DATABASE" with your db URL
console.log(process.env.DATABASE);
// connecting to your DB
const sequelize = new Sequelize(process.env.DATABASE);

// exporting connection
module.exports = sequelize;