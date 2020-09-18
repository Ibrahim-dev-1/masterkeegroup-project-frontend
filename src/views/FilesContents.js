import React from "react";
import { Link } from "react-router-dom";
import "../loading.css";
import Notification from "react-notifications-component";
import {
  useDispatchToProps,
  fetchFiles,
  useStateToProps,
} from "../contexts/filesProvider";
import "./fileContents.css";

const FilesContents = () => {
  const dispatch = useDispatchToProps();
  const state = useStateToProps();

  React.useEffect(function () {
    fetchFiles(dispatch);
  }, []);

  return (
    <React.Fragment>
      <Notification />
      {console.log(state)}
      <h3 className="font-weight-bold">Tous les fichiers </h3>
      {state.isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-around">
          {state.folders.length &&
            state.folders.map((fold) => {
              return (
                <Link to={"/dashboard/admin/cloud/" + fold.nom} key={fold.id}>
                  <div className="fold-content">
                    <p className="fold-size">{fold.elements.length}</p>
                    <img
                      className="fold-image"
                      src={fold.icon}
                      alt="logo img"
                    />
                    <p className="fold-name">{fold.nom}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </React.Fragment>
  );
};

export default FilesContents;
