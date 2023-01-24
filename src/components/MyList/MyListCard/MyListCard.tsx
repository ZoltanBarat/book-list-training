import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UpdateIDContext } from '../../../context/UpdateIDContext';
import Button from '../../../elements/Button';
import ItemDataService, { Item } from "../../../services/firebase-services";
import { DateConverter } from '../../../services/date-converter';
import "./MyListCard.css"
import { useTranslation } from 'react-i18next';

function MyListCard(props: {
  itemDetails: Item;
  setItemDeleted: Function;
  itemDeleted: number;
}) {
  
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [updateId, setUpdateId] = useContext(UpdateIDContext);
  const [onDelete, setOnDelete] = useState(false);

  const deleteHandler = async (id: string) => {
    await ItemDataService.deleteItem(id);
  };

  return (
    <div className="myListItemContainer">
      <div className="myListItemTextGrid">
        <div className="myListItem__imgColumn">
          <img
            className="myListImg"
            src={props.itemDetails.imgUrl}
            alt={props.itemDetails.item.name}
          />
        </div>
        <div className="myListItem__column">
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.name')}:</div>
            <div className="myListItem__details">
              {props.itemDetails.item.name}
            </div>
          </div>
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.price')}:</div>
            <div className="myListItem__details">
              {props.itemDetails.item.price} HUF
            </div>
          </div>
        </div>

        <div className="myListItem__column">
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.gender')}:</div>
            <div className="myListItem__details">
              {props.itemDetails.item.gender}
            </div>
          </div>
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.type')}:</div>
            <div className="myListItem__details">
              {props.itemDetails.item.type}
            </div>
          </div>
        </div>

        <div className="myListItem__column">
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.size')}:</div>
            <div className="myListItem__details">
              {props.itemDetails.item.size}
            </div>
          </div>
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.brand')}:</div>
            <div className="myListItem__details">
              {props.itemDetails.item.brand}
            </div>
          </div>
        </div>

        <div className="myListItem__column">
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.color')}:</div>
            <div className="myListItem__details">
              {props.itemDetails.item.color}
            </div>
          </div>
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.city')}:</div>
            <div className="myListItem__details">
              {props.itemDetails.item.city}
            </div>
          </div>
        </div>

        <div className="myListItem__column">
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.uploaded')}:</div>
            <div className="myListItem__details">
              {DateConverter(props.itemDetails.date)}
            </div>
          </div>
          <div className="myListItem__element">
            <div className="myListItem__title">{t('product.description')}:</div>
            <div className="myListItem__details">
              <div className="descriptionButton">
                {t('product.show')}
                <span className="descriptiontext">
                  {props.itemDetails.item.description === ""
                    ? "--No description--"
                    : props.itemDetails.item.description}
                </span>
              </div>
            </div>
          </div>
        </div>
        {onDelete ? (
          <div className="myListItem__buttonColumn">
            <div className="myListItem__buttonColumn__Text">{t('product.sure')}</div>

            <div className="myListInnerDelete">
              <button
                className="myListInnerDelete__ok myListInnerDeleteButton"
                onClick={() => {
                  if (props.itemDetails.id) {
                    deleteHandler(props.itemDetails.id);
                    props.setItemDeleted(props.itemDeleted + 1);
                  }
                }}
              >
                ✔
              </button>
              <button
                className="myListInnerDelete__cancel myListInnerDeleteButton"
                onClick={() => {
                  setOnDelete(false);
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="myListItem__buttonColumn">
            <Button
              text={t('product.delete')}           
              onClick={() => {
                setOnDelete(true);
              }}
            />

            <Button
              text={t('product.edit')}             
              onClick={() => {
                setUpdateId(props.itemDetails.id);
                navigate("/update"); 
              }}
            >
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyListCard