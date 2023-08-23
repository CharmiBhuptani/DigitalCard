import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { isEmpty } from "../app/helpers";
import contactInformatrionService from "../services/contactInformatrion.service";

export const SocialInformation = ({
  width,
  data,
  setData,
  errors,
  setErrors,
}) => {
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined && id !== "") {
      id && getInformation(id);
    }
  }, [id]);
  const getInformation = async (id) => {
    const d = await contactInformatrionService.getContactInformation(id);
    if(d?.data){
      setData(d.data())
    }
    // data?.facebook && setData({ ...data, facebook: data?.data()?.facebook });
    // data?.instagram && setData({ ...data, instagram: data?.data()?.instagram });
    // data?.twitter && setData({ ...data, twitter: data?.data()?.twitter });
    // data?.linkedin && setData({ ...data, linkedin: data?.data()?.linkedin });

  };
  return (
    <>
      <div>
        <div className="heading pt-5 pb-2">
          <span className="global-rular">Social Information</span>
        </div>
        <div
          className={`container-xl row ${
            width > 992 ? "col-md-6" : "col-md-12"
          }`}
        >
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>Facebook</label>
            <input
              type="url"
              className="form-control"
              name="facebook"
              value={data?.facebook}
              placeholder="Enter Facebook URL"
              onChange={(e) => {
                // setFacebook(e.target.value);
                setData({ ...data, facebook: e.target.value });
                const fileType = e.target.value.split(":")?.[0]
                if (!isEmpty(e.target.value) && !["http", "https"].includes(fileType.toLocaleLowerCase())) {
                  setErrors({ ...errors, facebook: "Invalid URL." });
                } else {
                  setErrors({ ...errors, facebook: " " });
                }
              }}
            />
            {errors.facebook ? (
              <div className="text-danger">{errors.facebook}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>Instagram</label>
            <input
              type="text"
              className="form-control"
              name="instagram"
              value={data?.instagram}
              placeholder="Enter Instagram URL"
              onChange={(e) => {
                setData({ ...data, instagram: e.target.value });
                const fileType = e.target.value.split(":")?.[0]
                if (!isEmpty(e.target.value) && !["http", "https"].includes(fileType.toLocaleLowerCase())) {
                  setErrors({ ...errors, instagram: "Invalid URL." });
                } else {
                  setErrors({ ...errors, instagram: " " });
                }
              }}
            />
            {errors.instagram ? (
              <div className="text-danger">{errors.instagram}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>Linkedin</label>
            <input
              className="form-control"
              name="linkedin"
              value={data?.linkedin}
              placeholder="Enter Linkedin URL"
              onChange={(e) => {
                setData({ ...data, linkedin: e.target.value });
                const fileType = e.target.value.split(":")?.[0]
                if (!isEmpty(e.target.value) && !["http", "https"].includes(fileType.toLocaleLowerCase())) {
                  setErrors({ ...errors, linkedin: "Invalid URL." });
                } else {
                  setErrors({ ...errors, linkedin: " " });
                }
              }}
            />
            {errors.linkedin ? (
              <div className="text-danger">{errors.linkedin}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={`${width > 992 ? "col-md-6" : "col-md-12"}`}>
            <label>twitter</label>
            <input
              className="form-control"
              name="twitter"
              value={data?.twitter}
              placeholder="Enter Twitter URL"
              onChange={(e) => {
                setData({ ...data, twitter: e.target.value });
                const fileType = e.target.value.split(":")?.[0]
                if (!isEmpty(e.target.value) && !["http", "https"].includes(fileType.toLocaleLowerCase())) {
                  setErrors({ ...errors, twitter: "Invalid URL." });
                } else {
                  setErrors({ ...errors, twitter: " " });
                }
              }}
            />
            {errors.twitter ? (
              <div className="text-danger">{errors.twitter}</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
