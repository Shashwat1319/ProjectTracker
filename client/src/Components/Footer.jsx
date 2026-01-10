import React from "react";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagramSquare } from "react-icons/fa";
const Footer = () => {
  const social = [
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/shaswatsrivastava131/",
      icon:<CiLinkedin/>
    },
    {
      title: "Github",
      link: "https://www.github.com/shashwat1319/",
      icon:<FaGithub/>
    },
    {
        title:"Instagram",
        link:"https://www.instagram.com/shashwat.srivastava02/",
        icon:<FaInstagramSquare/>
    }
  ];

  return (
    <footer className="bg-light py-5">
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-sm-4 mb-3 mb-sm-0">
            <h5>Client Project Tracker</h5>
          </div>

          {/* Middle Column */}
          <div className="col-sm-4 mb-3 mb-sm-0">
            <ul className="list-unstyled">
              <li>Project Management</li>
              <li>Task Tracking</li>
              <li>Activity Logs</li>
              <li>Issue Resolution</li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="col-sm-4">
            <h6>Social</h6>
            <ul className="list-unstyled">
              {social.map((item, index) => (
                <li key={index} >
                  {item.icon} <a  className="text-decoration-none text-dark" href={item.link} target="_blank" >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
