import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";

import Clouds from "../assets/img/cloud.jpg";
import Stream from "../assets/img/stream.png";

const Dashboard = (props) => {
  return (
    <div className="container-fluid">
      <div className="text-center">
        <h1 className="display-2 text-info">MasterCloud </h1>
        <h4 className="">
          {" "}
          Télécharger ou stoker tous vos fichiers sur cette cloud{" "}
        </h4>
        <h4 className=""> Faite vos réuinion en ligne sur cette plateform </h4>
      </div>
      <div className="d-flex mt-5 justify-content-around align-items-center">
        <div className="card" style={{ maxWidth: "540px" }}>
          <div className="row">
            <div className="col-md-5">
              <img src={Clouds} height="100%" className="card-img" alt="..." />
            </div>
            <div className="col-md-7">
              <div className="card-body d-flex flex-column justify-content-center">
                <h3 className="card-title">Cloud</h3>
                <p className="card-text">
                  Le le module cloud vous permet d'uploadé vos fichiers
                </p>
                <p className="card-text">et de les téléchargés également.</p>
                <Link
                  className="btn btn-outline-info "
                  to="/dashboard/admin/cloud"
                >
                  Go to Cloud
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ maxWidth: "540px" }}>
          <div className="row">
            <div className="col-md-5">
              <img src={Stream} height="100%" className="card-img" alt="..." />
            </div>
            <div className="col-md-7">
              <div className="card-body d-flex flex-column justify-content-center">
                <h3 className="card-title">Stream</h3>
                <p className="card-text">
                  Faite vos conférences ou communication en live à travers cette
                  module de streaming
                </p>
                <Link
                  className="btn btn-outline-info "
                  to="/dashboard/admin/stream/"
                >
                  Go to Stream
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
