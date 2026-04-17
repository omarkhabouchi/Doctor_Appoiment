import React from "react";
import HeroSlide from "../compoments/HeroSlide";
import CallToAction from "../compoments/CallToAction";
import About from "../compoments/About";
import Status from "../compoments/Status";
import Departments from "../compoments/Departments";
import Addappointment from "../compoments/Addappointment";

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

// import React from 'react'

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home
