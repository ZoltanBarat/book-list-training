import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import Button from '../../elements/Button';
import { storage } from "../../firebase-config";
import ItemDataService from '../../services/firebase-services';
import "./AddUpdateItem.css";

import { TestUPLOAD_DATA } from "../UPLOAD_DATA";



function AddItem({id, setItemId} : {id: string, setItemId: Function}) {

  interface userInterface {
    user: {
      email: string,
      displayName: string,
      uid: string,
    };
  }

  const { user } = useUserAuth();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [avaible, setAvaible] = useState('yes'); 

  const clothingTypes = [
    "Sweater",
    "Dress",
    "Hoodies",
    "T-shirt",
    "Flip-flops",
    "Shorts",
    "Skirt",
    "Jeans",
    "Shoes",
    "Coat",
    "High heels",
    "Suit",
    "Cap",
    "Socks",
    "Shirt",
    "Bra",
    "Scarf",
    "Swimsuit",
    "Hat",
    "Gloves",
    "Jacket",
    "Long coat",
    "Boots",
    "Sunglasses",
    "Tie",
    "Polo shirt",
    "Leather jackets",
  ];

  const [item, setItem] = useState({
    name: "",
    price: "",
    gender: "Woman",
    type: "",
    size: "S",
    brand: "",
    color: "",
    city: "",
    description: "",
  });

  const [message, setMessage] = useState({ error: false, msg: "" });

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState('');
  const [imgUrl, setImgURL] = useState('');


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      setFile(e.target.files[0]);    
    }    
  }

  async function handleUpload(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (file !== null) {
      const storageRef = ref(storage, `/images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (snapshot.bytesTransferred === snapshot.totalBytes) {
            setProgress("Done");
          }
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgURL(downloadURL);
          });
        }
      );
      setFile(null);
    }
  }

  
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const date = { milliseconds: Date.now() };       
    setMessage({ error: false, msg: "" });

    /* if (title === "" || author === "") {
      setMessage({ error: true, msg: "Fields are mandatory" })
      return;
    } */

    /* const updatedItem = {
      item,
    }; */

    if (progress === "Done") {
      const newItem = {
        item,
        date: date.milliseconds,
        imgUrl,
        uploaderName: user.displayName,
        uploaderEmail: user.email.toLowerCase(),
      };

      try {
       /*  if (id !== undefined && id !== "") {
          await ItemDataService.updateItem(id, updatedItem);
          setItemId("");
          setMessage({ error: false, msg: "Updated successfully" });
        } else {
          await ItemDataService.addItems(newItem);
          setMessage({ error: false, msg: "New Item has been added" });
          console.log(newItem);
        } */

        await ItemDataService.addItems(newItem);
        setMessage({ error: false, msg: "New Item has been added" });
        
      } catch (err: any) {
        setMessage({ error: true, msg: err.message });
      }

      setItem({
        name: "",
        price: "",
        gender: "Woman",
        type: "",
        size: "S",
        brand: "",
        color: "",
        city: "",
        description: "",
      });
    }
    
 
  } 

  /* const editHandler = async() => {
    setMessage({ error: false, msg: "" });
    try {
      const docSnap = await ItemDataService.getItem(id);
      
      setTitle(docSnap.data()?.title);
      setAuthor(docSnap.data()?.author);
      setAvaible(docSnap.data()?.avaible);    

    setItem({
      name: docSnap.data()?.name,
      price: docSnap.data()?.price,
      gender: docSnap.data()?.gender,
      type: docSnap.data()?.type,
      size: docSnap.data()?.size,
      brand: docSnap.data()?.brand,
      color: docSnap.data()?.color,
      city: docSnap.data()?.city,
      description: docSnap.data()?.description,
    });
 
      
    } catch (err: any) {
      setMessage({ error: true, msg: err.message });
    }
  }

  useEffect(() => {
    console.log(id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
    if (id === 'xxxx') {
      setTitle("");
      setAuthor("");
      setImgURL("");
    }
  }, [id]) */

   
  return (
    <div className="centerContainer">
      <div className="subCenterContainer">
        <div>{message.msg}</div>
        <h2 className="AddUpMain__title">Add new item</h2>
        <div className="AddUpItemWrapper">
          <div className="formContainer">
            <form id="addItemForm" onSubmit={handleSubmit}>
              <div className="inputContainer">
                <label>
                  Item Name
                  <input
                    required
                    className="input"
                    type="text"
                    name="name"
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                  />
                </label>
              </div>
              <div className="inputContainer">
                <label>
                  Price
                  <input
                    required
                    className="input"
                    type="text"
                    name="price"
                    placeholder="HUF"
                    value={item.price}
                    onChange={(e) =>
                      setItem({ ...item, price: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="inputContainer">
                <label>
                  Gender
                  <select
                    className="select"
                    required
                    name="gender"
                    value={item.gender}
                    onChange={(e) =>
                      setItem({ ...item, gender: e.target.value })
                    }
                  >
                    <option disabled value="DEFAULT">
                      -- select an option --
                    </option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                  </select>
                </label>
              </div>

              <div className="inputContainer">
                <label>
                  Type
                  <input
                    className="select"
                    list="typeList"
                    required
                    type="text"
                    name="type"
                    value={item.type}
                    onChange={(e) => setItem({ ...item, type: e.target.value })}
                  ></input>
                  <datalist id="typeList">
                    {clothingTypes.map((types, index) => (
                      <option key={index} value={types} />
                    ))}
                  </datalist>
                </label>
              </div>

              <div className="inputContainer">
                <label>
                  Size
                  <select
                    className="select"
                    required
                    name="size"
                    value={item.size}
                    onChange={(e) => setItem({ ...item, size: e.target.value })}
                  >
                    <option disabled value="DEFAULT">
                      -- select an option --
                    </option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </label>
              </div>

              <div className="inputContainer">
                <label>
                  Brand
                  <input
                    required
                    className="input"
                    type="text"
                    name="brand"
                    placeholder="Brand name"
                    value={item.brand}
                    onChange={(e) =>
                      setItem({ ...item, brand: e.target.value })
                    }
                  />
                </label>
              </div>

              <div className="inputContainer">
                <label>
                  Color
                  <input
                    required
                    className="input"
                    type="text"
                    name="color"
                    placeholder="Item color"
                    value={item.color}
                    onChange={(e) =>
                      setItem({ ...item, color: e.target.value })
                    }
                  />
                </label>
              </div>

              <div className="inputContainer">
                <label>
                  City
                  <input
                    required
                    className="input"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={item.city}
                    onChange={(e) => setItem({ ...item, city: e.target.value })}
                  />
                </label>
              </div>
              <div className="inputContainer">
                <label>
                  Description
                  <textarea
                    className="textArea"
                    rows={4}
                    cols={50}
                    name="description"
                    form="usrform"
                    value={item.description}
                    onChange={(e) =>
                      setItem({ ...item, description: e.target.value })
                    }
                  >
                    Enter text here...
                  </textarea>
                </label>
              </div>
            </form>
          </div>
          <div className="fileUpContainer">
            <label>Picture</label>
            <div className="fileUpButton__container">
              <form className="fileUpForm" /* onSubmit={handleUpload} */>
                <label htmlFor="imgPre" className="fileUpButton">
                  🗀 Choose a File...
                </label>
                <input
                  id="imgPre"
                  required
                  type="file"
                  accept="image/png, image/jpeg"
                  onClick={() => console.log("hellllllllllllo")}
                  onChange={handleFileChange}
                />

                <div className="arrowAnimation">
                  {file ? (
                    <>
                      <div className="arrowPink delay1"></div>
                      <div className="arrowPink delay2"></div>
                      <div className="arrowPink delay3"></div>
                    </>
                  ) : (
                    <>
                      <div className="arrowBlack delay1"></div>
                      <div className="arrowBlack delay2"></div>
                      <div className="arrowBlack delay3"></div>
                    </>
                  )}
                </div>
                <Button
                  text="Upload"
                  onClick={(e: { preventDefault: () => void }) =>
                    handleUpload(e)
                  }
                  disabled={!file}
                />
              </form>
            </div>
            {progress === "" ? null : (
              <div className="fileUpProgress">
                <h2>Image uploaded</h2>
              </div>
            )}
            {!file ? null : (
              <img
                className="previewImg"
                src={file ? URL.createObjectURL(file) : "#"}
                alt="uploaded"
              />
            )}
          </div>
        </div>
        <div className="button">
          <Button
            text="Submit"
            margin
            type="submit"
            form="addItemForm"
            value="submit"
          />
        </div>
        <button onClick={() => TestUPLOAD_DATA()}>
          Test the random item generator 
        </button> 
      </div>
    </div>
  );
}

export default AddItem;