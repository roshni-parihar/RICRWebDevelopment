import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = 5000;

// middlewares
app.use(cors());
app.use(express.json());

// multer config
const upload = multer({ dest: "uploads/" });

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// image upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "Image received successfully",
    fileName: req.file.originalname,
    size: req.file.size,
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
