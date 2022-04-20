import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import Button from '../../elements/Button';
import ItemDataService, { Item } from "../../services/book-services";
import { DateConverter } from "../../services/date-converter";
import "./Product.css";

function Product(props: { id: string }) {

  const [message, setMessage] = useState({ error: false, msg: "" });
  const [item, setItem] = useState<Item>();
  const { user } = useUserAuth();
  
  const dataLoader = async () => {
     setMessage({ error: false, msg: "" });

     try {
       const docSnap = await ItemDataService.getItem(props.id);
      
       console.log("a docSnap: ",docSnap.data());
   
       if (docSnap.data() ) {
        setItem({
           item: {
             name: docSnap.data()?.item.name,
             price: docSnap.data()?.item.price,
             gender: docSnap.data()?.item.gender,
             type: docSnap.data()?.item.type,
             size: docSnap.data()?.item.size,
             brand: docSnap.data()?.item.brand,
             color: docSnap.data()?.item.color,
             city: docSnap.data()?.item.city,
             description: docSnap.data()?.item.description,
           },
           date: docSnap.data()?.date,
           imgUrl: docSnap.data()?.imgUrl,
           uploaderName: docSnap.data()?.uploaderName,
           uploaderEmail: docSnap.data()?.uploaderEmail,
        });
       }

       console.log(item);
       
     } catch (err: any) {
       setMessage({ error: true, msg: err.message });
     }
  };



  useEffect(() => {
     window.scrollTo(0, 0);
     dataLoader();  
   }, [props.id]);
  
  
  return (
    <div className="centerContainer">
      <div className="subCenterContainer">
        <div className="productWrapper">
          <button
            className="productBackButton"
            onClick={() => window.history.back()}
          >
            ← back
          </button>
          <h2>{item?.item.name}</h2>
          <div className="product__itemContainer">
            <div className="product__pictureContainer">
              <img
                className="product__picture"
                src={item?.imgUrl}
                alt={item?.item.name}
              />
            </div>
            <div className="product__itemTextContainer">
              <div className="product__item">
                <div className="product__item__title">Price:</div>
                <div className="product__item__details">
                  {item?.item.price} HUF
                </div>
              </div>

              <div className="product__item">
                <div className="product__item__title">Gender:</div>
                <div className="product__item__details">
                  {item?.item.gender}
                </div>
              </div>

              <div className="product__item">
                <div className="product__item__title">Type:</div>
                <div className="product__item__details">{item?.item.type}</div>
              </div>

              <div className="product__item">
                <div className="product__item__title">Size:</div>
                <div className="product__item__details">{item?.item.size}</div>
              </div>

              <div className="product__item">
                <div className="product__item__title">Brand:</div>
                <div className="product__item__details">{item?.item.brand}</div>
              </div>

              <div className="product__item">
                <div className="product__item__title">Color:</div>
                <div className="product__item__details">{item?.item.color}</div>
              </div>

              <div className="product__item">
                <div className="product__item__title">City:</div>
                <div className="product__item__details">{item?.item.city}</div>
              </div>

              {
                <div className="product__item">
                  <div className="product__item__title">Uploaded:</div>
                  <div className="product__item__details">
                    {item && DateConverter(item.date)}
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="product__item__title">Description:</div>
          <div className="product__line"></div>
          <div className="product__item__details itemDescription">
            {item?.item.description === ""
              ? "--No description for this item--"
              : item?.item.description}
          </div>

          <div className="uploaderConatiner">
            <div className="product__line --userLine"></div>
            <div title="Uploader" className="uploaderName">
              <div className="uploaderName__text">{item?.uploaderName}</div>
            </div>
            {user === null ? (
              <p className="uploaderLogInAlert">
                Please{" "}
                <a href="#top">
                  <Link to="/login">Log in</Link>
                </a>{" "}
                if you interested in this item!
              </p>
            ) : (
              <a
                className="uploaderEmail"
                href={`mailto:${item?.uploaderEmail}?subject=Intrest in ${item?.item.name}&body=Hi ${item?.uploaderName},%0D%0AI'm intrested is this dress!`}
              >
                Send email
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

