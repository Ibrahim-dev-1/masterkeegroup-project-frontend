import React from 'react';
import './publicUpload.css';

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

// upload css file for publicUpload

export default function(prop) {
    const filesPondRef = React.useRef();

return (
    
    <div className="kratos-upload">
                    <h2 className="display-4 text-center text-light">Bienvenu à <span className="display-3 text-warning">Masterkee <span style={{color:"#b3f9fc"}} className="display-3">Cloud </span></span></h2>
                    <div className="kratosText">
                        <h5>Envoyé tous vos fichiers de façons rapide graçe à cette plateform de transfert de fichiers masterkee cloud</h5>
                        <h5>Vous pouvez envoyé de fichiers pesant plus de 10 Gb via cette plateform.</h5>
                    </div>
                    <form className="kratos-container" encType="multipart/form-data">
                        {/* Pass FilePond properties as attributes */}
                        <FilePond
                            ref = {filesPondRef }
                            allowMultiple={true}
                            maxFiles={3}
                            name="myFiles"
                            server = {{
                            process:{
                                url: '/upload',
                                method: 'POST',
                            }
                            }}

                            onupdatefiles={fileItems => {
                                console.log("update...")
                            }}
                        />
                    </form>
        </div>
)}
