const express = require('express');
const path = require('path');
const { MongoClient } = require("mongodb"); //import MongoClient from mongodb

const dbUrl = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(dbUrl);

const app = express();
const port = process.env.PORT || "8888";

//SET UP TEMPLATE ENGINE (PUG)
app.set("views", path.join(__dirname, "views")); //set up "views" setting to look in the <__dirname>/views folder
app.set("view engine", "pug"); //set up app to use Pug as template engine

//SET UP A PATH FOR STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

//SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (request, response) => {
    let links = await getLinks();
    response.render("index", {title: "home"})
})

//MONGODB FUNCTIONS
async function connection() {
    db = client.db("testdb"); //if you have a default db in the connection, you can leave this blank
    return db;
  }
  
  //Function to select all documents in the menuLinks collection.
  async function getLinks() {
    db = await connection();
    let results = db.collection("menuLinks").find({});
    let res = await results.toArray();
    return res;
  }
  
  //Function to insert one link
  async function addLink(linkData) {
    db = await connection();
    let status = await db.collection("menuLinks").insertOne(linkData);
    console.log("link added");
  }

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})