import ItemDataService from '../services/firebase-services.ts';

const Name = ["Patterned", "Worn", "Vintage", "Modern", "Colorful", "Novel"];
const Price = ["1500","3000","10000","6500","2500","4600","3250","8400",];
const Gender = ["woman","man"];
const Type = [
    "Sweater",
    "Dress",
    "Hoodies",
    "T-shirt",
    "Flip-flops",
    "Shorts",
    "Skirt",
    "Jeans",
    "Shoes",
    "Coat",
    "High heels",
    "Suit",
    "Cap",
    "Socks",
    "Shirt",
    "Bra",
    "Scarf",
    "Swimsuit",
    "Hat",
    "Gloves",
    "Jacket",
    "Long coat",
    "Boots",
    "Sunglasses",
    "Tie",
    "Polo shirt",
    "Leather jackets",
];
const Size = [
    "S","M","L","XL"
];
const Brand = ["Nike", "GUCCI", "Louis Vuitton", "Adidas", "Chanel", "ZARA", "UNIQLO", "H&M", "Cartier", "Hermès", "Rolex", "Dior", "Tiffany & Co.", "Chow Tai Fook", "COACH", "The North Face", "Anta", "Victoria's Secret", "Omega", "Puma", "Burberry", "Ralph Lauren", "Ray-Ban", "Levi's", "Lululemon"];
const Color = ["Red", "Pink", "Orange", "Yellow", "Purple", "Green", "Blue", "Brown"];
const City = ["Budapest","Szeged","Debrecen","Győr","Pécs","Kecskemét"];
const Description = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit ac neque consequat blandit. Aenean a dignissim tellus. Donec faucibus vulputate metus, nec feugiat eros fringilla ut. Phasellus consequat accumsan ipsum, a tempus justo consequat eget. Donec a orci leo. Cras non gravida elit. Ut ut placerat nunc, sit amet venenatis felis. Sed vel dolor massa. Vivamus lobortis erat quis vehicula convallis. Nam sem dui, laoreet sed dui sed, commodo sollicitudin lacus. Nulla quis leo quis ligula aliquet vulputate.",
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Integer blandit ac neque consequat blandit. Aenean a dignissim tellus.
    Donec faucibus vulputate metus, nec feugiat eros fringilla ut.
    Phasellus consequat accumsan ipsum, a tempus justo consequat eget.
    Donec a orci leo. Cras non gravida elit. Ut ut placerat nunc, sit amet venenatis felis. Sed vel dolor massa. Vivamus lobortis erat quis vehicula convallis. Nam sem dui, laoreet sed dui sed, commodo sollicitudin lacus. Nulla quis leo quis ligula aliquet vulputate.`,

    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit ac neque consequat blandit. ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
     `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Integer blandit ac neque consequat blandit. Aenean a dignissim tellus.
    Donec faucibus vulputate metus, nec feugiat eros fringilla ut.
    Phasellus consequat accumsan ipsum, a tempus justo consequat eget.
    Donec a orci leo. Cras non gravida elit.`,
     `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Integer blandit ac neque consequat blandit. Aenean a dignissim tellus.
    Donec faucibus vulputate metus, nec feugiat eros fringilla ut.
    Phasellus consequat accumsan ipsum, a tempus justo consequat eget.
    Donec a orci leo. Cras non gravida elit. Ut ut placerat nunc, sit amet venenatis felis. Sed vel dolor massa.
    Vivamus lobortis erat quis vehicula convallis.
    Nam sem dui, laoreet sed dui sed, commodo sollicitudin lacus.
    Nulla quis leo quis ligula aliquet vulputate.`,
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Integer blandit ac neque consequat blandit. Aenean a dignissim tellus.
    Donec a orci leo. Cras non gravida elit. Ut ut placerat nunc, sit amet venenatis felis. Sed vel dolor massa. Vivamus lobortis erat quis vehicula convallis. Nam sem dui, laoreet sed dui sed, commodo sollicitudin lacus. Nulla quis leo quis ligula aliquet vulputate.`,
];
const ImgUrl = [
    "https://firebasestorage.googleapis.com/v0/b/react-booklist-eb75d.appspot.com/o/images%2F1595537107-15244685_26367964_1000.jpg?alt=media&token=b1bc707e-2278-4674-84f8-5f811497cb3e",
    "https://firebasestorage.googleapis.com/v0/b/react-booklist-eb75d.appspot.com/o/images%2F1595537013-1170588_in_2000_q80.jpg?alt=media&token=2fef8f89-448a-4f13-ad23-ddef508e9c2c",
    "https://firebasestorage.googleapis.com/v0/b/react-booklist-eb75d.appspot.com/o/images%2F1595538951-large_proenza-schouler-red-pleated-poplin-maxi-dress.jpg?alt=media&token=eda8b573-36dd-4df9-af2c-208c8882c141",
    "https://firebasestorage.googleapis.com/v0/b/react-booklist-eb75d.appspot.com/o/images%2FHFM-DGY_HFS-Dawn-Gray_AngleR_0140b-770x500.jpeg?alt=media&token=bf303808-1210-4b19-93b1-a95a3c89d45b",
    "https://firebasestorage.googleapis.com/v0/b/react-booklist-eb75d.appspot.com/o/images%2Fimage.jpg?alt=media&token=4c8fd613-cb4a-40fc-aece-9b8d43cc063a",
];
const UpDate = [1648716356372,1648203096000,1646388696000,1645870296000,1645697496000,1644833496000,1644055896000,1646043096000];


const User = {
    UploaderName: "Test Elek",
    UploaderEmail: "test@test.test"
}

const repeat = 8;

  /*
    Olivia Smith   
    olivia@testmailx.com
    123456

    Charlotte 
    charlotte@testmailx.com
    123456

    Isabella
    isabella@testmailx.com
    123456

    Lucas Miller
    lucas@testmailx.com
    123456

    Test User
    test@testmailx.com
    123456

    Test Elek
    test@test.test
    123456
  */



function generateRandomItem() {
    let newItem = {
       item: {        
            price: getRandomItemFromArray(Price),
            gender: getRandomItemFromArray(Gender),
            type: getRandomItemFromArray(Type),
            size: getRandomItemFromArray(Size),
            brand: getRandomItemFromArray(Brand),
            color: getRandomItemFromArray(Color),
            city: getRandomItemFromArray(City),
            description: getRandomItemFromArray(Description),
           
        },
      date: getRandomItemFromArray(UpDate),
      imgUrl: getRandomItemFromArray(ImgUrl),
      uploaderName: User.UploaderName,
      uploaderEmail: User.UploaderEmail,
    };

    newItem.item.name = getRandomItemFromArray(Name)+ " " + newItem.item.type; 

    return newItem;
}


function getRandomItemFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

let testArray = [];

function test() {
    for (let i = 0; i < repeat; i++) {
        testArray[i] = generateRandomItem();
    }
}

export const TestUPLOAD_DATA = async () => { 

    test();   
    

    try {    
         for (let testItem of testArray) {
            await ItemDataService.addItems(testItem);       
            console.log("uploaded: ", testItem);
        }        
     
    } catch (err) {
     console.log(err.message)
    }
 
  } 


