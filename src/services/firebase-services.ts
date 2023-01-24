import { database } from "../firebase-config";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore";

export interface Item {    
    item: {        
        name: string;
        price: string;
        gender: string;
        type: string;
        size: string;
        brand: string;
        color: string;
        city: string;
        description: string;
    };
    date: number;
    imgUrl: string;
    id?: string;
    uploaderName?: string;
    uploaderEmail?: string;
}

const itemCollectionRef = collection(database, "items")

class ItemDataService {
    addItems = (newItem: Item) => {
        return addDoc(itemCollectionRef, newItem)
    }

    updateItem = (id: string, updatedItem: any) => {
        const itemDoc = doc(database, "items", id);
        return updateDoc(itemDoc, updatedItem);
    }

    deleteItem = (id: string) => {
        const itemDoc = doc(database, "items", id);
        return deleteDoc(itemDoc);
    }

    getAllItems = () => {
        return getDocs(itemCollectionRef);
    }

    getItem = (id: string) => {
        const itemDoc = doc(database, "items", id);
        return getDoc(itemDoc);
    }

    search = (searchWhere: string, keywords: string[] ) => {
        const q = query(itemCollectionRef, where(searchWhere, "in", keywords));
        return getDocs(q);
    }

    simpleSearch = (whereToSearch: string ,target: string) => {
        const q = query(itemCollectionRef, where(whereToSearch, "==", target));
        return getDocs(q);
    }
}

export default new ItemDataService();

