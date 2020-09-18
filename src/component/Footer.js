import React from 'react';
import { Link } from 'react-router-dom'
const Footer = props => {
    return  <footer style={{margin:"0",height: "3rem",paddingTop:"0.75rem",border:"1px solid #ccc" , background: "#fff"}} className="text-center">
                <strong>Copyright &copy; 2020-2021 <Link to="http://masterkeegroup.com">  MasterkeeGroup  </Link>.</strong>
                    Tous droit réservé.
                <div className="float-right d-none d-sm-inline-block">
                    <b>coolkratos1@gmail.com</b> 
                </div>
            </footer>
}

export default Footer;