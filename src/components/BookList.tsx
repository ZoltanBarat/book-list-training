import React, { useEffect, useState } from 'react'
import BookDataService from '../services/book-services';

function BookList() {

  interface Book {
    author: string,
    avaible: string,
    id: string,
    title: string
  }

  const [books, setBooks] = useState<Book | any>();

  useEffect(() => {
    getBooks();
  }, [])



  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data);
    setBooks(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    console.log(books);
    //console.log(data.docs.map((item) => ({ ...item.data(), id: item.id })));
  }

  const deleteHandler = async (id: string) => {
    await BookDataService.deleteBook(id);
  }


  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Book Title</th>
          <th>Author</th>
          <th>Avaible</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {books && books.map((book: Book, index: number) => (
          <tr key={book.id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.avaible}</td>
            <td>
              <button>Edit</button>
              <button onClick={() => {
                deleteHandler(book.id);
                getBooks();
              }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>



    </table>
  )
}

export default BookList;