import { Link } from "react-router-dom";
import "./NavBar.css";
import { useUserAuth } from "../../context/UserAuthContext";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";
import toast from 'react-simple-toasts';

function NavBar({
  setMainSearch,
  mainSearch,
}: {
  setMainSearch: Function;
  mainSearch: string;
}) {
  const { t, i18n } = useTranslation();
  const { user } = useUserAuth();
  const { logOut } = useUserAuth();

  const handlelogOut = async () => {
    try {
      await logOut();
      toast(<h3 className="toast">You are loged out!</h3>);
    } catch (err: any) {
      toast(<h3 className="toast">{err.message}</h3>);
    }
  };

  return (
    <div className="NavBarContainer" id="top">
      <div className="NavBar__infoBar">
        <a className="NavBar__infoBar__box__link" href="#footer">
          <div className="NavBar__infoBar__box --centerItems">
            <svg className="NavBar__infoBar__box__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M11 10.5H11.5C11.7761 10.5 12 10.7239 12 11V15C12 15.2761 12.2239 15.5 12.5 15.5H13M12 8.5H12.01"
                  stroke="#9b9b9b"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M13.3892 19.8785C14.4238 19.696 15.4124 19.3116 16.2984 18.7471C17.1844 18.1827 17.9506 17.4492 18.5532 16.5886C19.1558 15.728 19.583 14.7572 19.8104 13.7315C20.0378 12.7058 20.0609 11.6454 19.8785 10.6108C19.696 9.5762 19.3116 8.58765 18.7471 7.7016C18.1827 6.81556 17.4492 6.04937 16.5886 5.44678C15.728 4.8442 14.7572 4.41702 13.7315 4.18963C12.7058 3.96225 11.6454 3.93911 10.6108 4.12154C9.5762 4.30397 8.58765 4.6884 7.7016 5.25287C6.81556 5.81734 6.04937 6.55081 5.44678 7.41139C4.8442 8.27197 4.41702 9.24281 4.18963 10.2685C3.96225 11.2942 3.93911 12.3546 4.12154 13.3892C4.30397 14.4238 4.6884 15.4124 5.25287 16.2984C5.81734 17.1844 6.55081 17.9506 7.41139 18.5532C8.27197 19.1558 9.24281 19.583 10.2685 19.8104C11.2942 20.0378 12.3546 20.0609 13.3892 19.8785L13.3892 19.8785Z"
                  stroke="#9b9b9b"
                ></path>
              </g>
            </svg>
            <span className="NavBar__infoBar__box__link__text">{t("navbar.about")}</span>
          </div>
        </a>
        <div className="NavBar__infoBar__lang">
          <button className={`NavBar__infoBar__lang__button ${i18n.language === "en" ? "--active-lang" : ""}`} onClick={() => i18n.changeLanguage("en")}>
            <span className="NavBar__infoBar__lang__icon">
              <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 512 512">
                <path fill="#012169" d="M0 0h512v512H0z" />
                <path fill="#FFF" d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z" />
                <path
                  fill="#C8102E"
                  d="m184 324 11 34L42 512H0v-3l184-185zm124-12 54 8 150 147v45L308 312zM512 0 320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z"
                />
                <path fill="#FFF" d="M176 0v512h160V0H176zM0 176v160h512V176H0z" />
                <path fill="#C8102E" d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z" />
              </svg>
            </span>
            <span className="NavBar__infoBar__lang__text">en</span>
          </button>
          <button className={`NavBar__infoBar__lang__button ${i18n.language === "hu" ? "--active-lang" : ""}`} onClick={() => i18n.changeLanguage("hu")}>
            <span className="NavBar__infoBar__lang__icon">
              <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-hu" viewBox="0 0 512 512">
                <g fillRule="evenodd">
                  <path fill="#fff" d="M512 512H0V0h512z" />
                  <path fill="#388d00" d="M512 512H0V341.3h512z" />
                  <path fill="#d43516" d="M512 170.8H0V.1h512z" />
                </g>
              </svg>
            </span>
            <span className="NavBar__infoBar__lang__text">hu</span>
          </button>
        </div>
      </div>

      <div className="NavBar__upper">
        <nav className="NavBar__lower">
          <Link className="NavBar__lower__item" to="/retrend/" onClick={() => setMainSearch("all")}>
            <div className={`NavBar__lower__itemContainer --centerItems ${mainSearch === "all" ? "--navFocused" : null}`}>{t("navbar.all")}</div>
          </Link>
          <Link className="NavBar__lower__item" to="/retrend/">
            <div
              className={`NavBar__lower__itemContainer --centerItems ${mainSearch === "woman" ? "--navFocused" : null}`}
              onClick={() => {setMainSearch("woman")}}
            >
              {t("navbar.woman")}
            </div>
          </Link>
          <Link
            className="NavBar__lower__item"
            to="/retrend/"
            onClick={() => {
              setMainSearch("man");
            }}
          >
            <div className={`NavBar__lower__itemContainer --centerItems ${mainSearch === "man" ? "--navFocused" : null}`}>{t("navbar.man")}</div>
          </Link>
        </nav>
        <div className="NavBar__upper__logo --centerItems">
          <Link className="NavBar__upper__item" to="/retrend/">
            <Logo />
          </Link>
        </div>
        {user === null ? (
          <div className="NavBar__upper__loginContainer">
            <Link className="NavBar__upper__item --centerItems" to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none" viewBox="0 0 22 20">
                <path
                  fill="#000"
                  d="M1.563 20h19.054a.755.755 0 0 0 .534-.224.739.739 0 0 0 .214-.539c-.09-4.55-3.197-8.407-7.372-9.652a5.227 5.227 0 0 0 2.332-4.351A5.24 5.24 0 0 0 11.092 0a5.24 5.24 0 0 0-5.234 5.234c0 1.813.927 3.413 2.329 4.351C4.011 10.834.905 14.688.815 19.237a.754.754 0 0 0 .213.539.756.756 0 0 0 .535.224Zm5.79-14.766a3.744 3.744 0 0 1 3.739-3.739 3.744 3.744 0 0 1 3.738 3.739 3.744 3.744 0 0 1-3.738 3.738 3.744 3.744 0 0 1-3.739-3.738Zm3.739 5.42c4.493 0 8.261 3.458 8.732 7.85H2.36c.471-4.392 4.24-7.85 8.733-7.85Z"
                />
              </svg>
              <span>{t("navbar.login")}</span>
            </Link>
          </div>
        ) : (
          <div className="NavBar__upper__logedinContainer">
            <div className="NavBar__upper__itemContainer">
              Hello <span>{user && user.displayName}</span> !
            </div>
            <div className="NavBar__bar">|</div>
            <div className="NavBar__upper__loginItem">
              <Link className="NavBar__upper__item" to="/add">
                <span>{t("navbar.add")}</span>
              </Link>
            </div>
            <div className="NavBar__bar">|</div>
            {/*  <div className="NavBar__upper__itemContainer">
            <Link className="NavBar__upper__item" to="/login">
              Login
            </Link>
          </div> */}
            <div className="NavBar__upper__loginItem">
              <Link className="NavBar__upper__item" to="/myitems">
                <span>{t("navbar.myitem")}</span>
              </Link>
            </div>
            <div className="NavBar__bar">|</div>
            <div className="NavBar__upper__itemContainer">
              <p className="NavBar__logout" onClick={handlelogOut}>
                <Link className="NavBar__upper__item" to="/retrend/">
                  <span>{t("navbar.logout")}</span>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="NavBar__toolBar">
        <div className="NavBar__toolBar__item --centerItems">
          <span className="NavBar__toolBar__item__text">{t("navbar.return")}</span>
        </div>
        <div className="NavBar__toolBar__item --centerItems">
          <span className="NavBar__toolBar__item__text">{t("navbar.shipping")}</span>
        </div>
        <div className="NavBar__toolBar__item --centerItems">
          <span className="NavBar__toolBar__item__text">{t("navbar.payment")}</span>
        </div>
      </div>
      
    </div>
  );
}

export default NavBar;
