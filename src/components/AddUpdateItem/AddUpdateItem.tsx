import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import Button from '../../elements/Button';
import { storage } from "../../firebase-config";
import ItemDataService from '../../services/firebase-services';
import "./AddUpdateItem.css";
import {clothingTypes} from "../../clothingTypes"
import { useTranslation } from "react-i18next";


function AddItem({ id, setItemId }: { id: string, setItemId: Function }) {
  
  const { t, i18n } = useTranslation();
  const { user } = useUserAuth();

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

    if (progress === "Done") {
      const newItem = {
        item,
        date: date.milliseconds,
        imgUrl,
        uploaderName: user.displayName,
        uploaderEmail: user.email.toLowerCase(),
      };

      try {
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
   
  return (
  
      <div className="subCenterContainer">
        <div>{message.msg}</div>
        <h2 className="AddUpMain__title">{t("product.addew")}</h2>
        <div className="AddUpItemWrapper">
          <div className="formContainer">
            <form id="addItemForm" onSubmit={handleSubmit}>
              <div className="inputContainer">
                <label>
                  {t("product.name")}
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
                  {t("product.price")}
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
                  {t("product.gender")}
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
                  {t("product.type")}
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
                    {(i18n.language === "en" ? clothingTypes.en : clothingTypes.hu).map((types, index) => (
                      <option key={index} value={types} />
                    ))}
                  </datalist>
                </label>
              </div>

              <div className="inputContainer">
                <label>
                  {t("product.size")}
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
                  {t("product.brand")}
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
                  {t("product.color")}
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
                  {t("product.city")}
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
                  {t("product.description")}
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
            <label>{t("product.picture")}</label>
            <div className="fileUpButton__container">
              <form className="fileUpForm" /* onSubmit={handleUpload} */>
                <label htmlFor="imgPre" className="fileUpButton">
                  🗀 {t("product.file")}
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
                  text={t("product.upload")}
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
            text={t("product.submit")}
            margin
            type="submit"
            form="addItemForm"
            value="submit"
          />
        </div>
      </div>
   
  );
}

export default AddItem;