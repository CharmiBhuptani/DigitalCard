import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import contactInformatrionService from "../services/contactInformatrion.service";
import { AddProduct } from "./AddProduct";

export const CompanyInformation = ({
  data,
  setData,
  width,
  watchAllFields,
  register,

}) => {
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined && id !== "") {
      id && getInformation(id);
    }
  }, [id]);


  const getInformation = async (id) => {
    const d = await contactInformatrionService.getContactInformation(id);
    setData(d?.data())
    // d?.data()?.businessDescription && setData({ ...data, businessDescription: d?.data()?.businessDescription});
  };

  return (
    <>
      <div className="heading pt-5 pb-3">
        <span className="global-rular">Business Information</span>
      </div>

      <div
        className={`container-xl row ${width > 992 ? "col-md-6" : "col-md-12"}`}
      >
        <div className="col-md-12">
          <label>Business Description (150 words)</label>
          <textarea
            className="form-control"
            name="businessDescription"
            value={data?.businessDescription}
            placeholder="Business Description"
            onChange={(e) =>  setData({ ...data, businessDescription: e.target.value })}
            style={{ height: "100px" }}
            maxLength="150"
          ></textarea>
        </div>
        <div className="dynamic-fields-container">
            <AddProduct
              width={width}
              watchAllFields={watchAllFields}
              register={register}
              id = {id}
              products={data.products}
            />
      </div>
      </div>

 
    </>
  );
};
