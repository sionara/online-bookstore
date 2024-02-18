const { MongoClient } = require("mongodb"); //import MongoClient from mongodb

//DB values
const dbUrl = "mongodb://127.0.0.1:27017/testdb";
const client = new MongoClient(dbUrl);

//MONGODB FUNCTIONS
async function connection() {
  db = client.db("testdb"); //if you have a default db in the connection, you can leave this blank
  return db;
}

//Function to select all documents in the menuLinks collection.
async function getBooks() {
  db = await connection();
  let results = db.collection("menuLinks").find({});
  let res = await results.toArray();
  return res;
}

//Function to insert one link
async function addBook(bookData) {
  db = await connection();
  let status = await db.collection("menuLinks").insertOne(bookData);
  console.log("link added");
}

//get SINGLE link based on ID
async function getSingleBook(isbn) {
  db = await connection();
  const editId = { isbn: new ObjectId(isbn) };
  const result = await db.collection("menuLinks").findOne(editId);
  return result
}

module.exports = {
  getBooks,
  addBook,
  getSingleBook
};