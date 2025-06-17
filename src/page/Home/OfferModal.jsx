import React from "react";
import { MdCelebration } from "react-icons/md";

const OfferModal = ({ isOpen, onClose, offer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-opacity-50 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        <img
          src={offer.image}
          alt="Offer"
          className="rounded-xl mb-4 h-48 object-cover w-full"
        />
        <h2 className="text-xl font-bold text-center mb-2 flex justify-center items-center gap-1">
          <MdCelebration /> {offer.title}
        </h2>
        <p className="text-gray-700 text-center mb-3">{offer.description}</p>
        <div className="text-center">
          <span className="bg-yellow-300 text-black px-4 py-1 rounded-full font-bold">
            Use Code: {offer.code}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
