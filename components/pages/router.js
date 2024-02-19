const express = require("express");
const pageRouter = express.Router();
const booksList = require("../books/func");

pageRouter.get("/", async (request, response) => {
  //Gets list of all books in db
  books = await booksList.getBooks();
  response.render("index", { title: "BookTrader", books: books });
});

// this will receive request from Index, to get a single book by id from db. Used to display data about single book.
pageRouter.get("/book/:id", async (request, response) => {
  // gets single book based on Id 
  let book = await booksList.getSingleBook(request.params.id);
  response.render("book", { title: book._id, book: book });

});


module.exports = pageRouter;