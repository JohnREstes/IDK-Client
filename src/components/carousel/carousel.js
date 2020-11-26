import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux'
 
class RestaurantCarousel extends Component {

    setOnClick(businessName){

    }

   buildCarousel(){
    let carouselDiv = [];
    for(let i = 0; i < this.props.businesses.length; i++){
        let businessName = this.props.businesses[i].name;
        let businessURL = this.props.businesses[i].image_url;
        carouselDiv.push(   <div className="carousel-div" key={businessName} onClick={() => this.setOnClick(businessName)}>
                                <img className="carousel-img" src={businessURL} alt={businessName} />
                                <p className="legend">{businessName}</p>
                            </div>)
    }
    return carouselDiv
   } 
    
    render() {
        let carouselDiv = this.buildCarousel()
        return (
            <Carousel className="max-width"
            showThumbs={false}
            infiniteLoop
            centerMode
            centerSlidePercentage={90}>
                {carouselDiv}
            </Carousel>
        );
    }
}

export default connect(
  )(RestaurantCarousel);