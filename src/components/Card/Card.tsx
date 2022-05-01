import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';
import { Item } from '../../services/firebase-services';
import { DateConverter } from '../../services/date-converter';
import "./Card.css";

function Card(props: { itemDetails: Item; setItemId: Function }) {
  return (
    <Link
      to={`/product/${props.itemDetails.id}`}
      onClick={() => props.setItemId(props.itemDetails.id)}
      className="cardNavLink"
    >
      <div className="cardWrapper">
        <div className="cardImageContainer">
          <div className="cardImageEffect"></div>
          <img
            loading="lazy"
            className="cardImage"
            src={props.itemDetails.imgUrl}
            alt={props.itemDetails.item.name}
          />
        </div>
        <div className="cardTextContainer">
          <div>Test: {props.itemDetails.item.gender}</div>
          <div className="cardText__name">{props.itemDetails.item.name}</div>
          <div className="cardText__size">
            Size: <span>{props.itemDetails.item.size}</span>
          </div>
          <div className="cardText__price">
            {parseInt(props.itemDetails.item.price)} <span>HUF</span>
          </div>
          <div className="cardText__date">
            {props.itemDetails.date !== undefined
              ? DateConverter(props.itemDetails.date)
              : "NA"}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;

