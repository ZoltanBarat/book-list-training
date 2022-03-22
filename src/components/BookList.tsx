import React, { useEffect, useState } from 'react'
import BookDataService from '../services/book-services';
import "./BookList.css";



function BookList() {

  interface Book {
    author: string;
    avaible: string;
    id: string;
    title: string;
    imgUrl: string;
  }

  const [books, setBooks] = useState<Book | any>();
  const [searchTarget, setSearchTarget] = useState("");
  const [searchWhere, setSearchWhere] = useState("title");
  
  useEffect(() => {
    getAllBook();
  }, [])



  const getAllBook = async () => {
    const data = await BookDataService.getAllBooks();  
    setBooks(data.docs.map((item) => ({ ...item.data(), id: item.id })));
  } 

  const testSearch = async (target: string) => {
    const keywordsArray = target.split(" ");

    if (keywordsArray.length <= 1 && keywordsArray.includes("")) {
      getAllBook();
    } else {
      const q = await BookDataService.search(keywordsArray, searchWhere);
      setBooks(q.docs.map((item) => ({ ...item.data(), id: item.id })));
    }

    console.log(searchWhere);
    console.log(keywordsArray);
  };

  const deleteHandler = async (id: string) => {
    await BookDataService.deleteBook(id);
  }

  return (
    <div>
      <input
        type="text"
        value={searchTarget}
        onChange={(e) => setSearchTarget(e.target.value)}
      />
      <label>
        Where:
        <select
          name="searchWhere"
          value={searchWhere}
          onChange={(e) => {
            setSearchWhere(e.target.value);
            console.log(searchWhere);
          }}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </label>
      <button onClick={() => testSearch(searchTarget)}>Search</button>

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
          {books &&
            books.map((book: Book, index: number) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.avaible}</td>
                <td>
                  <img src={book.imgUrl} alt="item" />
                </td>
                <td>
                  <button>Edit</button>
                  <button
                    onClick={() => {
                      deleteHandler(book.id);
                      getAllBook();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;