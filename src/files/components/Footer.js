import React from "react";
import githubLogo from "../images/github-logo.png";

export default function Navbar() {
  return (
    <footer>
      Built By Jonathan Ro
      <a href="https://github.com/jonro2955" target="_blank" rel="noopener noreferrer">
        <img src={githubLogo} alt="github logo" width="50" height="50" />
      </a>
    </footer>
  );
}
