const express = require("express");
const app = express();
const morgan = require("morgan");

const favouriteRoutes = require("./api/routes/favourites");

app.use(morgan("dev"));

app.use("/favourites", favouriteRoutes);

module.exports = app;