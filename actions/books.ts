const Loki = require("lokijs");
const axios = require("axios");
const settings = require('../settings.ts');
const booksValidations = require('../validation/books.ts');

const { validateBook } = booksValidations;
const db = new Loki('booksApi.db');
const books = db.addCollection('books');
const STATUS_OK = 200;

function booksList(sort) {
    // TODO: sorting & limit
    console.log('booksList');
    const result = books.chain().simplesort("title").data();
    console.log(result);
    return result;
}

async function loadFromOutside() {
    // TODO: sorting & limit
    const results = await axios({
        method: "GET",
        url: settings.outsideSourceUrl,
        responseType: "json",
    });
    return results.status === STATUS_OK ? results.data : [];
}

// TODO: searching

async function addBook(details) {
  // TODO: validation
  const validate = await validateBook(details);
  console.log(validate);
  // const results = books.insert({ details });
}

module.exports = {
  booksList,
  loadFromOutside,
}
