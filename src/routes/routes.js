const { addBooksHandler, getAllBooksHandler, getBooksWithIdHandler, editBookWithIdHandler, deleteBookWithIdHandler } = require("../handler")

const routes = [{
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    }, {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler
    }, {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBooksWithIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookWithIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookWithIdHandler
    }
]

module.exports = routes