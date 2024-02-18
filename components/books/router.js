var express = require("express");
var bookRouter = express.Router();

const model = require("./func");

//The following lines will convert the form data from query
//string format to JSON format.
bookRouter.use(express.urlencoded({ extended: true }));
bookRouter.use(express.json());

//Page routes for admin pages

//routes to addBook page, for adding new book info.
bookRouter.get("/", async (request, response) => {
  let newBook = await model.getSingleBook();
  response.render("/addBook", {title: newBook.name, bookData: newBook})
}); 

module.exports = bookRouter;