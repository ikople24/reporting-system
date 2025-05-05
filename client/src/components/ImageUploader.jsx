import { useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle } from "lucide-react";

const ImageUploader = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "myappimages"); // 👈 กรอกค่า upload_preset ของ cloudinary

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dczmhfvgh/image/upload", // 👈 เปลี่ยนเป็น cloud name ของคุณ
        formData
      );

      onUploadComplete(res.data.secure_url); // ✅ ส่ง url กลับไป
      setSuccess(true);
    } catch (err) {
      console.error("Upload error:", err);
      alert("อัพโหลดรูปไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {!success && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {loading && (
            <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
          )}
        </>
      )}
      {success && (
        <div className="flex items-center justify-center gap-2 text-green-500 p-4">
          <CheckCircle className="w-6 h-6" />
          <span>อัพโหลดสำเร็จ</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
