import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import contactInformatrionService from "../services/contactInformatrion.service";
import ContactInformationDataService from "../services/contactInformatrion.service";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { showToastMessage } from "../app/helpers";



export const CardListing = () => {
  const [information, setInformation] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getListing();
  }, []);

  const getListing = async () => {
    // const data = await contactInformatrionService.getAllContactInformation();
    const data = await ContactInformationDataService.getAllContactInformation();
    console.log(data)
    data && setInformation(data)
    // setInformation(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  console.log(information)

  const deleteHandler = async (id) => {
    await contactInformatrionService.deleteContactInformation(id);
    getListing();
    showToastMessage("Data deleted succesfully!")
  };
  const editHandler = async (id) => {
  navigate(`/create-card/${id}`)
  };
  const getCodeHandler = (id)=> {
    navigate(`/qr/${id}`)
  }

  const handleNavigation = () => {
    navigate("/create-card")
  }


  return (
    <>
      <Navbar />
      <div className="container-xl mt-5">
        <div className="d-flex justify-content-end">
          <button className="global-button" onClick={handleNavigation}>Create card</button>
        </div>
        <div className="table-container">
          <table className="table table-bordered card-listing-table">
            <thead className="table-head">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Company Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {information.map((info, index) => {
                return (
                  <tr key={info.id}>
                    <td scope="row">{index + 1}</td>
                    <td>{info.firstName} {info.lastName}</td>
                    <td>{info.companyName}</td>
                    <td>
                      <button
                        className="global-button mx-1 edit-button"
                        onClick={(e) => editHandler(info.id)}
                        title="Edit"
                      >
                        <i className="fa fa-edit edit-icon "></i>
                      </button>
                      <button
                        className="global-button mx-1 delete-button"
                        onClick={(e) => deleteHandler(info.id)}
                        title="Delete"
                      >
                        <i className="fa fa-trash delete-icon"></i>
                      </button>
                      <button
                        className="global-button mx-1 qr-button "
                        onClick={(e) => getCodeHandler(info.id)}
                        title="Get Code"
                      >
                        <i className="fa fa-qrcode qr-icon"></i>
                      </button>
                    </td>
                    {/* <td>
                    <QRCode
                      title="GeeksForGeeks"
                      value=  {<LivePreviewComponent 
                    
                      />}

                    />
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
