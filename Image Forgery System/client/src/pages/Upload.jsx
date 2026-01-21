import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Upload = ({ setImageName }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    setImageName(file.name);
    toast.success("Image uploaded successfully");
    navigate("/result");
  };

  return (
    <>
      <Navbar title="Upload Image" />
      <Toaster />
      <div className="flex justify-center pt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-(--bg-card) p-6 rounded-xl flex flex-col gap-4"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-black p-2 rounded"
          />
          <button
            type="submit"
            className="bg-(--success) py-2 rounded"
          >
            Analyze Image
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;
