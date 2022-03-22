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
    addBooks = (newBook: { title: string; author: string; avaible: string; }) => {
        return addDoc(bookCollectionRef, newBook)
    }

    updateBook = (id: string, updatedBook: any) => {
        const bookDoc = doc(database, "books", id);
        return updateDoc(bookDoc, updatedBook);
    }

    deleteBook = (id: string) => {
        const bookDoc = doc(database, "books", id);
        return deleteDoc(bookDoc);
    }

    getAllBooks = () => {
        return getDocs(bookCollectionRef);
    }

    getBook = (id: string) => {
        const bookDoc = doc(database, "books", id);
        return getDoc(bookDoc);
    }

    search = (keywords: string[], searchWhere: string) => {
        const q = query(bookCollectionRef, where(searchWhere, "in", keywords));
        return getDocs(q);
    }
}

export default new BookDataService();