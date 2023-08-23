import React from "react";

export const DemoComponent = ({
  data,
  canvas,
  firstTheme,
  on,
  base64,
  watchAllFields,
}) => {
  return (
    <>
      <div
        style={{ borderColor: `${canvas}`, fontFamily: `${data?.fontValue}` }}
        classNamedownload
      >
        <div
          className="preview-header"
          style={{ backgroundColor: `${canvas}` }}
        ></div>
        <div className="company-logo-container d-flex justify-content-center">
          {`${base64}` && (
            <img
              src={`${base64}`}
              className={`company-logo ${
                firstTheme === false
                  ? "rounded-circle image-fluid border"
                  : "border"
              }`}
              alt="logo"
            />
          )}
        </div>
        <div className="d-flex justify-content-center preview-company-name">
          <span
            className="d-flex justify-content-center apply-font"
            style={{ borderColor: `${canvas}` }}
          >
            {`${data?.companyName}`}
          </span>
        </div>
        <div className="d-flex justify-content-center name-container">
          <span className="">
            <span className="preview-first-name apply-font ">{`${data?.firstName}`}</span>
            &nbsp;
            <span className="preview-last-name apply-font">
              {`${data?.lastName}`}{" "}
            </span>
            &nbsp;
            {`${data?.designation}` && (
              <span className="preview-last-name apply-font">
                ({`${data?.designation}`})
              </span>
            )}
          </span>
        </div>

        {`${data?.businessAddress}` && (
          <div className="address-preview-container">
            <div className="address-preview apply-font">
              <div
                className={`d-flex align-items-center `}
                style={{ borderColor: `${canvas}` }}
              >
                <i
                  className={`fa fa-map-marker ${
                    firstTheme === false
                      ? "location-icon"
                      : "location-icon-square"
                  }`}
                  style={{ color: `${canvas}`, borderColor: `${canvas}` }}
                ></i>
              </div>
              <div className="address-text">
                <span className=" apply-font">{`${data?.businessAddress}`}</span>
              </div>
            </div>
          </div>
        )}
        {`${data?.phoneNumber}` && (
             <a
             href={`tel:${data?.phoneNumber}`}
             target="_blank"
             className=""
             rel="noreferrer"
           >
          <div className="phone-preview-container">
            <div className="phone-preview d-flex apply-font">
              <div>
             
                  {" "}
                  <i
                    className={`fa fa-phone ${
                      firstTheme === false ? "phone-icon" : "phone-icon-square"
                    }`}
                    style={{ color: `${canvas}`, borderColor: `${canvas}` }}
                  ></i>{" "}
               
              </div>
              <div className="phone-text">
                <span> {`${data?.phoneNumber}`}</span>
              </div>
            </div>
          </div>
          </a>
        )}
        {`${data?.whatsappNumber}` && (
             <a
             href={`https://wa.me/${data?.whatsappNumber}`}
             className="apply-font"
             target="_blank"
             rel="noreferrer"
           >
          <div className="whatsapp-preview-container">
            <div className="whatsapp-preview apply-font d-flex">
              <div>
             
                  {" "}
                  <i
                    className={`fa fa-whatsapp ${
                      firstTheme === false
                        ? "whatsapp-icon"
                        : "whatsapp-icon-square"
                    }`}
                    style={{ color: `${canvas}`, borderColor: `${canvas}` }}
                  ></i>{" "}
               
              </div>
              <div className="whatsapp-text">
                <span>{`${data?.whatsappNumber}`}</span>
              </div>
            </div>
          </div>
          </a>
        )}
        {(`${(data?.businessDescription)}` ||
          `${(data?.facebook)}` ||
          `${(data?.instagram)}` ||
          `${(data?.twitter)}` ||
          `${(data?.linkedin)}`) && (
          <div className="d-flex justify-content-center">
            <span className="heading-2 ">
              <span
                className="global-rular heading"
                style={{ borderColor: `${canvas}` }}
              >
                About Us
              </span>
            </span>
          </div>
        )}
        {`${(data?.businessDescription)}` && (
          <div className="d-flex justify-content-center">
            <span className="preview-company-description apply-font w-100 text-center text-muted">
              {`${data?.businessDescription}`}
            </span>
          </div>
        )}
        {(`${data?.facebook}` || `${data?.instagram}` || `${data?.twitter}` || `${data?.linkedin}`) && (
          <div className="d-flex justify-content-center icons-container">
            {`${data?.facebook}` && (
              <div className="icon">
                <a
                  href={`${data?.facebook}`}
                  target="_blank"
                  className="apply-font"
                  rel="noreferrer"
                >
                  {" "}
                  <i
                    className={`fa fa-facebook fa-lg ${
                      firstTheme === false
                        ? "preview-icons-circle"
                        : "preview-icons"
                    }`}
                    style={{ background: `${canvas}` }}
                  ></i>
                </a>
              </div>
            )}
            {`${data?.instagram}` && (
              <div className="icon">
                <a
                  href={`${data?.instagram}`}
                  target="_blank"
                  className=" apply-font"
                  rel="noreferrer"
                >
                  {" "}
                  <i
                    className={`fa fa-instagram fa-lg ${
                      firstTheme === false
                        ? "preview-icons-circle"
                        : "preview-icons"
                    }`}
                    style={{ background: `${canvas}` }}
                  ></i>
                </a>
              </div>
            )}
            {`${data?.linkedin}` && (
              <div className="icon">
                <a
                  href={`${data?.linkedin}`}
                  target="_blank"
                  className=" apply-font"
                  rel="noreferrer"
                >
                  {" "}
                  <i
                    className={`fa fa-linkedin fa-lg ${
                      firstTheme === false
                        ? "preview-icons-circle"
                        : "preview-icons"
                    }`}
                    style={{ background: `${canvas}` }}
                  ></i>
                </a>
              </div>
            )}
            {`${data?.twitter}` && (
              <div className="icon">
                <a
                  href={`${data?.twitter}`}
                  target="_blank"
                  className=" apply-font"
                  rel="noreferrer"
                >
                  {" "}
                  <i
                    className={`fa fa-twitter fa-lg ${
                      firstTheme === false
                        ? "preview-icons-circle"
                        : "preview-icons"
                    }`}
                    style={{ background: `${canvas}` }}
                  ></i>
                </a>
              </div>
            )}
          </div>
        )}
        {`${watchAllFields}` && watchAllFields.products && (
          <div className="d-flex justify-content-center products-container">
            <span className="heading-2">
              <span
                className="global-rular heading"
                style={{ borderColor: `${canvas}` }}
              >
                Our Products
              </span>
            </span>
          </div>
        )}

        {watchAllFields &&
          watchAllFields?.products?.map((product, index) => (
            <>
              {/* <div className="d-flex justify-content-center ">
                <img
                  src="/images/aesthetic-template.jpg"
                  alt="product"
                  className={`product-image ${
                    firstTheme === false
                      ? "rounded-circle image-fluid border"
                      : "border"
                  }`}
                />
              </div> */}
              <div
                className="card preview-product"
                style={{ borderColor: `${canvas}` }}
              >
                <div className="text-center">
                  <span className="preview-product-name">{product.name}</span>
                  <span className="preview-product-price">
                    {" "}
                    {product.price && "- ₹"}
                    {product.price}
                  </span>
                </div>

                <div className="d-flex justify-content-center">
                  <span className="preview-company-description apply-font text-muted">
                    {product.description}
                  </span>
                </div>
              </div>
            </>
          ))}
        {/* {`${on}` === "true" && (
          <div className="d-flex justify-content-center mt-3">
            <span className="">
              <a href="https://www.weybee.com/">
                <span className="text-muted"> Created By:  &nbsp;</span>
                <span className="company-link">
                  Weybee Solutions Pvt. Ltd.
                </span>
              </a>
            </span>
          </div>
        )} */}
      </div>
    </>
  );
};
