import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext';
import ItemDataService, { Item } from "../../services/book-services";
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
      <div className="centerContainer">
        <div className="subCenterContainer">
          {userItems.length <= 0 ? (
            <h2>You don't have any items yet</h2>
          ) : (
            <h2>Your items:</h2>
          )}

          {/*         <button
          onClick={() => {
            console.log(itemDeleted);
          }}
        >
          {" "}
          test2
        </button>
        <div>{itemDeleted}</div> */}

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
      </div>
    );
  }

  return <Loading />

  
}

export default MyList;


 /*  <div>
    <table className="myList__table">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Item Name</th>
          <th>Price (HUF)</th>
          <th>Gender</th>
          <th>Type</th>
          <th>Size</th>
          <th>Brand</th>
          <th>Color</th>
          <th>City</th>
          <th>Uploaded</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userItems &&
          userItems.map((item: Item, index: number) => {
            return (
              <tr key={item.id}>
                {console.log(item.id)}
                <td>
                  <img
                    className="myList__table__img"
                    src={item.imgUrl}
                    alt={item.item.name}
                  />
                </td>
                <td>{item.item.name}</td>
                <td>{item.item.price}</td>
                <td>{item.item.gender}</td>
                <td>{item.item.type}</td>
                <td>{item.item.size}</td>
                <td>{item.item.brand}</td>
                <td>{item.item.color}</td>
                <td>{item.item.city}</td>
                <td>{DateConverter(item.date)}</td>
                <td>{item.item.description}</td>

                <td>
                  <div
                    className="myList__deleteButton"
                    onClick={() => {
                      if (item.id) {
                        deleteHandler(item.id);
                        getItemsByEmail(user.email);
                      }
                    }}
                  >
                    X
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>; */

/*    <tr key={item.item.id}>
     {console.log(item)}
     <td>{index + 1}</td>
     <td>{item.item.name}</td>
     <td>{item.author}</td>
     <td>{item.avaible}</td>

     <td>
       <img src={item.imgUrl} alt="item" />
     </td>
     <td>
       <button
         onClick={() => {
           getItemId(item.id);
         }}
       >
         <Link to={`/product/${item.id}`}>Edit item</Link>
       </button>
       <button
         onClick={() => {
           deleteHandler(item.id);
           getAllItem();
         }}
       >
         Delete
       </button>
     </td>
     <td>
       {item.date !== undefined ? DateConverter(item.date.seconds) : "NA"}
     </td>
   </tr>; 
   
   
   
     <button
            onClick={() => {
                                    if (item.id) {
                                      deleteHandler(item.id);  
                                    }
           
         }}
       >
         Delete
       </button>
       
       */


/*        <div key={item.id} className="myListItemContainer">
         <div className="myListItemTextGrid">
           {console.log(item)}
           <div className="myListItem__imgColumn">
             <img
               className="myListImg"
               src={item.imgUrl}
               alt={item.item.name}
             />
           </div>
           <div className="myListItem__column">
             <div className="myListItem__element">
               <div className="myListItem__title">Name:</div>
               <div className="myListItem__details">{item.item.name}</div>
             </div>
             <div className="myListItem__element">
               <div className="myListItem__title">Price:</div>
               <div className="myListItem__details">{item.item.price} HUF</div>
             </div>
           </div>

           <div className="myListItem__column">
             <div className="myListItem__element">
               <div className="myListItem__title">Gender:</div>
               <div className="myListItem__details">{item.item.gender}</div>
             </div>
             <div className="myListItem__element">
               <div className="myListItem__title">Type:</div>
               <div className="myListItem__details">{item.item.type}</div>
             </div>
           </div>

           <div className="myListItem__column">
             <div className="myListItem__element">
               <div className="myListItem__title">Size:</div>
               <div className="myListItem__details">{item.item.size}</div>
             </div>
             <div className="myListItem__element">
               <div className="myListItem__title">Brand:</div>
               <div className="myListItem__details">{item.item.brand}</div>
             </div>
           </div>

           <div className="myListItem__column">
             <div className="myListItem__element">
               <div className="myListItem__title">Color:</div>
               <div className="myListItem__details">{item.item.color}</div>
             </div>
             <div className="myListItem__element">
               <div className="myListItem__title">City:</div>
               <div className="myListItem__details">{item.item.city}</div>
             </div>
           </div>

           <div className="myListItem__column">
             <div className="myListItem__element">
               <div className="myListItem__title">Date:</div>
               <div className="myListItem__details">
                 {DateConverter(item.date)}
               </div>
             </div>
             <div className="myListItem__element">
               <div className="myListItem__title">Description:</div>
               <div className="myListItem__details">
                 <div className="descriptionButton">
                   show
                   <span className="descriptiontext">
                     {item.item.description === ""
                       ? "--No description--"
                       : item.item.description}
                   </span>
                 </div>
               </div>
             </div>
           </div>
           {onDelete ? (
             <div className="myListItem__buttonColumn">
               <Button
                 text="Delete"
                 standardColor={false}
                 redColor={true}
                 onClick={() => {
                   if (item.id) {
                     deleteHandler(item.id);
                     getItemsByEmail(user.email);
                   }
                 }}
               />
               <Button
                 text="Cancel"
                 standardColor={false}
                 greenColor={true}
                 onClick={() => {
                   setOnDelete(false);
                 }}
               />
             </div>
           ) : (
             <div className="myListItem__buttonColumn">
               <Button
                 text="Delete"
                 standardColor={true}
                 onClick={() => {
                   setOnDelete(true);
                 }}
               />

               <Button text="Edit" standardColor={true} />
             </div>
           )}
         </div>
       </div>; */