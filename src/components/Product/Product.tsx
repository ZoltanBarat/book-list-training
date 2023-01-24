import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import ItemDataService, { Item } from "../../services/firebase-services";
import { DateConverter } from "../../services/date-converter";
import "./Product.css";
import { useTranslation } from "react-i18next";
import toast from "react-simple-toasts";

function Product(props: { id: string }) {
  const { t } = useTranslation();
  const [item, setItem] = useState<Item>();
  const { user } = useUserAuth();

  const dataLoader = async () => {
    try {
      const docSnap = await ItemDataService.getItem(props.id);

      console.log("a docSnap: ", docSnap.data());

      if (docSnap.data()) {
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
      toast(<strong>{err.message}</strong>);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dataLoader();
  }, [props.id]);

  return (
    <div className="productWrapper">
      <div className="product__itemContainer">
        <div className="product__pictureContainer">
          <button className="productBackButton" onClick={() => window.history.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px">
              <path
                clipRule="evenodd"
                d="M11.262,16.714l9.002,8.999  c0.395,0.394,1.035,0.394,1.431,0c0.395-0.394,0.395-1.034,0-1.428L13.407,16l8.287-8.285c0.395-0.394,0.395-1.034,0-1.429  c-0.395-0.394-1.036-0.394-1.431,0l-9.002,8.999C10.872,15.675,10.872,16.325,11.262,16.714z"
                fill="#121313"
                fillRule="evenodd"
                id="Chevron_Right"
              />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </button>

          <img className="product__picture" src={item?.imgUrl} alt={item?.item.name} />
        </div>
        <div className="product__itemTextContainer">
          <h2>{item?.item.name}</h2>
          <div className="product__item">
            <div className="product__item__title">{t("product.price")}:</div>
            <div className="product__item__details">{item?.item.price} HUF</div>
          </div>

          <div className="product__item">
            <div className="product__item__title">{t("product.gender")}:</div>
            <div className="product__item__details">{item?.item.gender}</div>
          </div>

          <div className="product__item">
            <div className="product__item__title">{t("product.type")}:</div>
            <div className="product__item__details">{item?.item.type}</div>
          </div>

          <div className="product__item">
            <div className="product__item__title">{t("product.size")}:</div>
            <div className="product__item__details">{item?.item.size}</div>
          </div>

          <div className="product__item">
            <div className="product__item__title">{t("product.brand")}:</div>
            <div className="product__item__details">{item?.item.brand}</div>
          </div>

          <div className="product__item">
            <div className="product__item__title">{t("product.color")}:</div>
            <div className="product__item__details">{item?.item.color}</div>
          </div>

          <div className="product__item">
            <div className="product__item__title">{t("product.city")}:</div>
            <div className="product__item__details">{item?.item.city}</div>
          </div>

          {
            <div className="product__item">
              <div className="product__item__title">{t("product.uploaded")}:</div>
              <div className="product__item__details">{item && DateConverter(item.date)}</div>
            </div>
          }

          <div>
            <div className="product__item__title">{t("product.description")}:</div>
            <div className="product__line"></div>
            <div className="product__item__details itemDescription">
              {item?.item.description === "" ? "--No description for this item--" : item?.item.description}
            </div>
          </div>
        </div>
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
            className="uploaderEmail btn"
            href={`mailto:${item?.uploaderEmail}?subject=Intrest in ${item?.item.name}&body=Hi ${item?.uploaderName},%0D%0AI'm intrested is this dress!`}
          >
            Send email
          </a>
        )}
      </div>
    </div>
  );
}

export default Product;
