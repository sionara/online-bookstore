const { MongoClient, ObjectId } = require("mongodb"); //import MongoClient from mongodb

//DB values
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/`;
const client = new MongoClient(dbUrl);

//MONGODB FUNCTIONS
async function connection() {
  db = client.db("Online-Bookstore"); //if you have a default db in the connection, you can leave this blank
  return db;
}

//Function to select all documents in the Books collection.
async function getBooks() {
  db = await connection();
  let results = db.collection("Books").find({});
  let res = await results.toArray();
  return res;
}

//Function to add a book to db
async function addBook(bookData) {
  db = await connection();
  let status = await db.collection("Books").insertOne(bookData);
  console.log("Book added");
}

//get SINGLE book based on ID
async function getSingleBook(id) {
  db = await connection();
  const editId = { _id: new ObjectId(id) };
  const result = await db.collection("Books").findOne(editId);
  return result
}

//delete book based on id
async function deleteBook(id) {
  db = await connection();
  const deleteId = {_id: new ObjectId(id) };// changes query string value into ObjectId type
  const result = await db.collection("Books").deleteOne(deleteId);
  
  if (result.deleteCount == 1) {
    console.log("delete successful");
  }
}

module.exports = {
  getBooks,
  addBook,
  getSingleBook,
  deleteBook
};