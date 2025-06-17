import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const LatestReviews = () => {
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://hotel-hub-server.vercel.app/home-reviews")
      .then((res) => {
        setRecentReviews(res.data);
        setLoading(false);
      });
  }, []);

  console.log(recentReviews);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 4 },
    desktop: { breakpoint: { max: 1280, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  return (
    <div className="py-10 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Reviews</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Carousel
          autoPlay={true}
          infinite={true}
          swipeable
          responsive={responsive}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          pauseOnHover={true}
        >
          {recentReviews.map((review, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg p-6 mx-2 text-center"
            >
              <p className="text-xl text-gray-400 mt-2">{review.user}</p>

              <p className="text-yellow-500 font-bold flex justify-center items-center gap-2">
                <FaStar /> Rating: {review.rating}
              </p>

              <p className="text-gray-600 mb-3 italic ">
                review : {review.comment}
              </p>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default LatestReviews;
