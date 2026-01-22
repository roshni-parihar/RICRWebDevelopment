import React from "react";
import { useAuth } from "../../../context/AuthContext";

const EditProfileModal = ({ onClose }) => {
  return (
    <>
      <div className="fixed flex items-center justify-center  inset-0 bg-black/80 z-100">
        <div className="bg-white w-5xl max-h-[85vh] overflow-y-auto">
          <div>EditProfileModal</div>
          <button className="border rounded-2xl bg-red-900  p-3" onClick={() => onClose()}>X</button>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
