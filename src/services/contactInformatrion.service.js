import { db } from "../firebase-config"
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy, limit, startAt } from "firebase/firestore"

const ContactInformationCollectionRef = collection(db,"information_schema");
class ContactInformationDataService {
    addContactInformation = (newContactInformation)=>{
        return addDoc(ContactInformationCollectionRef, newContactInformation);
    }

    updateContactInformation = (id, updatedContactInfo) =>{
        const contactInformationDoc = doc(db, "information_schema", id);
        return updateDoc(contactInformationDoc, updatedContactInfo)
    }

    deleteContactInformation = (id) => {
        const contactInformationDoc = doc(db, "information_schema", id);
        return deleteDoc(contactInformationDoc)
    }

    // getAllContactInformation = () =>{
    //     return getDocs(ContactInformationCollectionRef)
    // }
    // getAllContactInformation = async () => {
    //     const q = query(ContactInformationCollectionRef, orderBy("firstName"));
    //     const querySnapshot = await getDocs(q);
    //     const contactInformation = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //     return contactInformation;
    //   };
    getAllContactInformation = async (pageNumber) => {
        const contactsPerPage = 5;
        const startIndex = (pageNumber - 1) * contactsPerPage;
        const q = query(
          ContactInformationCollectionRef,
          orderBy("firstName"),
          limit(contactsPerPage),
          startAt(startIndex)
        );
        const querySnapshot = await getDocs(q);
        const contactInformation = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return contactInformation;
      };
      

    getContactInformation = (id) => {
        const addInfoDoc = doc(db, "information_schema", id)
        return getDoc(addInfoDoc);
    }
}

export default new ContactInformationDataService();