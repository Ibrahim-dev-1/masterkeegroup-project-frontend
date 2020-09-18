import React from "react";
import { useParams } from "react-router-dom";
import ImageInfo from "../component/ImageInfo";
import VideoInfo from "../component/VideoInfo";

const PrivateFiles = (props) => {
  const linkId = useParams();
  const [link, setLink] = React.useState({ files: [], link: "" });

  const findLinkId = () => {
    fetch("/newLink/info/" + linkId.url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.errors) throw data.message;
        return setLink(data);
      })
      .catch(function (err) {
        return console.log(err);
      });
  };

  React.useEffect(function () {
    findLinkId();
  }, []);

  const displaysInfo = () => {
    if (link.files.length > 0) {
      if (link.link.type === "image") {
        return <ImageInfo files={link.files} />;
      }
      if (link.link.type === "video") {
        return <VideoInfo files={link.files} />;
      }
      if (link.link.type === "music") {
        return console.log("ce fichier est de type musique");
      }
    }

    return (
      <h4 className="font-weight-bold text-center text-danger">
        {" "}
        Ce fichier n'exist plus !
      </h4>
    );
  };

  return (
    <React.Fragment>
      <div
        style={{
          margin: " 0 auto",
          padding: "2rem",
          maxWidth: "60rem",
        }}
      >
        <div className="">{displaysInfo()}</div>
      </div>
    </React.Fragment>
  );
};

export default PrivateFiles;
