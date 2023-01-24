import React, { useState } from "react";
import "./ItemListSide.css";
import { clothingTypes } from "../../clothingTypes";
import { useTranslation } from "react-i18next";


export default function ItemListSide({ subSearch, setSubSearch, mainSearch }: { subSearch: string; setSubSearch: Function; mainSearch: string }) {
  const { i18n } = useTranslation();
  const [focus, setFocus] = useState<null | number>(null)
  

  function handleClick(index: number, clothingType: string) {
    setSubSearch(`${clothingType}`);
    setFocus(index);
  }
  return (
    <div className="sideContainer">
      <div className="sideContainer__category">
        <button
          className={`sideContainer__category__title sideButton ${focus === null ? '--active-type' : ''}`}
          onClick={() => {
            setSubSearch("all");
            setFocus(null);
          }}
        >
        {mainSearch}
        </button>
        <div className="sideContainer__category__list">
          {(i18n.language === "en" ? clothingTypes.en : clothingTypes.hu).map((clothingType, index) => (
            <button
              key={index}
              className={`sideContainer__category__list__item sideButton ${focus === index ? '--active-type' : ''}`}
              onClick={() => {handleClick(index, clothingType)
                
              }}
            >
              {clothingType}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
