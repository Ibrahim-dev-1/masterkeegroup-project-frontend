import React, { createContext, useReducer } from "react";
import { createNotification } from "../myFonctions";

let AuthStateContext = createContext();
let AuthDispatchContext = createContext();

// resolver
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthentication: action.payload.success,
        email: action.payload.email,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthentication: false,
        token: undefined,
        email: undefined,
      };
    default:
      return state;
  }
};

// provider
const AuthenticationProvider = (props) => {
  const [authState, dispatch] = useReducer(rootReducer, {
    isAuthentication: false,
    token: undefined,
    email: undefined,
    isLoading: false,
  });

  return (
    <AuthStateContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// cusumer
const useAuthState = () => {
  let state = React.useContext(AuthStateContext);
  if (state === undefined) {
    console.log("le authStateContext doit s'utiliser dans un consumer");
    throw new Error("le state doit s'utiliser dans le context ");
  }
  return state;
};

const useAuthDispatch = () => {
  let dispatch = React.useContext(AuthDispatchContext);

  if (dispatch === undefined) {
    console.log("le authDispatchContext doit s'utiliser dans un consumer");
    throw new Error("le dispatch doit s'utiliser dans le context ");
  }

  return dispatch;
};

const login = (dispatch, AuthData) => {
  fetch("/", {
    method: "POST",
    body: JSON.stringify(AuthData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.errors) {
        throw data.message;
      }

      // si les informations sont correctes, alors
      sessionStorage.setItem("isAuthentication", true);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("email", data.email);
      return dispatch({ type: "LOGIN_SUCCESS", payload: data });
    })
    .catch(function (err) {
      sessionStorage.removeItem("isAuthentication");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      return createNotification("Erreur", "danger", err, "top-right");
    });
};

const logout = (dispatch) => {
  sessionStorage.removeItem("isAuthentication");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  return dispatch({ type: "LOGOUT" });
};

export { AuthenticationProvider, login, logout, useAuthState, useAuthDispatch };
