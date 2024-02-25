import React from 'react'
import "./Footer.css"
import { TbBrandTelegram } from 'react-icons/tb';
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail, AiOutlineInstagram } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { MdOutlineConnectedTv } from 'react-icons/md';


function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-box-container">
        <h3>Contact Us!</h3>
        <div className="footer-box">
          <TbBrandTelegram
            style={{ marginTop: "-10px", color: "#212529", fontSize: "22px" }}
          />
          <p className="fp1">512 Warren Ave Portland</p>
        </div>
        <div className="footer-box">
          <BsTelephone
            style={{ marginTop: "-10px", color: "#212529", fontSize: "22px" }}
          />
          <p className="fp1">207-797-5700</p>
        </div>
        <div className="footer-box">
          <AiOutlineMail
            style={{ marginTop: "-10px", color: "#212529", fontSize: "22px" }}
          />
          <p className="fp1">info@ODRMAT-factory.com</p>
        </div>
      </div>

      <div className="footer-box-container2">
        <h3>Connect with us!</h3>
        <div className="footer-box">
          <RiFacebookCircleLine
            style={{ marginTop: "-10px", color: "#212529", fontSize: "22px" }}
          />
          <p className="fp1">Facebook</p>
        </div>

        <div className="footer-box">
          <FaWhatsapp
            style={{ marginTop: "-10px", color: "#212529", fontSize: "22px" }}
          />
          <p className="fp1">WhatsApp</p>
        </div>

        <div className="footer-box">
          <AiOutlineInstagram
            style={{ marginTop: "-10px", color: "#212529", fontSize: "22px" }}
          />
          <p className="fp1">LinkedIn</p>
        </div>
      </div>

      <div className="footer-box-container3">
        <h3>Others</h3>
        <div className="footer-box">
          <MdOutlineConnectedTv
            style={{
              marginTop: "-10px",
              color: "#212529"
              ,fontSize:"22px",
              fontWeight: "bold",
            }}
          />
          <p className="fp1">Online</p>
        </div>
      </div>
    </div>
  );
}

export default Footer