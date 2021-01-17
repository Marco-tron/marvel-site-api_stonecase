const express = require("express");
const app = express();
const morgan = require("morgan");

const favouriteRoutes = require("./api/routes/favourites");

// used to log the route called
app.use(morgan("dev"));

app.use("/favourites", favouriteRoutes);

// throw error if route does not exist
app.use(()=> {
    const error = new Error("Route Not found");
    error.status = 404;
    next(error);
})

// handling other types of errors
app.use((err, req, res, next) => {
    res.status = err.status || 500;
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;