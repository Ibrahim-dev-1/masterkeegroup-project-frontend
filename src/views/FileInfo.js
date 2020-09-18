import React from "react";
import { useParams } from "react-router-dom";
import SendFileModal from "../component/sendFileModal";
import "./fileInfo.css";
import "../loading.css";
import {
  useDispatchToProps,
  useStateToProps,
  fetchFiles,
} from "../contexts/filesProvider";
import { createNotification } from "../myFonctions";

const FileInfo = (props) => {
  const dispatch = useDispatchToProps();
  const state = useStateToProps();

  const [tabFichiers, setTabFichier] = React.useState([]);
  const { foldName } = useParams();

  const handleSendClick = () => {
    if (!tabFichiers.length) return console.log("Veuillez cochez une case ");
    let button = document.createElement("button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#sendModal");
    document.getElementById("root").append(button);
    button.click();

    return button.remove();
  };
  const handlePublicClick = () => {
    if (!tabFichiers.length)
      return console.log(
        "Veuillez cochez les fichiers que vous voulez rendre publics "
      );
  };

  React.useEffect(function () {
    fetchFiles(dispatch);
  }, []);

  return (
    <React.Fragment>
      <SendFileModal
        foldName={foldName}
        setTabFichier={setTabFichier}
        files={tabFichiers}
      />
      {state.isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="container">
          <h3 className="text-center font-wieght-bold mb-3">
            {" "}
            La listes des fichiers
          </h3>
          <div className="mb-3 border d-flex flex-wrap justify-content-around rounded p-2">
            <button
              onClick={handleSendClick}
              disabled={tabFichiers.length > 0 ? false : true}
              className="btn btn-success"
            >
              Envoyé à une adresse
            </button>

            <button
              onClick={handlePublicClick}
              className="btn btn-outline-info"
            >
              Rendre public
            </button>
          </div>

          <table
            style={{ width: "100%", margin: "0px auto" }}
            className=" text-center table table-bordered table-hover"
          >
            <thead>
              <tr>
                <th className="font-weight-bold" scope="col">
                  #
                </th>
                <th className="font-weight-bold" scope="col">
                  Nom
                </th>
                <th className="font-weight-bold" scope="col">
                  Taille
                </th>
                <th className="font-weight-bold" scope="col">
                  Type
                </th>
                <th className="font-weight-bold" scope="col">
                  date
                </th>
                <th className="font-weight-bold" scope="col">
                  telecharger
                </th>
                <th className="font-weight-bold" scope="col">
                  public
                </th>
                <th className="font-weight-bold" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.folders.filter((e) => e.nom === foldName)[0].elements
                .length > 0 ? (
                state.folders
                  .filter((e) => e.nom === foldName)[0]
                  .elements.map(function (file) {
                    return (
                      <tr key={file._id}>
                        <td>
                          <input
                            onChange={function (ev) {
                              if (!ev.target.checked) {
                                return setTabFichier(
                                  tabFichiers.filter(function (element) {
                                    return element !== file;
                                  })
                                );
                              }
                              return setTabFichier([...tabFichiers, file]);
                            }}
                            type="checkbox"
                          />
                        </td>
                        <td className="text-primary">{file.originalname}</td>
                        <td>{file.size}</td>
                        <td className="text-info">{file.mimetype}</td>
                        <td className="text-muted">
                          {new Date(file.createdAt).toDateString()}
                        </td>
                        <td
                          className={
                            file.isDownloaded
                              ? "text-center text-success"
                              : "text-center text-danger"
                          }
                        >
                          <label className="kratos-switch">
                            <input
                              type="checkbox"
                              checked={file.isDownloaded}
                              onChange={(ev) => {
                                fetch("/fichier/updateFile/" + file._id, {
                                  method: "get",
                                  headers: {
                                    "content-type": "application/json",
                                    Authorization:
                                      "Bearer " +
                                      sessionStorage.getItem("token"),
                                  },
                                })
                                  .then((response) => response.json())
                                  .then((data) => {
                                    if (data.errors)
                                      throw new Error(data.message);
                                    console.log(data);
                                    return fetchFiles(dispatch);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                            />
                            <span className="kratos-slide"></span>
                          </label>
                          <span className="kratos-text">
                            {file.isDownloaded.toString()}
                          </span>
                        </td>
                        <td
                          className={
                            file.public ? "text-success" : "text-danger"
                          }
                        >
                          {file.public.toString()}
                        </td>
                        <td className="delete-container">
                          <i className="delete-icon fa fa-trash"></i>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr> pas de {foldName} </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default FileInfo;
