import * as React from "react";
import githubSVG from "../images/github.svg";

function Footer() {
  return (
    <footer className="bg-white mx-auto flex items-center justify-between p-6 min-w-full lg:px-8 ">
      <p className="text-slate-600 text-xl my-4">Made by Cole Burch</p>
      <a href="https://github.com/ColeBurch">
        <img src={githubSVG} alt="GitHub" className="w-5 h-5 mx-2" />
      </a>
    </footer>
  );
}

export default Footer;
