import { FcRating } from "react-icons/fc";
import { Link } from "react-router";

const RoomCard = ({ room }) => {
  const {
    _id,
    image,
    title,
    shortDescription,
    price,
    location,
    rating,
    availability,
  } = room;

  return (
    <Link to={`/room/${_id}`}>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl  transform hover:scale-107 transition duration-300 ">
        <img src={image} alt={title} className="w-full h-52 object-cover " />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-1">{title}</h2>
          <p className="text-gray-600 mb-2">{shortDescription}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-indigo-600">
              ${price}/night
            </span>
            <span className="text-sm text-gray-500">{location}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-yellow-500 flex items-center gap-2">
              <FcRating /> {rating}
            </span>
            <span
              className={`font-medium ${
                availability ? "text-green-600" : "text-red-500"
              }`}
            >
              {availability ? "Available" : "Booked"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
