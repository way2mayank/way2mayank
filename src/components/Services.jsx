import React from 'react';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";

const Services = () => {
  return (
    <div >
        <Carousel 
        infiniteLoop
         autoPlay
          showStatus={false}
          showArrows={false}
          interval ={1000}
          >
        <div>
            <img src={img1} alt="Item1" />
            <p className='legend'>Front end</p>
        </div>

        <div>
            <img src={img2} alt="Item2" />
            <p className='legend'>Back end</p>
        </div>
        </Carousel>

    </div>

  )
}

export default Services 