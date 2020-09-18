import React from "react";

import { fetchFiles, useDispatchToProps } from "../contexts/filesProvider";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function (props) {
  const filesPondRef = React.createRef();
  const dispatch = useDispatchToProps();

  return (
    <div
      className="modal fade"
      data-show="false"
      data-keyboard="true"
      data-backdrop="static"
      id="kratosModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4
              className="modal-title text-center text-primary"
              style={{ maring: "0px auto" }}
              id="exampleModalCenterTitle"
            >
              Uploadé
            </h4>
            <button
              type="button"
              id="myCloseButton"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form
              className="demo"
              id="kratosFile"
              encType="multipart/form-data"
            >
              {/* Pass FilePond properties as attributes */}
              <FilePond
                ref={filesPondRef}
                allowMultiple={true}
                maxFiles={3}
                name="myFiles"
                onprocessfiles={() => fetchFiles(dispatch)}
                server={{
                  process: {
                    url: "/upload",
                    method: "POST",
                  },
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
