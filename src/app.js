const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const usersRoutes = require("./api/routes/users");

// used to log the route called
app.use(morgan("dev"));

//handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }
    next();
})
// using body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/users", usersRoutes);

// throw error if route does not exist
app.use(()=> {
    const error = new Error("Route Not found");
    error.status = 404;
    next(error);
})

// handling other types of errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    });
});


module.exports = app;