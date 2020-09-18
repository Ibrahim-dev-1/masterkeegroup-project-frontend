import React from "react";

const OtherInfo = (props) => {

  const handleClick = (event) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/newLink/readFile/", true);
    xhr.responseType = "arraybuffer";
    const name = event.target.name;
    const id = event.target.id;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // create blob file xhr.response which came from server
        const blob = new Blob([xhr.response]);

        // now let us create link (url ) from blob file
        const url = window.URL.createObjectURL(blob);
        // let us change ower source state to change source of ower image
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        console.log(url);
        const root = document.getElementById("other");
        root.append(a);
        a.click();

        return a.remove();
      }
    };
    xhr.setRequestHeader("Content-Type", "Application/json");
    // send informations
    xhr.send(
      JSON.stringify({ foldName: name, filePath: id })
    );
  };

  return (
    <div style={{ margin: "2rem auto", maxWidth: "40rem" }} id="other">
      <h3 className="font-weight-bold  text-center display-4">
        La listes de tous vos fichiers 
      </h3>
      <ul className="list-group mt-3">
        {props.files.map(function (file) {
          const createdAt = new Date(file.birthtime).toLocaleString();
          return (
            <li key={file.nom} className="list-group-item  d-flex justify-content-around">
              <span className="font-weight-bold text-primary">{file.nom}</span>
              <span className="font-weight-bold">{file.type}</span>
              <span className="text-danger">{file.taille}</span>
              <span className="text-muted">{createdAt}</span>
              <button className="btn btn-success btn-xs" name={ file.nom } id={file.filePath } onClick={handleClick}>Télécharger</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OtherInfo;
