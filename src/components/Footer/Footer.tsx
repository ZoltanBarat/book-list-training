import React from 'react'
import "./Footer.css";

function Footer() {
  return (
    <div className="footerWrapper">
      <div>
        This is a learning project. You can log in/register, see available
        clothes, and send an email to the uploader. If you log in you can upload
        new items, see your items in a list, and edit or delete your items. Some
        random items were uploaded for test.<br></br>by Zoltan Barat
      </div>
      <div className="footer__techContainer">
        <p>Used technologies:</p>
        <ul>
          <li>
            <div className="footer__techLogoContainer">
              <p>React</p>
              <img
                className="footer__techLogo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                alt="React"
              />
            </div>
          </li>
          <li>
            <div className="footer__techLogoContainer">
              <p>React Router</p>
              <img
                className="footer__techLogo"
                src="https://seeklogo.com/images/R/react-router-logo-AB5BFB638F-seeklogo.com.png"
                alt="React Router"
              />
            </div>
          </li>
          <li>
            <div className="footer__techLogoContainer">
              <p>TypeScript</p>
              <img
                className="footer__techLogo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png?20210506173343"
                alt="TypeScript"
              />
            </div>
          </li>
          <li>
            <div className="footer__techLogoContainer">
              <p>Firebase</p>
              <img
                className="footer__techLogo"
                src="https://www.gstatic.com/devrel-devsite/prod/v60a82f989527785dbe37a03a591468114489a6d17469fe0c9f3dbd5a48c1b36c/firebase/images/touchicon-180.png"
                alt="Firebase"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer