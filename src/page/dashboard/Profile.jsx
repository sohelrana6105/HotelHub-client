import React, { useContext } from "react";
import { Authcontext } from "../../context/Authcontext";

const Profile = () => {
  const { user } = useContext(Authcontext);
  const { displayName, email, photoURL, metadata } = user || {};
  const createdAt = metadata?.creationTime;
  const lastLogin = metadata?.lastSignInTime;

  return (
    <div
      className="w-full p-4 flex flex-col items-center bg-white rounded-lg shadow-sm
                    sm:p-6 sm:flex-row sm:items-start sm:gap-6"
    >
      {/* Profile Picture */}
      <div className="mb-3 sm:mb-0">
        {photoURL ? (
          <img
            src={photoURL}
            alt={`${displayName}'s profile`}
            className="w-20 h-20 rounded-full border-2 border-indigo-400 object-cover
                       md:w-32 md:h-32"
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-4xl font-semibold border-2 border-indigo-400
                          md:w-32 md:h-32 md:text-6xl"
          >
            {displayName ? displayName[0] : "U"}
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="text-center sm:text-left flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 md:text-2xl">
          {displayName || "No Name"}
        </h2>
        <p className="text-xs text-gray-500 truncate w-40 mx-auto sm:mx-0 sm:w-auto md:text-base">
          {email || "No Email"}
        </p>

        <div className="text-xs text-gray-600 space-y-1 border-t pt-2 mt-4 sm:border-t-0 sm:pt-0 sm:mt-2 sm:text-sm md:text-base">
          <p>
            <strong>Created:</strong>{" "}
            {createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown"}
          </p>
          <p>
            <strong>Last Login:</strong>{" "}
            {lastLogin ? new Date(lastLogin).toLocaleDateString() : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
