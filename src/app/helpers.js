import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { toast } from "react-toastify";

export const showToastMessage = (msg) => {
    toast.success(`${msg}`, {});
  };
export const showToastErrorMessage = () => {
    toast.error("Provide required details properly", {});
  };



export const urltoFile = (url, filename, mimeType) => {
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}


export const getBase64Image  = (logo) => {
  if (logo.size > 2000000) {
    return;
  }
  var reader = new FileReader();
  reader.readAsDataURL(logo);

  reader.onload = () => {
    return reader.result;
    // setBase64(reader.result); //base64encoded string
  };
}

export const getWindowDimensions = ()=> {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
export const isEmpty = (value) => {
  return value === "" || value.lenth ===0 ||Object.keys(value)?.length === 0
}
export const storePdfFile = (pdfbase64) => {
  const storage = getStorage();
  const storageRef = ref(storage, 'BusinessCard.pdf');
  uploadString(storageRef, pdfbase64, 'base64').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          return downloadURL;
      });
  });
}


// //Usage example:
// urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt','text/plain')
// .then(function(file){ console.log(file);});