import { Link } from 'react-router-dom';
import "./NavBar.css";
import logo from "./icons8-women's-pajama-96.png";
import { useUserAuth } from '../../context/UserAuthContext';

function NavBar({
  id,
  setItemId,
  setMainSearch,
}: {
  id: string;
  setItemId: Function;
  setMainSearch: Function;
  }) {
  
  const { user } = useUserAuth();
  const { logOut } = useUserAuth();

  const handlelogOut = async () => {
    try {
      await logOut();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <nav className="NavBarContainer" id="top">
      <div className="NavBar__upper">
        <div className="NavBar__upper__nameContainer">
          <Link className="NavBar__upper__item TextLogo" to="used-clothing/">
            Used Clothing
          </Link>
        </div>
        <div className="NavBar__upper__logo --centerItems">
          <img className="logo" src={logo} alt="logo" />
        </div>
        {user === null ? (
          <div className="NavBar__upper__loginContainer">
            <Link className="NavBar__upper__item" to="/login">
              Log In
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
                Add new Item
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
                My items
              </Link>
            </div>
            <div className="NavBar__bar">|</div>
            <div className="NavBar__upper__itemContainer">
              <p className="NavBar__logout" onClick={handlelogOut}>
                <Link className="NavBar__upper__item" to="used-clothing/">
                  Log Out
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="NavBar__lower">
        <Link
          className="NavBar__lower__item"
          to="used-clothing/"
          onClick={() => setMainSearch("")}
        >
          <div className="NavBar__lower__itemContainer --centerItems">All</div>
        </Link>
        <Link className="NavBar__lower__item" to="used-clothing/">
          <div
            className="NavBar__lower__itemContainer --centerItems"
            onClick={() => setMainSearch("woman")}
          >
            Woman
          </div>
        </Link>
        <Link
          className="NavBar__lower__item"
          to="used-clothing/"
          onClick={() => {
            setMainSearch("man");
          }}
        >
          <div className="NavBar__lower__itemContainer --centerItems">Man</div>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;