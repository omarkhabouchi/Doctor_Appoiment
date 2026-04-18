import React from "react";
import HeroSlide from "../components/HeroSlide";
import CallToAction from "../components/CallToAction";
import About from "../components/About";
import Status from "../components/Status";
import Departments from "../components/Departments";
import Doctors from "../components/Doctors";

const Home = () => {
  return (
    <div>
      <HeroSlide />
      <CallToAction />
      <About />
      <Status />
      <Departments />
      <Doctors />
    </div>
  );
};

export default Home;
