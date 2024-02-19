const express = require('express');
const path = require('path');

// for using environment variables
const dotenv = require("dotenv");
dotenv.config();

//import page routes
const pageRouter = require("./components/pages/router");
const adminRouter = require("./components/books/router");

const app = express();
const port = process.env.PORT || "8888";

//SET UP TEMPLATE ENGINE (PUG)
app.set("views", path.join(__dirname, "views")); //set up "views" setting to look in the <__dirname>/views folder
app.set("view engine", "pug"); //set up app to use Pug as template engine

//SET UP A PATH FOR STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//USE PAGE ROUTES FROM MODULE
app.use("/", pageRouter);
app.use("/admin", adminRouter); //book router

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})