const controllers = require('../controllers/books');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: controllers.home,
  },
  {
    method: 'POST',
    path: '/books',
    handler: controllers.addBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: controllers.getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: controllers.getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: controllers.editBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: controllers.deleteBookById,
  },
];

module.exports = routes;
