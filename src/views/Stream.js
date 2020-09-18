import React from 'react';
import Navbar from '../component/Navbar'

const Stream = props =>{
    const [media, setMedia ] = React.useState({camera: true, audio: true , demarrer: true })

    const demarrerClick = () => {
        let emitterVideo = document.querySelector("#emitter-video");
         navigator.mediaDevices.getUserMedia({
            video: media.camera,
            audio: media.audio
        }).then(stream => {
            console.log(stream);
            emitterVideo.srcObject = stream;            
            emitterVideo.play();
        })
        .catch(err => console.log(err))

    }
    return(
        <React.Fragment>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-6 p-3">
                        <h2>Vous</h2>
                        <video  id="receiver-video" width="100%" height="300px"></video>
                        <p>
                            <button 
                                className="btn btn-xm btn-outline-info"
                                onClick = {demarrerClick}
                            >démarrer</button>
                            <button className="btn btn-xm btn-outline-info">audio</button>
                            <button className="btn btn-xm btn-outline-info">camera</button>
                        </p>
                        
                    </div>
                    <div className="col-sm-6">
                        <h2>Emètteur</h2>
                        <video id="emitter-video" width="100%" height="300px"></video>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Stream;