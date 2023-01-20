const express = require('express');
const router = express.Router();
const booksActions = require("../actions/books.ts");

router.get('/', async function(req, res, next) {
    let booksList = await booksActions.booksList();
    const outsideBooksList = [];
    if (Number(booksList?.length) === 0) {
        const results = await booksActions.loadFromOutside();
        booksList = [... booksList, ...results];
    }
    console.log(booksList);
    res.send(booksList);
});

router.post('/', async function(req, res, next) {
    console.log('req.body', req.body);
    await booksActions.addBook(req.body);
    res.send(JSON.stringify(res.body));
});

module.exports = router;
