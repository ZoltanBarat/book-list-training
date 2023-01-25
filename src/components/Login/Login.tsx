import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Button from "../../elements/Button";
import { useTranslation } from "react-i18next";
import "./Login.css";
import toast from "react-simple-toasts";

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await logIn(email.toLowerCase(), password);
      toast(<h3 className="toast">You are logged in!</h3>);
      navigate("/used-clothing/");
    } catch (err: any) {
      toast(<h3 className="toast">{err.message}</h3>, { time: 3000, position: "bottom-center" });
    }
  };

  const handleTestAccount = async () => {
    try {
      await logIn("lucas@testmailx.com", "123456");
      toast(<h3 className="toast">You are logged in!</h3>);
      navigate("/used-clothing/");
    } catch (err: any) {
      toast(<h3 className="toast">{err.message}</h3>, { time: 3000, position: "bottom-center" });
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h2>{t("login.login")}</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="inputLoginContainer">
            <label>
              <input
                className="inputLogin"
                placeholder={`${t("login.email")}`}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                required
              />
            </label>
            <label>
              <input
                className="inputLogin"
                placeholder={`${t("login.password")}`}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </label>
          </div>
        </form>

        <Button text={t("login.login")} margin={true} type="submit" form="loginForm" value="submit" />

        <button
          className="btn btnTest"
          onClick={() => {
            handleTestAccount();
          }}
        >
          Use test account
        </button>

        <div className="toSingUpText">
          {t("login.noAccount")} <Link to="/singup">{t("login.register")}</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
