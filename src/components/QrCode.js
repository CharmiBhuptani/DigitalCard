import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";
import contactInformatrionService from "../services/contactInformatrion.service";
import Modal from "react-modal";

import { storePdfFile } from "../app/helpers";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import Navbar from "./Navbar";
import InitialModal from "./MyModal";

const QrCode = () => {
  const [base64pdf, setBase64pdf] = useState();
  const [link, setLink] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(true);



  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined && id !== "") {
      id && getInformation(id);
    }
  }, [id]);
  const getInformation = async (id) => {
    const data = await contactInformatrionService.getContactInformation(id);
    setBase64pdf(data?.data()?.pdfData);
  };

  useEffect(() => {
    if (base64pdf) {
      storePdfFile(base64pdf);
    }
  }, [base64pdf]);

  const storePdfFile = (pdfbase64) => {
    console.log(pdfbase64);
    const storage = getStorage();
    const storageRef = ref(storage, "BusinessCard.pdf");
    uploadString(storageRef, pdfbase64, "base64").then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setLink(downloadURL);
      });
    });
  };

  const qrCodeData = `${link}`;

  return (
    <>
      <Navbar />
      <div>
     <InitialModal 
      base64pdf = {base64pdf}
      link={link}
      qrCodeData={qrCodeData}
     />
    </div>
    </>
  );
};
export default QrCode;
