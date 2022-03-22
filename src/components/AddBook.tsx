import { async } from '@firebase/util';
import React, { useState } from 'react';
import bookServices from '../services/book-services';
import BookDataService from '../services/book-services';

function AddBook() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [avaible, setAvaible] = useState('yes');
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    console.log(event);
    console.log(typeof event);

    setMessage({ error: false, msg: "" });

    if (title === "" || author === "") {
      setMessage({ error: true, msg: "Fields are mandatory" })
      return;
    }

    const newBook = {
      title,
      author,
      avaible
    }

    console.log(newBook);

    try {
      await BookDataService.addBooks(newBook);
      setMessage({ error: false, msg: "New Book has been added" });
    } catch (err: any) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");
    setAvaible("");
  }

  const testSearch = async () => {
    const q = await BookDataService.search("JKR");
    console.log(q);
  }

  return (
    <>
      <div>{message.msg}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Book Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="author">
          Author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Avaible:
          <select
            id="cars"
            name="cars"
            value={avaible}
            onChange={e => setAvaible(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => testSearch()}>Search (for Author "JKR")</button>
    </>
  )
}

export default AddBook;