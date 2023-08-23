import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import contactInformatrionService from "../services/contactInformatrion.service";

const ContactInformation = ({ data, setData, width, setErrors, errors}) => {
  const { id } = useParams();

  // const [editData, setEditData] = useState()
  
  useEffect(() => {
    if (id !== undefined && id !== "") {
      id && getInformation(id);
    }
  }, [id]);

  // const handleStateUpdate = () => {
  //   setData(editData);
  // };



  const getInformation = async (id) => {
    const d = await contactInformatrionService.getContactInformation(id);
        if(d?.data){
          setData(d.data())
        }
    // d?.data().firstName &&
    //   setData({ ...data, firstName: d?.data()?.firstName });
    // d?.data().lastName && setData({ ...data, lastName: d?.data()?.lastName });
    // d?.data().companyName &&
    //   setData({ ...data, companyName: d?.data()?.companyName });
    // d?.data().designation &&
    //   setData({ ...data, designation: d?.data()?.designation });
    // d?.data().businessAddress &&
    //   setData({ ...data, businessAddress: d?.data()?.businessAddress });
    // d?.data().phoneNumber &&
    //   setData({ ...data, phoneNumber: d?.data()?.phoneNumber });
    // d?.data().whatsappNumber &&
    //   setData({ ...data, whatsappNumber: d?.data()?.whatsappNumber });
  };

  return (
    <>
      <div>
        <div className="heading pt-5 pb-2">
          <span className="global-rular">Contact Information</span>
        </div>
        <div
          className={`container-xl row ${
            width > 992 ? "col-md-6" : "col-md-12"
          }`}
        >
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={(e) => {
                setData({ ...data, firstName: (e.target.value) });

                if (e.target.value === "") {
                  setErrors({
                    ...errors,
                    firstName: "First Name is required.",
                  });
                } else {
                  setErrors({ ...errors, firstName: "" });
                }
              }
            }
            />
            {errors.firstName ? (
              <div className="text-danger">{errors.firstName}</div>
            ) : (
              <div></div>
            )}
          </div>

          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={(e) => {
                setData({ ...data, lastName: e.target.value });
                if (e.target.value === "") {
                  setErrors({ ...errors, lastName: "Last Name is required." });
                } else {
                  setErrors({ ...errors, lastName: "" });
                }
              }}
            />
            {errors.lastName ? (
              <div className="text-danger">{errors.lastName}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>Phone Number</label>
            <input
              className="form-control"
              name="phoneNumber"
              value={`${data?.phoneNumber}`}
              placeholder="Phone Number"
              onChange={(e) =>
                setData({ ...data, phoneNumber: e.target.value })
              }
            />
            {errors.phoneNumber ? (
              <div className="text-danger">{errors.phoneNumber}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>Whatsapp Number</label>
            <input
              className="form-control"
              name="whatsappNumber"
              value={data?.whatsappNumber}
              placeholder="Whatsapp Number"
              onChange={(e) =>
                setData({ ...data, whatsappNumber: e.target.value })
              }
            />
          </div>
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>
              Company Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              value={data?.companyName}
              placeholder="Company Name"
              onChange={(e) => {
                setData({ ...data, companyName: e.target.value });
                if (e.target.value === "") {
                  setErrors({
                    ...errors,
                    companyName: "Company Name is required.",
                  });
                } else {
                  setErrors({ ...errors, companyName: "" });
                }
              }}
            />
            {errors.companyName ? (
              <div className="text-danger">{errors.companyName}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              name="designation"
              value={data.designation}
              placeholder="Designation"
              onChange={(e) =>
                setData({ ...data, designation: e.target.value })
              }
            />
          </div>
          <div className="col-md-12">
            <label>Business Address</label>
            <textarea
              className="form-control "
              name="businessAddress"
              value={data?.businessAddress}
              placeholder="Business Address"
              onChange={(e) =>
                setData({ ...data, businessAddress: e.target.value })
              }
              style={{ height: "100px" }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactInformation;
