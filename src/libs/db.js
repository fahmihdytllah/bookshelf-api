/**
 * Instagram : @fahmihdytllah
 * Visit me  : linktr.ee/jagocode
 */
 
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const DB_FILE = path.join(__dirname, '../database/books.json');

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
  }
  const rawData = fs.readFileSync(DB_FILE);
  return JSON.parse(rawData);
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Get all books
function getAllBooks() {
  return readDb();
}

// Get a book by ID
function getBookById(id) {
  const books = readDb();
  return books.find(book => book.id === id);
}

// Add a new book
function addBook(book) {
  const books = readDb();
  book.id = nanoid(18);
  books.push(book);
  writeDb(books);
  return book;
}

// Search book by name
function searchBookByName(name) {
  const books = readDb();
  return books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
}

// Update a book by ID
function updateBookById(id, updatedData) {
  const books = readDb();
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    Object.assign(books[index], updatedData);
    writeDb(books);
    return books[index];
  }
  return null;
}

// Delete a book by ID
function deleteBookById(id) {
  const books = readDb();
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    const [deletedBook] = books.splice(index, 1);
    writeDb(books);
    return deletedBook;
  }
  return null;
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  searchBookByName,
  updateBookById,
  deleteBookById
};
