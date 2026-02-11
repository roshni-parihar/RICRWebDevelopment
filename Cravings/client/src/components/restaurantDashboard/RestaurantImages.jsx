import React, { useState } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";

const RestaurantImages = () => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    // console.log(files);
    // console.log(fileArray);
    let temp = [];
    fileArray.forEach((img) => {
      let imgURL = URL.createObjectURL(img);
      temp.push(imgURL);
    });
    setImagePreviews(temp.slice(0, 5));
    setImages(fileArray.slice(0, 5));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length) return toast.error("Select at least 1 image");
    setLoading(true);

    try {
      const form_data = new FormData();

      images.forEach((img) => {
        form_data.append("itemImages", img);
      });

      //trasnfer MenuData to formData
      const res = await api.post("/public/addRestaurantImages", form_data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      console.log(res.data.data);
      setImagePreviews([]);
      setImages([]);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Upload Restaurant Images</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Input */}
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <p className="text-sm text-gray-500 mt-1">
              You can select up to 5 images.
            </p>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-5 gap-2 mt-4">
              {imagePreviews.map((img, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 border rounded overflow-hidden relative"
                >
                  <img
                    src={img}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    onClick={() => {
                      setImages(images.filter((_, i) => i !== idx));
                      setImagePreviews(
                        imagePreviews.filter((_, i) => i !== idx),
                      );
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Images"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RestaurantImages;
