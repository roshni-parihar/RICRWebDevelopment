import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Result from "./pages/Result";

const App = () => {
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("imageName");
    if (stored) setImageName(stored);
  }, []);

  useEffect(() => {
    if (imageName) localStorage.setItem("imageName", imageName);
  }, [imageName]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/upload"
          element={<Upload setImageName={setImageName} />}
        />
        <Route
          path="/result"
          element={<Result imageName={imageName} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
