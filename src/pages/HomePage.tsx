import React, { useState } from 'react'
import ItemList from '../components/ItemList/ItemList';
import "./HomePage.css";
import ItemListSide from '../components/ItemListSide/ItemListSide';

function HomePage({
  setItemId,
  mainSearch,
}: {
  setItemId: Function,
  mainSearch: string,
  }) {
  const [subSearch, setSubSearch] = useState("all");

  return (
    <div>
      <div>
        <img
          className="bannerIMG"
          src="https://media-spring.cabionline.com/wp-content/uploads/2020/07/cabi-Clothing-Fall-2020-Collection-feature-1.jpg"
          alt="women in dress"
          /* https://www.cabionline.uk/2020/07/21/the-inspiration-behind-our-fall-2020-collection/?__locale=GBR */
        />
      </div>
      <section className="mainList">
        <ItemListSide subSearch={subSearch} setSubSearch={setSubSearch } mainSearch={mainSearch}/>
        <ItemList setItemId={setItemId} mainSearch={mainSearch} subSearch={subSearch} setSubSearch={setSubSearch } />
      </section>
    </div>
  );
}

export default HomePage

