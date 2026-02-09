const express = require("express");
const router = express.Router();
const stor = require("../public/books/storage");


router.get("/books/update/:id", (req, res) => {
  const { id } = req.params;
  const { book } = stor;
  const foundBook = book.find((el) => el.id === id);

  if (foundBook) {
    res.render("update", { book: foundBook });
  } else {
    res.status(404).send("Книга не найдена");
  }
});


router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const { book } = stor;
  const bookById = book.findIndex((el) => el.id === id);
  
  if (bookById !== -1) {

    if (req.accepts("html")) {
      res.render("view", { book: book[bookById] });
    } else {
      res.json(book[bookById]);
    }
  } else {
    if (req.accepts("html")) {
      res.status(404).send("Книга не найдена");
    } else {
      res.status(404).json({ message: `Книга не найдена` });
    }
  }
});

module.exports = router;
