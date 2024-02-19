var express = require("express");
var adminRouter = express.Router();

const model = require("./func");

//The following lines will convert the form data from query
//string format to JSON format.
adminRouter.use(express.urlencoded({ extended: true }));
adminRouter.use(express.json());

//Page routes for admin pages

//routes to add books
adminRouter.get("/addBook", async (request, response) => {
  let books = await model.getBooks();
  response.render("addBook", {title: "Add New Book", booksData: books });
});


//method to receive book data then send new book data to server
adminRouter.post("/addBook/Submit", async (request, response) => {
  let title = request.body.title;
  let author = request.body.author;
  let genre = request.body.genre;
  let year = request.body.published_year;

  let newBook = { "title": title, "author": author, "genre": genre, "published_year": year };
  console.log(newBook)
  await model.addBook(newBook);
  response.redirect("/");
}); 

//method to handle deleting a specific book based on id
adminRouter.get("/deleteBook/:id", async (request, response) => {
  let id = request.params.id;

  await model.deleteBook(id);
  response.redirect("/");
  
});

module.exports = adminRouter;