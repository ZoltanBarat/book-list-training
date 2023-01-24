import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Alert from "../../elements/Alert";
import Button from "../../elements/Button";
import "./Singup.css";
import { useTranslation } from "react-i18next";

function Singup() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const { singUp, updateUserName } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    try {
      await singUp(email.toLowerCase(), password).then(() => {
        updateUserName(name);
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.code);
    }
  };

  return (
    <div className="singupWrapper">
      <div className="singupContainer">
        <h2>{t("login.register")}</h2>
        {error && <Alert message={error} type="red" />}
        <form id="singUpForm" onSubmit={handleSubmit}>
          <div className="inputSingupContainer">
            <label>
              <input required className="singupLogin" placeholder={`${t("login.name")}`} onChange={(e) => setName(e.target.value)} type="text" />
            </label>
            <label>
              <input
                required
                className="singupLogin"
                placeholder={`${t("login.email")}`}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
              />
            </label>
            <label>
              <input
                required
                className="singupLogin"
                placeholder={`${t("login.password")}`}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </label>
          </div>
        </form>

        <Button text={t("login.register")} margin type="submit" form="singUpForm" value="submit" />
        <div className="toLoginText">
          {t("login.hasAccount")} <Link to="/login">{t("login.login")}</Link>
        </div>
      </div>
    </div>
  );
}

export default Singup;