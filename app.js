const express = require("express");
const app = express();

const favouriteRoutes = require("./api/routes/favourites");

app.use("/favourites", favouriteRoutes);

module.exports = app;