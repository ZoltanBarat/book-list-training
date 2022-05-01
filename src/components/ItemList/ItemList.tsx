import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import ItemDataService, { Item } from '../../services/firebase-services';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import "./ItemList.css";



function ItemList({
  setItemId,
  mainSearch,
}: {
  setItemId: Function;
  mainSearch: string;
  }) {
  
  let { user } = useUserAuth();

  const [items, setItems] = useState<Item | any>();

  const [searchTarget, setSearchTarget] = useState("");
  const [searchWhere, setSearchWhere] = useState("title");

  useEffect(() => {
    if (mainSearch === "woman") {
      mainCategorySearch("woman");
    }

    if (mainSearch === "man") {
      mainCategorySearch("man");
    }

    if (mainSearch === "") {
      getAllItem();
    }
  }, [mainSearch]);

  const getAllItem = async () => {
    const data = await ItemDataService.getAllItems();
    setItems(data.docs.map((item) => ({ ...item.data(), id: item.id })));
  };

  const mainCategorySearch = async (target: string) => {
    const q = await ItemDataService.simpleSearch("item.gender", target);
    setItems(q.docs.map((item) => ({ ...item.data(), id: item.id })));
  };

/*   const testSearch = async (target: string) => {
    const keywordsArray = target.split(" ");

    if (keywordsArray.length <= 1 && keywordsArray.includes("")) {
      getAllItem();
    } else {
      const q = await ItemDataService.search(searchWhere, keywordsArray);
      setItems(q.docs.map((item) => ({ ...item.data(), id: item.id })));
    }

    console.log(searchWhere);
    console.log(keywordsArray);
  };
 */

  if (items) {
    return (
      <div className="centerContainer">
        <div className="subCenterContainer">
          <h2 className="itemListTitle">
            {mainSearch === ""
              ? "All"
              : mainSearch.charAt(0).toUpperCase() + mainSearch.slice(1)}{" "}
            items:
          </h2>
          
          {/*  
          <input
            type="text"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
          />
          <label>
            Where:
            <select
              name="searchWhere"
              value={searchWhere}
              onChange={(e) => {
                setSearchWhere(e.target.value);
                console.log(searchWhere);
              }}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </label>

         <button onClick={() => testSearch(searchTarget)}>Search</button>
          <button onClick={() => console.log()}>id</button> */}

          <div className="cardContainer">
            {items
              .sort(
                (a: { date: number }, b: { date: number }) => b.date - a.date
              )
              .map((item: Item, index: number) => (
                <Card key={item.id} itemDetails={item} setItemId={setItemId} />
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }  
}

export default ItemList;