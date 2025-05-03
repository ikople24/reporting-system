// client/src/components/ImageUploader.jsx
import { useState } from "react";
import axios from "axios";

const ImageUploader = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setError(null);

      const res = await axios.post("/api/upload", formData);
      onUploadComplete(res.data.url); // ✅ ส่ง url กลับ parent
      setIsUploading(false);
    } catch (err) {
      console.error("Upload error", err);
      setError("เกิดข้อผิดพลาดในการอัพโหลด");
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {isUploading && <p>กำลังอัพโหลด...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;