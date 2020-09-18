import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "../component/Navbar";
import UploadModal from "../component/UploadModal";
import FilesContents from "./FilesContents";
import FileInfo from "./FileInfo";
import "./Cloud.css";
import Profil from "../assets/img/profil.jpg";

function Cloud(props) {
  return (
    <div>
      <UploadModal />
      <Navbar />
      <div className="p-3">
        <div className="text-center mb-5">
          <h3 className="font-weight-bold display-3">
            Master <span className="text-danger">Cloud</span>{" "}
          </h3>
          <h5 className="text-muted">
            Administrez et uploadez tous vos différents fichiers avec master
            cloud.{" "}
          </h5>
          <h5 className="text-muted">
            Master cloud, est un espace de stockage capable de stocker des
            ficniers de taille très elever{" "}
          </h5>
        </div>

        <div className="row">
          <div className="col-md-2 text-center">
            <img
              className="img-circle"
              height="80px"
              width="80px"
              src={Profil}
            />
            <p className="font-weight-bold" style={{ fontSize: "1rem" }}>
              {sessionStorage.getItem("email")}
            </p>
          </div>
          <div className="col-md-8 p-2">
            <Switch>
              <Route
                exact
                path="/dashboard/admin/cloud"
                component={FilesContents}
              />
              <Route
                path="/dashboard/admin/cloud/:foldName"
                component={FileInfo}
              />
            </Switch>
          </div>
          <div
            style={{
              maxHeight: "400px",
              display: "grid",
              placeItems: "center",
            }}
            className="border bg-light  rounded p-2 col-md-2 text-center"
          >
            <h4 className="font-weight-bold text-center">
              Uploadez les Fichiers
            </h4>
            <p className="text-muted">
              Vous pouvez uploadez plusieurs types de fichiers(
              <span className="text-primary">
                les musiques , images, les videos , les pdf etc...
              </span>
              ) avec cette plateforme.
            </p>
            <p className="font-weight-bold">
              Comment uploadez ? cliquez sur le boutton upload un fichier{" "}
            </p>
            <button
              data-target="#kratosModal"
              data-toggle="modal"
              className="kratos-upload-button"
            >
              uploadez un fichier{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cloud;
