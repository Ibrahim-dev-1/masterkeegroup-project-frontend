import React from "react";
import io from "socket.io-client";

const VideoStreaming = () => {
  const localVideo = React.useRef();
  const remoteVideo = React.useRef();
  const textareaRef = React.useRef();
  const peer = React.useRef();

  // creation des states

  React.useEffect(function () {
   

    // initialisation of peer connection 
    peer.current = new RTCPeerConnection({});

    // add Events to peerConnection 
    peer.current.onicecandidate = (candidate) => {
      console.log("ice candidate: ", JSON.stringify(candidate));
    }

    peer.current.oniceconnectionstatechange = e => {
      console.log("ice connection state change :" );
    }

    peer.current.onaddstream = (stream) => {
      console.log("add stream event:" );
      remoteVideo.current.srcObject = stream;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        localVideo.current.srcObject = stream;
        peer.current.addStream = stream;

      }).then(err => console.log(err) );
  });

  // create offer 
  const createOffer = () => {
    console.log("create offer ");
    peer.current.createOffer()
    .then(sdp => {
      console.log(JSON.stringify(sdp));
      peer.current.setLocalDescription(new RTCSessionDescription(sdp));
    }).catch(function(err){ console.log("Erreur de creation de offer" , err)});
  }

  // create answer 
  const createAnswer = () => {
    console.log("create answer ")
    peer.current.createAnswer()
    .then(sdp => {
      console.log(JSON.stringify(sdp))
      peer.current.setLocalDescription(sdp)
    }).catch(function(err){ console.log("Erreur de creation du answer ", err)})
  }


// set set remote descritpion
const setRemoteDescription = () => {
  console.log("Set remote description ");
  const sdp = JSON.parse(textareaRef.current.value);
  peer.current.setRemoteDescription(new RTCSessionDescription(sdp));
}

// add candidate
const addCandidate = ( ) => {
  console.log("add candidate ");
  const candidate = JSON.parse(textareaRef.current.value);
  peer.current.addicecandidate(new RTCIceCandidate(candidate));
}


  return (
    <div className="container ">
      <h3 className="text-primary m-4 text-center display-3">
        Bienvenu sur video streaming
      </h3>
      <h5 className="p-3 border rounded text-center text-muted">
        La plateforme de video de conférence
        <span className="text-danger">Master stream </span>
        est toute prète pour vous. Vous pouvez streaming en invitant d'autre
        personnes à vous rejoindre !
      </h5>
      <div className="d-flex justify-content-between">
        <div className="mt-4 border rounded p-2">
          <h3 className="font-weight-bold text-center"> Vous </h3>
          <video
            width="300px"
            height="300px"
            id="userVideo"
            autoPlay
            playsInline
            muted
            ref={localVideo}
          ></video>
          <div className="p-1">
            <button onClick={createOffer} type="button" className="btn btn-outline-primary btn-xs">create offer</button>
            <button onClick={createAnswer} type="button" className="btn btn-outline-primary btn-xs">create answer</button>
          </div>
          <textarea ref={textareaRef}></textarea>
          <div className="p-1">
            <button onClick={setRemoteDescription} type="button" className="btn btn-outline-primary btn-xs">set Remote description </button>
            <button onClick={addCandidate} type="button" className="btn btn-outline-success btn-xs">add candidate</button>
          </div>
        </div>
        <div className="mt-4 border rounded p-2">
          <h3 className="font-weight-bold text-center"> Votre partenaire </h3>
          <video
            width="300px"
            height="300px"
            id="userVideo"
            autoPlay
            playsInline
            muted
            ref={remoteVideo}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default VideoStreaming;
