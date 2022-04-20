import { createContext, useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import './App.css';
import AddItem from './components/AddUpdateItem/AddUpdateItem';
import ItemList from "./components/ItemList/ItemList";
import Login from './components/Login/Login';
import NavBar from "./components/NavBar/NavBar";
import Product from './components/Product/Product';
import ProtectedRoute from './components/ProtectedRoute';
import Singup from './components/Singup/Singup';
import { UserAuthContextProvider, useUserAuth } from './context/UserAuthContext';
import NotificationModal from './components/NotificationModal/NotificationModal';
import MyList from './components/MyList/MyList';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import { UpdateIDContextProvider } from './context/UpdateIDContext.js';
import UpdateItem from './components/UpdateItem/UpdateItem';


function NoMatch() {
  return (
    <div className="centerContainer">
      <div className="subCenterContainer">      
          <h2>Nothing to see here!</h2>
          <p>
            <Link to="/">Go to the home page</Link>
          </p>
      </div>
    </div>
  );
}

function App() {

  
  const [itemId, setItemId] = useState('');
  const [mainSearch, setMainSearch] = useState("");

  const getItemIdHandler = (id: string) => {
    setItemId(id);
  }

  return (
    <div className="App">
      <UserAuthContextProvider>
        <NavBar id={""} setItemId={setItemId} setMainSearch={setMainSearch} />
        <NotificationModal />

        <Routes>    

          <Route path="/test" element={<Loading />} />
          <Route
            path="/"
            element={<HomePage setItemId={setItemId} mainSearch={mainSearch} />}
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddItem id={""} setItemId={setItemId} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
          {console.log("az itemId az APP-ban: ", itemId)}
          <Route
            path={`/product/:${itemId}`}
            element={<Product id={itemId} />}
          />

          <Route
            path="/myitems"
            element={
              <ProtectedRoute>
                <UpdateIDContextProvider>
                  <MyList />
                </UpdateIDContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update"
            element={              
                <ProtectedRoute>
                  <UpdateIDContextProvider>
                    <UpdateItem />
                  </UpdateIDContextProvider>
                </ProtectedRoute>             
            }
          />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </UserAuthContextProvider>
      <Footer />
    </div>
  );
}

export default App;
