import React, { useEffect } from "react";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

const InitialModal = ({ base64pdf, link, qrCodeData }) => {
  useEffect(() => {
    const modalElement = document.getElementById("initialModal");
    const modal = new Modal(modalElement);
    modalElement.addEventListener("hide.bs.modal", () => {
      document.body.classList.remove("modal-open");
      const modalBackdrop = document.querySelector(".modal-backdrop");
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    });
    modal.show();
  }, []);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
    const modalElement = document.getElementById("initialModal");
    const modal = Modal.getInstance(modalElement);
    modal.hide();
  };

  return (
    <div
      className="modal fade"
      id="initialModal"
      tabIndex="-1"
      aria-labelledby="initialModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="initialModalLabel">
             Qr Code
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleNavigation}
            ></button>
          </div>
          <div className="modal-body">
            {(base64pdf && base64pdf !== null) &&
              (!link || link === undefined) && (
                <div className="">
                  <img src="/images/loader.gif" className="loader"></img>
                </div>
              )}
            {(!base64pdf || base64pdf === null) &&
              (!link || link === undefined) && (
                <div>No Data found. Please generate a PDF and try again later.</div>
              )}
            {base64pdf !== null && link && <QRCode value={qrCodeData} className="my-qr-code"/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialModal;
