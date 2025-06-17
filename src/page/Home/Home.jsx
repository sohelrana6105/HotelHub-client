import React, { useEffect, useState } from "react";
import BannerSlider from "./BannerSlider";
import MapDetails from "./MapDetails";
import FeaturedRooms from "./FeaturedRooms";
import LatestReviews from "./LatestReviews";
import OfferModal from "./OfferModal";

const Home = () => {
  const [showOffer, setShowOffer] = useState(false);

  const offerData = {
    title: " Summer Special 30% OFF!",
    description: "Book your stay now and enjoy 30% off this summer!",
    image: "https://i.ibb.co/Y7F2wFT2/Single-Room-with-View.jpg",
    code: "SUMMER30",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOffer(true);

      const timer2 = setTimeout(() => {
        setShowOffer(false);
      }, 3000);

      return () => clearTimeout(timer2);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        <BannerSlider></BannerSlider>
        <MapDetails></MapDetails>
        <FeaturedRooms></FeaturedRooms>
        <LatestReviews></LatestReviews>

        <OfferModal
          isOpen={showOffer}
          onClose={() => setShowOffer(false)}
          offer={offerData}
        ></OfferModal>
      </div>
    </>
  );
};

export default Home;
