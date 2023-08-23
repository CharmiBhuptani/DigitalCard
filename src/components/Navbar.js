import React from "react";


const Navbar = ({ width, onPreviewClick }) => {
  
  return (
    <>
      <div className="menu-container d-flex justify-content-between">
      <a href="/"><div className="logo">digicard</div></a> 
        {width < 993 && (
          <div className="navbar-container">
            <button
              type="button"
              className="global-button"
              onClick={onPreviewClick}
            > 
              Preview
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Navbar;
