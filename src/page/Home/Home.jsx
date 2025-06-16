import React from "react";
import BannerSlider from "./BannerSlider";
import MapDetails from "./MapDetails";
import FeaturedRooms from "./FeaturedRooms";
import LatestReviews from "./LatestReviews";

const Home = () => {
  return (
    <>
      <div>
        <BannerSlider></BannerSlider>
        <MapDetails></MapDetails>
        <FeaturedRooms></FeaturedRooms>
        <LatestReviews></LatestReviews>
      </div>
    </>
  );
};

export default Home;
