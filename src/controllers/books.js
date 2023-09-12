/**
 * Instagram : @fahmihdytllah
 * Visit me  : linktr.ee/jagocode
 */
 
const db = require('../libs/db');

module.exports.home = (request, h) => {
  return h.response({
    status: 'online',
    author: 'Fahmi Hidayatulloh'
  }).code(200);
}

module.exports.addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (pageCount < readPage) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);
  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  const addBookToDb = db.addBook(newBook);
  if (addBookToDb) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: addBookToDb.id,
      },
    }).code(201);
  }
  
  return h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

module.exports.getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  
  const getBooks = db.getAllBooks();
  let filteredBooks = getBooks;

  if (name && name.length) {
    filteredBooks = filteredBooks.filter((book) => book
      .name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading && reading.length) {
    filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
  }

  if (finished && finished.length) {
    filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
  }

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
};

module.exports.getBookById = (request, h) => {
  const { id } = request.params;
  const findBook = db.getBookById(id);

  if (findBook) {
    return h.response({
      status: 'success',
      data: { book: findBook }
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

module.exports.editBookById = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const updatedAt = new Date().toISOString();
  const findBook = db.getBookById(id);

  if (findBook) {
    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    }

    if (pageCount < readPage) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }

    const finished = (pageCount === readPage);
    db.updateBookById(id, {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    });
    
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

module.exports.deleteBookById = (request, h) => {
  const { id } = request.params;

  const findBook = db.getBookById(id);
  if (findBook) {
    db.deleteBookById(id);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};