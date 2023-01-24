import { useState } from 'react';
import { Link, Navigate, Route, Routes } from "react-router-dom";
import AddItem from './components/AddUpdateItem/AddUpdateItem';
import Login from './components/Login/Login';
import NavBar from "./components/NavBar/NavBar";
import Product from './components/Product/Product';
import ProtectedRoute from './components/ProtectedRoute';
import Singup from './components/Singup/Singup';
import { UserAuthContextProvider } from './context/UserAuthContext';
import NotificationModal from './components/NotificationModal/NotificationModal';
import MyList from './components/MyList/MyList';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import { UpdateIDContextProvider } from './context/UpdateIDContext.js';
import UpdateItem from './components/UpdateItem/UpdateItem';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';


i18next
.use(initReactI18next) 
.init({
  resources: {
    en: {
      translation: require('./locales/en/translation.json')
    },
    hu: {
      translation: require('./locales/hu/translation.json')
    }
  },
  lng: 'en',
  fallbackLng: 'hu',
});

function NoMatch() {
  const { t } = useTranslation();
  return (
    <div className="centerContainer">
      <div className="subCenterContainer">      
          <h2>{t('nomatch.text')}</h2>
          <p>
            <Link to="/retrend/">{t('nomatch.link')}</Link>
          </p>
      </div>
    </div>
  );
}

function App() {
  const [itemId, setItemId] = useState('');
  const [mainSearch, setMainSearch] = useState("all");

  return (
    <div className="App">
      <UserAuthContextProvider>
        <NavBar setMainSearch={setMainSearch} mainSearch={mainSearch} />
        <ScrollToTop />
        <NotificationModal />
        <Routes>
          <Route index element={<Navigate to="/retrend/" />} />
          <Route path="/test" element={<Loading />} />
          <Route 
            path="/retrend/"
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
