import React from "react";
import { Link } from "react-router-dom";
import { useAuthDispatch, login } from "../contexts/authenticationProvider";
import Notification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import "./login.css";

const Login = () => {
  const [datas, setData] = React.useState({ email: "", password: "" });
  let dispatch = useAuthDispatch();

  const onClickHandler = (ev) => {
    ev.preventDefault();
    return login(dispatch, datas);
  };

  return (
    <div className="login-container">
      <Notification />

      <div
        style={{
          margin: "0 auto",
          maxWidth: "23rem",
          borderRadius: "5px",
          background: "#00000030"
        }}
      >
        <div className="login-logo">
          <h1 className="text-light font-weight-bold">Admin Dashboard</h1>
        </div>
        <div  className="card rounded">
          <div style={{ background: "#00000010", padding: "2rem" }} className="card-body login-card-body">
            <p className="login-box-msg">Connectez-vous pour commencer</p>

            <form onSubmit={onClickHandler}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  value={datas.email}
                  required
                  className="form-control"
                  placeholder="Email"
                  onChange={function (ev) {
                    return setData({ ...datas, email: ev.target.value });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  required
                  onChange={function (ev) {
                    return setData({ ...datas, password: ev.target.value });
                  }}
                  value={datas.password}
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button
                    type="submit"
                    onClick={onClickHandler}
                    className="btn btn-primary"
                  >
                    connecter
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <Link to="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </Link>
              <Link to="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using
                Google+
              </Link>
            </div>

            <p className="mb-1">
              <Link to="#">J'ai oublié mon mot de passe </Link>
            </p>
            <p className="mb-0">
              <Link to="register.html" className="text-center">
                Ajouter une nouvelle membre{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
