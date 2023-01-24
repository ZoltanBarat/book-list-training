import React from "react";
import "./Footer.css";
import Logo from "../NavBar/Logo";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footerWrapper" id="footer">
      <div className="footerContainer">
        <div className="footer__about">
          <div className="footer__logo">
            <Logo />
          </div>
          <div className="footer__iconContainer">
            <span className="footer__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </span>
            <span className="footer__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
                <title>React Logo</title>
                <circle cx="0" cy="0" r="2.05" fill="#000000" />
                <g stroke="#000000" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
            </span>
            <span className="footer__icon">
              <svg id="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <title>Firebase Logo</title>
                <path
                  id="icon"
                  d="M93.19,329.38,140.64,25.31c1.64-10.37,15.55-12.82,20.46-3.55l51,95.45ZM432,400,385.26,123.21a11,11,0,0,0-18.54-6L80,400l159.36,91.91a33.18,33.18,0,0,0,31.91,0ZM302.36,158.93,265.82,89.39a10.86,10.86,0,0,0-19.36,0L85.83,375.74Z"
                />
              </svg>
            </span>

            <span className="footer__icon">
              <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title>Typescript Logo</title>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M0 16v16h32v-32h-32zM25.786 14.724c0.813 0.203 1.432 0.568 2.005 1.156 0.292 0.312 0.729 0.885 0.766 1.026 0.010 0.042-1.38 0.974-2.224 1.495-0.031 0.021-0.156-0.109-0.292-0.313-0.411-0.599-0.844-0.859-1.505-0.906-0.969-0.063-1.594 0.443-1.589 1.292-0.005 0.208 0.042 0.417 0.135 0.599 0.214 0.443 0.615 0.708 1.854 1.245 2.292 0.984 3.271 1.635 3.88 2.557 0.682 1.031 0.833 2.677 0.375 3.906-0.51 1.328-1.771 2.234-3.542 2.531-0.547 0.099-1.849 0.083-2.438-0.026-1.286-0.229-2.505-0.865-3.255-1.698-0.297-0.323-0.87-1.172-0.833-1.229 0.016-0.021 0.146-0.104 0.292-0.188s0.682-0.396 1.188-0.688l0.922-0.536 0.193 0.286c0.271 0.411 0.859 0.974 1.214 1.161 1.021 0.542 2.422 0.464 3.115-0.156 0.281-0.234 0.438-0.594 0.417-0.958 0-0.37-0.047-0.536-0.24-0.813-0.25-0.354-0.755-0.656-2.198-1.281-1.651-0.714-2.365-1.151-3.010-1.854-0.406-0.464-0.708-1.010-0.88-1.599-0.12-0.453-0.151-1.589-0.057-2.042 0.339-1.599 1.547-2.708 3.281-3.036 0.563-0.109 1.875-0.068 2.427 0.068zM18.276 16.063l0.010 1.307h-4.167v11.839h-2.948v-11.839h-4.161v-1.281c0-0.714 0.016-1.307 0.036-1.323 0.016-0.021 2.547-0.031 5.62-0.026l5.594 0.016z"></path>{" "}
                </g>
              </svg>
            </span>
          </div>
          <p>
            {t("footer.about")}
          </p>
          <p>
            Made by{" "}
            <a target="blank" href="https://www.linkedin.com/in/zolt%C3%A1n-bar%C3%A1t-b8b96a124/">
              Zoltan Barat
            </a>
          </p>
        </div>

        <div className="footer__techContainer">
          <h2 className="footer__techTitle">{t("footer.technologiesTitle")}</h2>
          <ul>
            <li className="footer__techItem">
              <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a>
            </li>
            <li className="footer__techItem">
              <a href="https://reactrouter.com/en/main" target="_blank" rel="noreferrer">React Router</a>
            </li>
            <li className="footer__techItem">
              <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">TypeScript</a>
            </li>
            <li className="footer__techItem">
              <a href="https://firebase.google.com/" target="_blank" rel="noreferrer">Firebase</a>
            </li>
              <li className="footer__techItem">
              <a href="https://www.i18next.com/" target="_blank" rel="noreferrer">i18next</a>
            </li>
          </ul>
        </div>

        <div className="footer__techContainer">
          <h2 className="footer__techTitle">{t("footer.featuresTitle")}</h2>
          <ul>
            <li className="footer__techItem">
              <span>{t("footer.features.Authentication")}</span>
            </li>
            <li className="footer__techItem">
              <span>{t("footer.features.add/edit")}</span>
            </li>
            <li className="footer__techItem">
              <span>{t("footer.features.filter")}</span>
            </li>
            <li className="footer__techItem">
              <span>{t("footer.features.MultiLanguages")}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footerAdditional">
        <p>
          {t("footer.additon")}
        </p>
      </div>
    </div>
  );
}

export default Footer;