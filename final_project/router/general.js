const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  return userswithsamename.length > 0;
}
public_users.post("/register", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  return res.status(300).json(await books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  const isbn = req.params.isbn;
  return res.status(300).json(await books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  const author = req.params.author;
  let list = []
  list.push(books["1"])
  list.push(books["2"])
  list.push(books["3"])
  list.push(books["4"])
  list.push(books["5"])
  list.push(books["6"])
  list.push(books["7"])
  list.push(books["8"])
  list.push(books["9"])
  list.push(books["10"])

  let found_books = list.filter((book)=>{
    return book.author === author
  });
  return res.status(300).json(found_books);
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  const title = req.params.title;
  let list = []
  list.push(books["1"])
  list.push(books["2"])
  list.push(books["3"])
  list.push(books["4"])
  list.push(books["5"])
  list.push(books["6"])
  list.push(books["7"])
  list.push(books["8"])
  list.push(books["9"])
  list.push(books["10"])

  let found_books = list.filter((book)=>{
    return book.title === title
  });
  return res.status(300).json(found_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn].reviews);
});

module.exports.general = public_users;
