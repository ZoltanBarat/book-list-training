import React from "react";
import { Link } from "react-router-dom";
import { Item } from "../../services/firebase-services";
import { DateConverter } from "../../services/date-converter";
import "./Card.css";
import { useTranslation } from "react-i18next";

function Card(props: { itemDetails: Item; setItemId: Function }) {
  const { t } = useTranslation();

  return (
    <Link to={`/product/${props.itemDetails.id}`} onClick={() => props.setItemId(props.itemDetails.id)} className="cardNavLink">
      <div className="cardWrapper">
        <div className="cardImageContainer">
          <img loading="lazy" className="cardImage" src={props.itemDetails.imgUrl} alt={props.itemDetails.item.name} />
        </div>
        <div className="cardTextWrapper">
        <div className="cardTextContainer">
          {/*   <div>Test: {props.itemDetails.item.gender}</div> */}
          <div className="cardText__name">{props.itemDetails.item.name}</div>

          <div className="cardText__price">
            {parseInt(props.itemDetails.item.price)}{" "}
            <span>
              <i>HUF</i>
            </span>
            </div>
            <div  className="cardText__sizeDateContainer">
            <div className="cardText__size">
              {t("itemList.size")}: <span>{props.itemDetails.item.size}</span>
            </div>
              <div className="cardText__date">
                {DateConverter(props.itemDetails.date)}
              </div>
                </div>
           

       
            <div className="cardButtonWrapper">
              <button className="btn cardButton" style={{  width: "100%" }} >{t("itemList.details")}</button>              
            </div>
          </div>
          </div>
      </div>
    </Link>
  );
}

export default Card;
