import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from "../firebase-config";
import BookDataService from '../services/book-services';

function AddBook() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [avaible, setAvaible] = useState('yes'); 
  const [message, setMessage] = useState({ error: false, msg: "" });


  const [file, setFile] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgURL] = useState<any>();


   function handleChange(e: any) {
     setFile(e.target.files[0]);
   }

  function handleUpload(e: any) {
    e.preventDefault();
    if (file !== null) {      
      const storageRef = ref(storage, `/images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
    }
    
  }

  

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
      avaible,
      imgUrl,
    };

    console.log(newBook);

    try {
      await BookDataService.addBooks(newBook);
      setMessage({ error: false, msg: "New Book has been added" });
    } catch (err: any) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");  
    setImgURL("");
  }

  const mystyle = {     
    padding: "40px 0px",     
  };
  
  return (
    <div style={mystyle}>
      <div>{message.msg}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Book Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="author">
          Author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Avaible:
          <select
            id="cars"
            name="cars"
            value={avaible}
            onChange={(e) => setAvaible(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div style={mystyle}>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} />
          <button>upload to firebase</button>
        </form>
        <h2>Uploading done {progress}%</h2>
      </div>
    </div>
  );
}

export default AddBook;