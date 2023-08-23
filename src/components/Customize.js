import React from "react";
import FontPicker from "font-picker-react";

const Customize = ({
  canvas,
  data, 
  setData,
  setBrush,
  width,
  on,
  toggle,
}) => {
  return (
    <>
      <div className="heading pt-5 pb-3">
        <span className="global-rular">Customization</span>
      </div>
      <div
        className={`container-xl row ${width > 992 ? "col-md-6" : "col-md-12"}`}
      >
        <div className="col-md-12">
        <div className="card customize-card">
          <div className="container-wrapper customize-container">
          {/* <div className="container-wrapper"> */}
          <div>
          <label>Select Color</label>
            <input
              style={{ background: { canvas } }}
              type="color"
              className="form-control color-input"
              value={canvas}
              onChange={(event) => {
                setBrush(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Select Font</label>
            <div>
            <FontPicker
              apiKey="AIzaSyD0NzdDe8Y6R6WupTR5UczbppRWyimUAwI"
              onChange={(nextFont) => {
                setData({ ...data, fontValue: nextFont.family });
              }}
              activeFontFamily={(data?.fontValue)? (data?.fontValue): "Lato"}
              variants={["regular", "italic", "600", "700", "700italic"]}
            />
            </div>
          
          </div>

          </div>
      
       
          <div className="credits-container mt-3">
            <div className="d-flex align-items-start">
              <div className="fonts">Change Theme</div>
            </div>
            <div className="mx-2 d-flex align-items-start">
              <button
                className={on ? "on toggle-button" : "off toggle-button"}
                on={on}
                onClick={toggle}
              >
                <span className="pin" />
              </button>
            </div>
   
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
export default Customize;

// apiKey="AIzaSyCwDnxvQ37r675gh3OWWojMUO6Lb170dAU"
// apiKey="AIzaSyAMo73RrEPCwV-zygT3ibodMsxelIm26Lw"
