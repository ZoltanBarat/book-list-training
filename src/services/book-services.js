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


const bookCollectionRef = collection(database, "books")

class BookDataService {
    addBooks = (newBook) => {
        return addDoc(bookCollectionRef, newBook)
    }

    updateBook = (id, updatedBook) => {
        const bookDoc = doc(database, "books", id);
        return updateDoc(bookDoc, updatedBook);
    }

    deleteBook = (id) => {
        const bookDoc = doc(database, "books", id);
        return deleteDoc(bookDoc);
    }

    getAllBooks = () => {
        return getDocs(bookCollectionRef);
    }

    getBook = (id) => {
        const bookDoc = doc(database, "books", id);
        return getDoc(bookDoc);
    }



    search = (keyword) => {
        const q = query(bookCollectionRef, where("author", "==", keyword));
        return getDocs(q);
    }
}

export default new BookDataService();