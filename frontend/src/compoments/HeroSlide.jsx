// import React from 'react'

// const HeroSlide = () => {
//   return (
//     <div>HeroSlide</div>
//   )
// }

// export default HeroSlide
import React from "react";
import Slider from "react-slick";
import carousel_1 from "../img/hero-carousel/hero-carousel-1.jpg";
import carousel_2 from "../img/hero-carousel/hero-carousel-2.jpg";
import carousel_3 from "../img/hero-carousel/hero-carousel-3.jpg";

function HeroSlide() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      image: carousel_1,
      title: "your helth our perioriter",
      text: "we proovider advanced medical",
    },
    {
      image: carousel_2,
      title: "",
      text: "",
    },
    {
      image: carousel_3,
      title: "",
      text: "",
    },
  ];

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[80vh] overflow-hidden">
            <img src={slide.image} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-4xl text-[#46daea] font-bold mb-4">
                {slide.title}
              </h2>
              <p className="max-w-xl text-xl">{slide.text}</p>

              <button className="mt-6 inline-block  px-6 py-3 rounded">
                Read More
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default HeroSlide;
