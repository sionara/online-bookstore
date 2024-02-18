const express = require("express");
const pageRouter = express.Router();
const booksList = require("../books/func");

pageRouter.get("/", async (request, response) => {
  //Gets list of all books in db
  books = await booksList.getBooks();
  response.render("index", { title: "BookTrader", books: books });

});
pageRouter.get("/:bookIsbn", async (request, response) => {
  // gets single book based on ISBN num  
  book = await booksList.getSingleBook(request.params.isbn);
  response.render("book", { title: book.isbn, book: book });

});

module.exports = pageRouter;