import React from "react";

const ImageInfo = (props) => {
  const [source, setSource] = React.useState();
  const [currentFile, setCurrent] = React.useState({ nom: "" });

  const handleClick = (ev) => {
    setCurrent({ nom: ev.target.name });
    const extension = ev.target.name.split(".")[1];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/newLink/readFile/", true);
    xhr.responseType = "arraybuffer";

    xhr.onreadystatechange = function (ev) {
      if (xhr.readyState === 4) {
        // create blob file xhr.response which came from server
        const blob = new Blob([xhr.response], { type: "image/" + extension });

        // now let us create link (url ) from blob file
        const url = window.URL.createObjectURL(blob);
        // let us change ower source state to change source of ower image
        setSource(url);
      }
    };
    xhr.setRequestHeader("Content-Type", "Application/json");
    // send informations
    xhr.send(
      JSON.stringify({ foldName: ev.target.name, filePath: ev.target.id })
    );
  };

  const handleDownloadClick = (event) => {
    const filename = event.target.name;
    const extension = event.target.name.split(".")[1];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/newLink/readFile/", true);
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = function (ev) {
      if (xhr.readyState === 4) {
        const blob = new Blob([xhr.response], { type: "image/" + extension });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.getElementById("root").append(a);
        a.click();
        return a.remove();
      }
    };
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify({ foldName: filename, filePath: event.target.id }));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div style={{ margin: "1rem auto" }}>
        <div
          style={{
            width: "600px",
            height: "500px",
            display: "grid",
            background: "#eee",
            placeItems: "center",
          }}
        >
          {source !== undefined && (
            <img
              id="myImage"
              src={source}
              width="100%"
              height="100%"
              alt="myImage"
            />
          )}
        </div>
        <h5 className="font-weight-bold text-primary display-5">
          {currentFile.nom}
        </h5>
      </div>
      <div className="d-flex flex-column justify-content-around mt-3">
        <h3 className="text-center font-weight-bold mb-3">
          {" "}
          La listes de vos images
        </h3>
        {props.files.map(function (file) {
          console.log(file);
          return (
            <ul key={file._id} className="list-group">
              <li
                style={{ width: "40rem" }}
                className="list-group-item d-flex flex-wrap justify-content-between align-items-center list-group-item-action"
              >
                <h5>{file.originalname} </h5>
                <p>{file.size / 8000} Ko</p>
                {file.isDownloaded && (
                  <button
                    id={file.path}
                    name={file.originalname}
                    onClick={handleDownloadClick}
                    className="btn btn-success btn-xs"
                  >
                    <i className="fa fa-download" aria-hidden="true"></i>{" "}
                    telecharger
                  </button>
                )}
                <button
                  name={file.originalname}
                  id={file.path}
                  onClick={handleClick}
                  className="btn btn-outline-info btn-xs"
                >
                  Voire
                </button>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default ImageInfo;
