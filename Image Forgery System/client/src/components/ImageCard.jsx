import React from "react";

const ImageCard = ({ label, value }) => {
  return (
    <div className="bg-(--bg-card) p-4 rounded-lg w-64 text-center">
      <p className="text-sm text-(--text-muted)">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
};

export default ImageCard;
