import React from 'react'
import ItemList from '../components/ItemList/ItemList';
import "./HomePage.css"

function HomePage({
  setItemId,
  mainSearch,
}: {
  setItemId: Function;
  mainSearch: string;
}) {
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
      <ItemList setItemId={setItemId} mainSearch={mainSearch} />
    </div>
  );
}

export default HomePage

