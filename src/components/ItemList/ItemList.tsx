import React, { useEffect, useState } from "react";
import ItemDataService, { Item } from "../../services/firebase-services";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import "./ItemList.css";
import { useTranslation } from "react-i18next";
import toast from 'react-simple-toasts';

function ItemList({
  setItemId,
  mainSearch,
  subSearch,
  setSubSearch,
}: {
  setItemId: Function;
  mainSearch: string;
  subSearch: string;
  setSubSearch: Function;
  }) {
  
  const { t } = useTranslation();
  const [items, setItems] = useState<Item | any>();
  const [filteredItems, setFilteredItems] = useState<Item | any>();
  const [sort, setSort] = useState("dateNewer");

  useEffect(() => {
    if (mainSearch === "woman") {
      mainCategorySearch("woman");
    }

    if (mainSearch === "man") {
      mainCategorySearch("man");
    }

    if (mainSearch === "all") {
      getAllItem();
    }
  }, [mainSearch]);

  useEffect(() => {
    if (items) {
      typeSearch(items, subSearch);
    }
  }, [subSearch, items]);

  const getAllItem = async () => {
    try {
      const data = await ItemDataService.getAllItems();
      setItems(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    } catch (error: any) {
      toast(<h3 className="toast">{error.message}</h3>);
    } 
  };

  const mainCategorySearch = async (target: string) => {
    try {
      const data = await ItemDataService.simpleSearch("item.gender", target);
      setItems(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    } catch (error: any) {
      toast(<h3 className="toast">{error.message}</h3>);
    }
  };

  const typeSearch = (nestedObj: Array<Item>, target: string) => {
    let filteredObj = nestedObj.filter((element: any) => element.item.type === target);
    setFilteredItems(filteredObj);
  };

  function cardFiltering(data: Array<Item>) {

    if (data) {
      if (data.length === 0) {
        return <h3>{t("itemList.noItem")}</h3>
      }
    }
    
    if (sort === "dateNewer") {
      return data.sort((a: any, b: any) => b.date - a.date).map((item: Item) => <Card key={item.id} itemDetails={item} setItemId={setItemId} />);
    }
    if (sort === "dateOlder") {
      return data.sort((a: any, b: any) => a.date - b.date).map((item: Item) => <Card key={item.id} itemDetails={item} setItemId={setItemId} />);
    }
    if (sort === "priceHeight") {
      return data
        .sort((a: any, b: any) => parseInt(b.item.price) - parseInt(a.item.price))
        .map((item: Item) => <Card key={item.id} itemDetails={item} setItemId={setItemId} />);
    }
    if (sort === "priceLow") {
      return data
        .sort((a: any, b: any) => parseInt(a.item.price) - parseInt(b.item.price))
        .map((item: Item) => <Card key={item.id} itemDetails={item} setItemId={setItemId} />);
    }
  }

  if (items) {
    return (
      <div className="centerContainer">
        <div className="itemListWrapper">
          <div className="itemListHead">
            <div className="itemListTitleContainer">
              <h2 className="itemListTitle"><span>{ mainSearch}</span> {t("itemList.items")}</h2>
              <span className="itemListAll" title="item count">{subSearch === "all" ? items.length : filteredItems.length }</span>
            </div>
            <select className="itemList__sort" onChange={(e) => setSort(e.target.value)}>
              <option value="dateNewer">{t("itemList.newer")}</option>
              <option value="dateOlder">{t("itemList.older")}</option>
              <option value="priceHeight">{t("itemList.priceHight")}</option>
              <option value="priceLow">{t("itemList.priceLow")}</option>
            </select>
          </div>

          {console.log(subSearch)}
          <div className="cardContainer">
            {subSearch === "all" ? cardFiltering(items) : filteredItems ? cardFiltering(filteredItems) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default ItemList;