import React, { useState } from "react";

const Avatar = ({ src, firstName, lastName }) => {
  const [imgError, setImgError] = useState(false);

  const initials =
    `${firstName?.charAt(0) || ""} ${lastName?.charAt(0) || ""}`.toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center overflow-hidden">
      {src && !imgError ? (
        <img
          src={src}
          alt="avatar"
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-sm font-semibold">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
