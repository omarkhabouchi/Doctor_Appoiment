import React from "react";
import HeroSlide from "../components/HeroSlide";
import CallToAction from "../components/CallToAction";
import About from "../components/About";
import Status from "../components/Status";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <div>
      <HeroSlide />
      <CallToAction />
      <About />
      <Status />
      <Departments />
    </div>
  );
};

export default Home;
