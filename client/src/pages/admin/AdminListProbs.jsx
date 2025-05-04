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
  const [newOrder, setNewOrder] = useState(""); // เพิ่ม state สำหรับ DP_Order

  // ✅ โหลดข้อมูล
  const loadData = async () => {
    const res = await fetchListProbs();
    const sortedData = res.data.sort((a, b) => a.DP_Order - b.DP_Order);
    setData(sortedData);
    console.log(sortedData);
  };

  // ✅ เปิด modal edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setNewName(item["Prob_name"]);
    setNewOrder(item["DP_Order"] || ""); // เพิ่มตรงนี้
    setNewFile(null);
    console.log(item);
  };

  // ✅ บันทึกข้อมูลแก้ไข
  const handleUpdate = async () => {
    try {
      console.log("👉 newOrder = ", newOrder); // ✅ เช็ค newOrder ตอนพิมพ์

      let payload = {
        Prob_name: newName,
        DP_Order: parseInt(newOrder, 10) || 0, // ✅ เพิ่มตรงนี้
      };

      if (uploadedUrl) {
        payload.Prob_pic = uploadedUrl;
      }

      if (editingItem._id) {
        // ✅ กรณีแก้ไข
        await axios.put(`/api/listprobs/${editingItem._id}`, payload);
        alert("อัพเดตข้อมูลเรียบร้อย");
      } else {
        // ✅ กรณีเพิ่มใหม่
        // 👉🏻 หา max DP_Order + 1
        const maxOrder =
          data.length > 0 ? Math.max(...data.map((d) => d.DP_Order || 0)) : 0;
        payload.DP_Order = maxOrder + 1;

        await axios.post(`/api/listprobs`, payload);
        alert("เพิ่มข้อมูลเรียบร้อย");
      }

      setEditingItem(null);
      loadData();
      setUploadedUrl(null);
    } catch (err) {
      console.error("Error saving", err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">จัดการข้อมูล ListProbs</h1>
          <button
            onClick={() => {
              setEditingItem({});
              setNewName("");
              setNewOrder(""); // ✅ เพิ่มตรงนี้
              setUploadedUrl(null);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            เพิ่มข้อมูล
          </button>
        </div>

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
                <td className="p-2 border text-center">{item["DP_Order"]}</td>
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
            <h2 className="text-xl font-bold mb-4">
              {editingItem._id ? "แก้ไขข้อมูล" : "เพิ่มข้อมูลใหม่"}
            </h2>
            <label className="block mb-2">ชื่อเรื่อง</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <label className="block mb-2">ลำดับ DP_Order</label>
            <input
              type="number"
              value={newOrder}
              onChange={(e) => setNewOrder(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
            />
            <label className="block mb-2">
              {editingItem._id ? "เปลี่ยนรูปภาพ" : "อัพโหลดภาพ"}
            </label>
            {uploadedUrl && (
              <img
                src={uploadedUrl}
                alt="uploaded"
                className="w-40 h-40 rounded mt-2"
              />
            )}
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
