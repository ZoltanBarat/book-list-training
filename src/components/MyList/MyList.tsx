import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext';
import ItemDataService, { Item } from "../../services/firebase-services";
import Loading from '../Loading/Loading';
import "./MyList.css";
import MyListCard from './MyListCard/MyListCard';


function MyList() {
  const { user } = useUserAuth();
  const [userItems, setUserItems] = useState<Item[] | any>();
  const [itemDeleted, setItemDeleted] = useState(0);
 
  const getItemsByEmail = async (target: string) => {
    const data = await ItemDataService.simpleSearch("uploaderEmail", target);
    setUserItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  



  useEffect(() => {
    if (user) {
      getItemsByEmail(user.email);
    }
  }, [user, itemDeleted]);


  if (userItems) {
    return (
      
        <div className="subCenterContainer">
          {userItems.length <= 0 ? (
            <h2>You don't have any items yet</h2>
          ) : (
            <h2>Your items:</h2>
          )}

          <div className="myListWrapper">
            {userItems &&
              userItems.map((item: Item) => {
                return (
                  <MyListCard
                    key={item.id}
                    itemDetails={item}
                    setItemDeleted={setItemDeleted}
                    itemDeleted={itemDeleted}
                  />
                );
              })}
          </div>
        </div>
    
    );
  }

  return <Loading />  
}

export default MyList;