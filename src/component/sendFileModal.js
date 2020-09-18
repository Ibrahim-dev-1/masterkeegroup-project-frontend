import React from "react";
import "../loading.css";
import { createNotification } from "../myFonctions";
import Notification from "react-notifications-component";

const SendFileModal = (props) => {
  // console.log(props.files)
  const [emails, setEmails] = React.useState([]);
  const [newEmail, setNewEmail] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const saveSend = () => {
    fetch("/newLink", {
      method: "POST",
      body: JSON.stringify({
        files: props.files,
        emails: emails,
        type: props.foldName,
      }),
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.errors) throw data.message;
        console.log(data);
        return sendThrowEmail(data.id);
      })
      .catch(function (err) {
        return createNotification(
          "Erreur d'enrégistrement dans la base de donné ",
          "danger",
          err.toString(),
          "top-right"
        );
      });
  };

  const sendThrowEmail = function (linkId) {
    setLoading(true);
    setTimeout(function () {
      fetch("/email/sendMails", {
        method: "POST",
        body: JSON.stringify({
          url: `http://localhost:3000/mastercloud/files/private/${linkId}`,
          emails: emails,
        }),
        headers: {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.errors) {
            throw data.message;
          }

          setEmails([]);
          setNewEmail("");
          setLoading(false);
          setTimeout(function () {
            createNotification(
              "Envoie Réuissi",
              "success",
              "l'email à été envoyé ",
              "top-right"
            );
          }, 3000);
          return document.getElementById("closeSendFileModale").click();
        })
        .catch(function (errors) {
          setLoading(false);
          return createNotification(
            "Echec d'envoie",
            "danger",
            errors.toString(),
            "top-right"
          );
        });
    }, 2000);
  };
  const handleClick = () => {
    if (emails.length > 0 && props.files.length > 0) {
      return saveSend();
    }

    return createNotification(
      "Echec d'Envoie",
      "danger",
      "Veuillez entrer une adresse mail valide",
      "top-right"
    );
  };

  return (
    <div
      style={{ overflowY: "scroll", height: "400px" }}
      data-keyboard="true"
      data-backdrop="static"
      className="modal fade"
      id="sendModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <Notification />
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="lds-dual-ring"></div>
        </div>
      )}
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title text-center">Les fichiers par email</h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-md-4 p-3">
                  <h5 className="font-weight-bold">
                    Listes des fichiers cochés
                  </h5>
                  <ul className="list-group">
                    {props.files.length > 0 ? (
                      props.files.map(function (file) {
                        return (
                          <li
                            key={Math.random() * 10000}
                            className="list-group-item list-group-item-action"
                          >
                            <i
                              className="fa fa-file text-info mr-3"
                              aria-hidden="true"
                            ></i>
                            {file.originalname}
                          </li>
                        );
                      })
                    ) : (
                      <li className="list-group-item ">la Listes est vide </li>
                    )}
                  </ul>
                </div>
                <div className="col-md-4 p-3">
                  <h5 className="font-weight-bold">les des adresses email</h5>
                  <ul className="list-group">
                    {emails.length ? (
                      emails.map(function (email) {
                        return (
                          <li
                            key={Math.random() * 10000}
                            className="list-group-item list-group-item-action position-relative "
                          >
                            <i
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                "&:hover": { color: "red" },
                              }}
                              className="fa fa-window-close"
                              value={email}
                              onClick={function (ev) {
                                console.log(email);
                                return setEmails(
                                  emails.filter(function (e) {
                                    return e !== email;
                                  })
                                );
                              }}
                              aria-hidden="true"
                            ></i>
                            {email}
                          </li>
                        );
                      })
                    ) : (
                      <li className="list-group-item ">la Listes est vide </li>
                    )}
                  </ul>
                </div>
                <div className="col-md-4 p-2">
                  <h5 className="font-weight-bold">
                    Ajoutez une adresse email
                  </h5>
                  <hr />
                  <button
                    type="button"
                    data-target="#emailCollapse"
                    data-toggle="collapse"
                    className="btn btn-outline-success"
                  >
                    <i className="fa fa-plus mr-3" aria-hidden="true"></i>
                    Ajouter
                  </button>
                  <div className="collapse" id="emailCollapse">
                    <div className="container mt-3">
                      <div className="input-group">
                        <input
                          type="email"
                          require="true"
                          value={newEmail}
                          onChange={function (ev) {
                            return setNewEmail(ev.target.value);
                          }}
                          className="bg-light border form-control"
                          placeholder="coolkratos1@gmail.com"
                        />
                        <input
                          type="submit"
                          onClick={function (ev) {
                            if (newEmail !== "") {
                              setNewEmail("");
                              return setEmails([...emails, newEmail]);
                            }
                          }}
                          className="btn-success btn-sm"
                          value="Ok"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              id="closeSendFileModale"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              Fermé
            </button>
            <button
              type="button"
              onClick={handleClick}
              className="btn btn-outline-success"
            >
              Envoyés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendFileModal;
