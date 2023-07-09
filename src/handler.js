const { nanoid } = require('nanoid');
const books = require('./data/books');

const addBooksHandler = (request, h) => {
    if (!('name' in request.payload)) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400)
        return response;
    } else if (request.payload.readPage > request.payload.pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400)
        return response;
    } else {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

        const id = nanoid(16)
        const finished = pageCount === readPage
        const insertedAt = new Date().toString()
        const updatedAt = insertedAt

        const newBookData = {
            id,
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
            updatedAt
        }

        books.push(newBookData)

        const isSuccess = books.filter((book) => book.id === id).length > 0

        if (isSuccess) {
            return h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id
                }
            }).code(201);
        }
        return h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan'
        }).code(500);
    }
}

const getAllBooksHandler = (request, h) => {
    const { reading, finished, name } = request.query;

    if (!reading && !finished && !name) {
        return h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        }).code(200)
    }

    if (reading) {
        const booksFilter = books.filter((book) => Number(book.reading) === Number(reading))

        return h.response({
            status: 'success',
            data: {
                books: booksFilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        }).code(200)
    }

    if (finished) {
        const booksFilter = books.filter((book) => Number(book.finished) === Number(finished))

        return h.response({
            status: 'success',
            data: {
                books: booksFilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        }).code(200)
    }

    if (name) {
        const booksFilter = books.filter((book) => RegExp(name, 'gi').test(book.name))

        return h.response({
            status: 'success',
            data: {
                books: booksFilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        }).code(200)
    }

}

const getBooksWithIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((n) => n.id === bookId)[0];
    if (book !== undefined) {
        return h.response({
            status: 'success',
            data: {
                book: book
            }
        }).code(200)
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    }).code(404)
}

const editBookWithIdHandler = (request, h) => {

    const { bookId } = request.params

    const customResponse = (status, message, code) => {
        return h.response({
            status: `${status}`,
            message: `${message}`,
        }).code(code)
    }

    if (request.payload.name === undefined) {
        return createResponse('fail', 'Gagal memperbarui buku. Mohon isi nama buku', 400);
    }

    if (request.payload.readPage > request.payload.pageCount) {
        return createResponse('fail', 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', 400);
    }

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const indexBook = books.findIndex((book) => book.id === bookId)

    if (index !== -1) {
        books[indexBook] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        }

        return customResponse('success', 'Buku berhasil diperbarui', 200);
    }

    return customResponse('fail', 'Gagal memperbarui buku. Id tidak ditemukan', 404);
}

const deleteBookWithIdHandler = (request, h) => {

    const { bookId } = request.params

    const customResponse = (status, message, code) => {
        return h.response({
            status: `${status}`,
            message: `${message}`,
        }).code(code)
    }

    const indexBook = books.findIndex((book) => book.id === bookId)

    if (indexBook !== -1) {
        books.splice(indexBook, 1)
        return customResponse('success', 'Buku berhasil dihapus', 200)
    }
    return customResponse('fail', 'Buku gagal dihapus. Id tidak ditemukan', 404);
}

module.exports = { addBooksHandler, getAllBooksHandler, getBooksWithIdHandler, editBookWithIdHandler, deleteBookWithIdHandler }