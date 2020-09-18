import React from "react";
import { createNotification } from "../myFonctions";
import Music from "../assets/img/music.png";
import Video from "../assets/img/videos.png";
import Image from "../assets/img/image.png";
import Application from "../assets/img/application.png";

// create variable
let FilesStateToProps = React.createContext();
let FilesDispatchToProps = React.createContext();

// reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "ALL_FILES":
      return {
        ...state,
        files: action.payload,
        folders: action.folders,
        isLoading: action.loading,
      };
    case "LOADING":
      return { ...state, isLoading: action.paylaod };
    default:
      return state;
  }
};

// provider
const FilesProvider = (props) => {
  const [state, dispatch] = React.useReducer(rootReducer, {
    isLoading: true,
    files: [],
    folders: [
      { id: 1, nom: "application", elements: [], icon: Application },
      { id: 2, nom: "music", elements: [], icon: Music },
      { id: 3, nom: "image", elements: [], icon: Image },
      { id: 4, nom: "video", elements: [], icon: Video },
    ],
  });

  return (
    <FilesStateToProps.Provider value={state}>
      <FilesDispatchToProps.Provider value={dispatch}>
        {props.children}
      </FilesDispatchToProps.Provider>
    </FilesStateToProps.Provider>
  );
};
// cusumer
const useStateToProps = () => {
  let state = React.useContext(FilesStateToProps);
  if (state === undefined) {
    console.log("le authStateContext doit s'utiliser dans un consumer");
    return createNotification(
      "Erreur",
      "danger",
      "le state doit s'utiliser dans le context ",
      "top-right"
    );
  }
  return state;
};

const useDispatchToProps = () => {
  let dispatch = React.useContext(FilesDispatchToProps);

  if (dispatch === undefined) {
    console.log("le FilesDispatchToProps doit s'utiliser dans un consumer");
    return createNotification(
      "Erreur",
      "danger",
      "la fonction dispatch doit s'utiliser dans le context ",
      "top-right"
    );
  }

  return dispatch;
};

// fetch all files
const fetchFiles = (dispatch) => {
  fetch("/fichier/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      if (data.error) {
        throw data.message;
      }
      let folders = [
        { id: 0, nom: "application", elements: [], icon: Application },
        { id: 1, nom: "music", elements: [], icon: Music },
        { id: 2, nom: "image", elements: [], icon: Image },
        { id: 3, nom: "video", elements: [], icon: Video },
      ];

      if (data.files.length > 0) {
        data.files.map((file) => {
          const type = file.mimetype.split("/")[0];
          const value = folders.find((element) => element.nom === type);
          value.elements = [...value.elements, file];
          folders[folders.indexOf(value)] = value;
        });
      }

      dispatch({
        type: "ALL_FILES",
        loading: false,
        folders: folders,
        payload: data.files,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: "ALL_FILES", payload: null, loading: false });
      return createNotification(
        "Fetch folders",
        "danger",
        "error",
        "top-right"
      );
    });
};

export { FilesProvider, useDispatchToProps, useStateToProps, fetchFiles };
