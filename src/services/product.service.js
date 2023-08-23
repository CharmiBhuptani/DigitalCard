import { db } from "../firebase-config"
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore"

const ProductRef = collection(db,"products");
class ProductDataservice {
    addProduct = (newProduct)=>{
        return addDoc(ProductRef, newProduct);
    }

    updateProduuct = (id, updatedProduct) =>{
        const productDoc = doc(db, "products", id);
        return updateDoc(productDoc, updatedProduct)
    }

    deleteProduct = (id) => {
        const productDoc = doc(db, "products", id);
        return deleteDoc(productDoc)
    }

    // getAllProduct = () =>{
    //     return getDocs(ProductRef)
    // }
   getAllProducts = async () => {
        const q = query(ProductRef, orderBy("firstName"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(products)
        return products;
      };

    getProduct = (id) => {
        const addInfoDoc = doc(db, "products", id)
        return getDoc(addInfoDoc);
    }
}

export default new ProductDataservice();