import { useEffect, useState } from "react";
import { fetchListProbs, deleteListProb } from "@/api/listprobs";
import ImageUploader from "@/components/ImageUploader";
import axios from "axios";

const AdminListProbs = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newName, setNewName] = useState(""); // ชื่อใหม่
  const [newFile, setNewFile] = useState(null); // ไฟล์ใหม่
  const [uploadedUrl, setUploadedUrl] = useState(null);


  // ✅ โหลดข้อมูล
  const loadData = async () => {
    const res = await fetchListProbs();
    setData(res.data);
    console.log(data);
  };

  // ✅ เปิด modal edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setNewName(item["Prob_name"]);
    setNewFile(null);
    console.log(item);
  };

  // ✅ บันทึกข้อมูลแก้ไข
  const handleUpdate = async () => {
    try {
      let updatedData = { Prob_name: newName };

      if (uploadedUrl) {
        updatedData.Prob_pic = uploadedUrl;
      }

      await axios.put(`/api/listprobs/${editingItem._id}`, updatedData);

      alert("อัพเดตข้อมูลเรียบร้อย");
      setEditingItem(null);
      loadData();
      setUploadedUrl(null); // reset
    } catch (err) {
      console.error("Error updating", err);
      alert("เกิดข้อผิดพลาดในการอัพเดต");
    }
  };

  // ✅ ลบข้อมูล
  const handleDelete = async (id) => {
    if (window.confirm("ยืนยันลบข้อมูลนี้?")) {
      await deleteListProb(id);
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex">
      <main className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-4">จัดการข้อมูล ListProbs</h1>
        <table className="table-auto w-full border ">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ลำดับ</th>
              <th className="p-2 border">ไอคอน</th>
              <th className="p-2 border">ชื่อเรื่อง</th>
              <th className="p-2 border">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item._id || idx}>
                <td className="p-2 border text-center">{item["1ToqF"]}</td>
                <td className="p-2 border text-center">
                  {item["Prob_pic"] ? (
                    <img
                      src={item["Prob_pic"]}
                      alt={item["Prob_name"]}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="p-2 border">{item["Prob_name"]}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 text-gray-600 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal Edit */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">แก้ไขข้อมูล</h2>
            <label className="block mb-2">ชื่อเรื่อง</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <label className="block mb-2">เปลี่ยนรูปภาพ</label>
            <ImageUploader onUploadComplete={setUploadedUrl} />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleUpdate()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListProbs;
