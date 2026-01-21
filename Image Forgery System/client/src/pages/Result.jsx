import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import ImageCard from "../components/ImageCard";

const Result = ({ imageName }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#334155";
    ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("ELA Visualization", 70, 150);
  }, []);

  return (
    <>
      <Navbar title="Detection Result" />
      <div className="flex flex-col items-center gap-6 pt-10">
        <div className="flex gap-4">
          <ImageCard label="Image Name" value={imageName || "N/A"} />
          <ImageCard label="Forgery Status" value="Suspicious" />
        </div>
        <canvas
          ref={canvasRef}
          width="300"
          height="300"
          className="border"
        />
      </div>
    </>
  );
};

export default Result;
