import React from "react";
import { useState } from "react";


const HeaderComponents = ({
  width,
  setLogo,
  errors,
  setErrors,
  handleLogoUpload,
  isLoading

}) => {

  return (
    <>
      <div className="heading pb-2 pt-2">
        <span className="global-rular">Header Attachments</span>
      </div>
      <div
        className={`container-xl row ${
          width > 992 ? "col-md-6" : "col-md-12"
        }`}
      >
        <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
          <label>Add Logo</label>
          <div>
     
            <input
              type="file"
              id="logo"
              onChange={(e) => {
                setLogo(e.target.files[0]);
                const fileType = e.target.files[0].name.split(".").pop();
                if (
                  !["svg", "jpeg", "png", "jpg"].includes(fileType.toLocaleLowerCase())
                ) {
                  setErrors({ ...errors, logo: "Invalid file." });
                } else {
                  setErrors({ ...errors, logo: " " });
                }
                handleLogoUpload()
              }}
              className="form-control"
              accept="image/*"
            />
      
            {errors.logo ? <div className="text-danger">{errors.logo}</div> : <div></div>}
              <p className="text-muted">(suggested formats: svg, jpeg or png )</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderComponents;
