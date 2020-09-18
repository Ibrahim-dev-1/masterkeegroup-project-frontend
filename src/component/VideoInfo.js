import React from "react";
import Video from "../assets/img/videos.png";
const VideoInfo = (props) => {
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
        const blob = new Blob([xhr.response], { type: "video/" + extension });

        // now let us create link (url ) from blob file
        const url = window.URL.createObjectURL(blob);
        // let us change ower source state to change source of ower image
        setSource(url);
      }
    };
    xhr.setRequestHeader("Content-Type", "Application/json");
    // send informations
    return xhr.send(JSON.stringify({ filePath: ev.target.id }));
  };

  const handleDownloadClick = (event) => {
    const filename = event.target.name;
    const extension = event.target.name.split(".")[1];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/newLink/readFile/", true);
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = function (ev) {
      if (xhr.readyState === 4) {
        const blob = new Blob([xhr.response], { type: "video/" + extension });
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
    return xhr.send(JSON.stringify({ filePath: event.target.id.toString() }));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div style={{ margin: "1rem auto" }}>
        <div
          style={{
            width: "600px",
            height: "500px",
            display: "grid",
            background: "#eeeeee",
            placeItems: "center",
          }}
        >
          {source !== undefined ? (
            <video
              id="myImage"
              src={source}
              width="100%"
              height="100%"
              controls
            />
          ) : (
            <h3 style={{ display: "flex", flexDirection: "column" }}>
              <img width="60px" height="60px" src={Video} />
              <span>Video</span>
            </h3>
          )}
        </div>
        <h5 className="font-weight-bold text-primary display-5">
          {currentFile.nom}
        </h5>
      </div>
      <div className="d-flex flex-column justify-content-around mt-3">
        <h3 className="text-center font-weight-bold mb-3">
          {" "}
          La listes de vos Videos
        </h3>
        {props.files.map(function (file) {
          return (
            <ul key={file._id} className="list-group">
              <li
                style={{ width: "40rem" }}
                className="list-group-item flex-wrap d-flex justify-content align-items-center list-group-item-action"
              >
                <p>{file.originalname} </p>
                <p>{file.size / 8000000} Mo</p>
                {file.isDownloaded && (
                  <button
                    id={file.path}
                    name={file.originalname}
                    onClick={handleDownloadClick}
                    className="btn btn-success btn-xs"
                  >
                    <i
                      className="fa fa-download text-success"
                      aria-hidden="true"
                    ></i>{" "}
                    telecharger
                  </button>
                )}
                <button
                  name={file.originalname}
                  id={file.path}
                  className="btn btn-outline-info btn-xs"
                  onClick={handleClick}
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

export default VideoInfo;
