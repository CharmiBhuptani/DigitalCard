import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import contactInformatrionService from "../services/contactInformatrion.service";
import { CompanyInformation } from "./CompanyInformation";
import ContactInformation from "./ContactInformation";
import Customize from "./Customize";
import HeaderComponents from "./HeaderComponents";
import LivePreviewComponent from "./LivePreview";
import Navbar from "./Navbar";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { SocialInformation } from "./SocialInformation";
import {
  getWindowDimensions,
  showToastErrorMessage,
  showToastMessage,
} from "../app/helpers";
import { storage } from "../firebase-config";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import { DemoComponent } from "./DemoComponent";
import { useCallback } from "react";
import pako from 'pako';

const MainForm = () => {
  const [logo, setLogo] = useState("");
  const [canvas, setBrush] = useState("#009ef7");
  const [lightColor, setLightColor] = useState("#009ef7");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [firstTheme, setFirstTheme] = useState(false);
  const [on, setOnState] = useState(false);
  const [errors, setErrors] = useState({});
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [base64, setBase64] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    designation: "",
    businessAddress: "",
    whatsappNumber: "",
    phoneNumber: "",
    businessDescription: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    fontValue: "Lato",
    canvas:"#009ef7",
    products: []
  });

  const toggle = () => {
    setOnState((o) => !o);
    handleThemeChange();
  };

  const { width } = useWindowDimensions();
  const Imageref = useRef();
  const { register, watch } = useForm();
  const watchAllFields = watch();
  const navigate = useNavigate();
  const { id } = useParams();

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  


  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // }, []);
  


  const getInformation = async (id) => {
    const data = await contactInformatrionService.getContactInformation(id);
    data?.firstName && setData({ ...data, firstName: data?.data()?.firstName });
    data?.lastName && setData({ ...data, lastName: data?.data()?.lastName });
    data?.companyName &&
      setData({ ...data, companyName: data?.data()?.companyName });
    data?.designation &&
      setData({ ...data, designation: data?.data()?.designation });
    data?.businessAddress &&
      setData({ ...data, businessAddress: data?.data()?.businessAddress });
    data?.phoneNumber &&
      setData({ ...data, phoneNumber: data?.data()?.phoneNumber });
    data?.whatsappNumber &&
      setData({ ...data, whatsappNumber: data?.data()?.whatsappNumber });
    data?.businessDescription &&
      setData({
        ...data,
        businessDescription: data?.data()?.businessDescription,
      });
    data?.facebook && setData({ ...data, facebook: data?.data()?.facebook });
    data?.instagram && setData({ ...data, instagram: data?.data()?.instagram });
    data?.twitter && setData({ ...data, twitter: data?.data()?.twitter });
    data?.linkedin && setData({ ...data, linkedin: data?.data()?.linkedin });

    imgUrl && setLogo(data?.data()?.imgUrl);
  };

  const pdfJSX = () => {
    return (
      <>
        <DemoComponent
          data={data}
          setData={setData}
          canvas={canvas}
          logo={logo}
          imgUrl={imgUrl}
          firstTheme={firstTheme}
          on={on}
          watchAllFields={watchAllFields}
          base64={base64}
        />
      </>
    );
  };

  const getBase64Image = () => {
      if (logo.size > 2000000) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(logo);
    
      reader.onload = () => {
        setBase64(reader.result); //base64encoded string
  }
}

  useEffect(() => {
    if (logo) {
      const base64 = getBase64Image(logo);
      setBase64(base64);
    }
  }, [logo]);

  const generatePdf = async () => {
    const printElement = ReactDOMServer.renderToString(pdfJSX());
    if (!data.companyName || !data.firstName || !data?.lastName) {
      showToastErrorMessage();
    }
    var opt = {
      filename: `${data?.companyName}`,
    };
    if (data.companyName && data.firstName && data.lastName) {

      let pdfData;
      // PDF file to base64
      const toBase64 = async (data) => {
        const reader = await new FileReader();
        reader.onloadend = async () => {
          const base64String = await reader.result
            .replace("data:", "")
            .replace(/^.+,/, "");

          pdfData = (base64String);
          setPdfData(compressBase64(pdfData));
          handleSubmit(pdfData);
        };
        reader.readAsDataURL(data);
      };


      function compressBase64(pdfData) {
        const bytes = atob(pdfData)
          .split('')
          .map(char => char.charCodeAt(0));
        const data = new Uint8Array(bytes);
        const compressed = pako.deflate(data);
        const compressedBase64 = btoa(String.fromCharCode.apply(null, compressed));
        return compressedBase64;
      }

      let worker = html2pdf()
        .set(opt)
        .from(printElement)
        .toPdf()
        .output("blob")
        .then((data) => {
          data && toBase64(data);
        });
      html2pdf().from(printElement).set(opt).save();
           
    }
  };

  const handleSubmit = useCallback(
    async (pdfData) => {
      setMessage("");
      if (
        data?.firstName === "" ||
        data?.lastName === "" ||
        data?.companyName === ""
      ) {
        setMessage({
          error: true,
          msg: "Please provide the required details.",
        });
        return;
      }

      const newContactInformation = {
        ...data,
        imgUrl,
        pdfData,
        canvas,
        firstTheme,
        ...watchAllFields,
      };
      console.log(pdfData)

      try {
        if (id !== undefined && id !== "") {
          console.log(id, "inside try update")
          await contactInformatrionService.updateContactInformation(
            id,
            newContactInformation
          );
          console.log(newContactInformation)
          setMessage({ error: false, msg: "Details updated succesfully" });
        } else {
          await contactInformatrionService.addContactInformation(
            newContactInformation
          );
          setMessage({ error: false, msg: "Details added succesfully" });
        }
      } catch (err) {
        setMessage({ error: true, msg: err.message });
      }
      setData({ ...data, firstName: "" });
      setData({ ...data, lastName: "" });
      setData({ ...data, companyName: "" });
      setData({ ...data, designation: "" });
      setData({ ...data, businessAddress: "" });
      setData({ ...data, phoneNumber: "" });
      setData({ ...data, businessDescription: "" });
      setData({ ...data, facebook: "" });
      setData({ ...data, instagram: "" });
      setData({ ...data, twitter: "" });
      setData({ ...data, linkedin: "" });
      setLogo("");
      navigate("/");
      if (id) {
        showToastMessage("Details updated succesfully");
      } else {
        showToastMessage("Details added succesfully");
      }
    },
    [pdfData, data]
  );

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleThemeChange = () => {
    setFirstTheme(!firstTheme);
  };
  useEffect(() => {
    if (canvas) {
      var c;
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(canvas)) {
        c = canvas.substring(1).split("");
        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        let color =
          "rgba(" +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
          ",0.2)";
        color && setLightColor(color);
      }
    }
  }, [canvas]);

  useEffect(() => {
    const file = logo;
    if (!file) return;

    const storageRef = ref(storage, `logos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  }, [logo]);

  return (
    <>
      <Navbar width={width} onPreviewClick={openModal} />
      {width < 993 && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <LivePreviewComponent
            data={data}
            setData={setData}
            ref={Imageref}
            logo={logo}
            canvas={canvas}
            watchAllFields={watchAllFields}
            register={register}
            firstTheme={firstTheme}
            on={on}
            toggle={toggle}
            lightColor={lightColor}
            imgUrl={imgUrl}
            progress={progress}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            id={id}
            width={width}
            setImgUrl={setImgUrl}
            closeModal = {closeModal}
          />
        </Modal>
      )}

      <div className="d-flex app-main-container container-xl">
        <div>
          <HeaderComponents
            setLogo={setLogo}
            width={width}
            progress={progress}
            setProgress={setProgress}
            logo={logo}
            errors={errors}
            setErrors={setErrors}
          />

          <ContactInformation
            data={data}
            setData={setData}
            width={width}
            message={message}
            errors={errors}
            setErrors={setErrors}
            getInformation={getInformation}
            latitude={latitude}
            longitude={longitude}
          />

          <SocialInformation
            width={width}
            data={data}
            setData={setData}
            errors={errors}
            setErrors={setErrors}
            getInformation={getInformation}
          />
          <CompanyInformation
            data={data}
            setData={setData}
            width={width}
            watchAllFields={watchAllFields}
            register={register}
            getInformation={getInformation}
          />
          <Customize
            setBrush={setBrush}
            data={data}
            setData={setData}
            canvas={canvas}
            handleThemeChange={handleThemeChange}
            width={width}
            on={on}
            toggle={toggle}
          />
        </div>
        {width > 992 && (
          <LivePreviewComponent
            data={data}
            setData={setData}
            ref={Imageref}
            logo={logo}
            canvas={canvas}
            watchAllFields={watchAllFields}
            register={register}
            firstTheme={firstTheme}
            on={on}
            toggle={toggle}
            lightColor={lightColor}
            imgUrl={imgUrl}
            progress={progress}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            id={id}
            setImgUrl={setImgUrl}
          />
        )}
      </div>

      <div className="pt-5 pb-3">
        {message.msg && (
          <div className="text-danger justify-content-center d-flex pb-2">
            {message.msg}
          </div>
        )}
        <div className="d-flex justify-content-center">
          <button className="global-button" onClick={handleSubmit}>
            {id ? "Update" : "Submit"}
          </button>

          <button className="global-button mx-2" onClick={generatePdf}>
            Download
          </button>
        </div>
      </div>
    </>
  );
};
export default MainForm;
// .output('dataurlnewwindow')
