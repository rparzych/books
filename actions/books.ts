const Loki = require("lokijs");
const axios = require("axios");
const settings = require('../settings.ts');
const { validate, IsInt, is } = require('class-validator');

const db = new Loki('booksApi.db');
const books = db.addCollection('books');
const STATUS_OK = 200;

function booksList(sort) {
    console.log('booksList');
    const result = books.chain().simplesort("title").data();
    console.log(result);
    return result;
}

async function loadFromOutside() {
    const results = await axios({
        method: "GET",
        url: settings.outsideSourceUrl,
        responseType: "json",
    });
    return results.status === STATUS_OK ? results.data : [];
}

async function addBook(details) {
  const results = books.insert({
    });
}

module.exports = {
  booksList,
  loadFromOutside,
}
