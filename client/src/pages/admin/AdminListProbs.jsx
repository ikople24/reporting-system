import { useEffect, useState } from "react";
import { fetchListProbs, deleteListProb } from "@/api/listprobs";
import { fetchListUseProbs } from "@/api/listuseprobs";
import ImageUploader from "@/components/ImageUploader";
import AdminTable from "@/components/admin/AdminTable";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AdminListProbs = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState("listprobs");
  const [newName, setNewName] = useState(""); // ชื่อใหม่
  const [newFile, setNewFile] = useState(null); // ไฟล์ใหม่
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [newOrder, setNewOrder] = useState(""); // เพิ่ม state สำหรับ DP_Order
  const [listProbsData, setListProbsData] = useState([]);
  const [listUseProbsData, setListUseProbsData] = useState([]);

  const columns = [
    { label: "ลำดับ", className: "w-24 text-center" },
    { label: "ไอคอน", className: "w-32 text-center" },
    { label: "ชื่อเรื่อง" },
    { label: "จัดการ", className: "text-center" },
  ];

  const imageKey = activeTab === "listprobs" ? "Prob_pic" : "pick_icon";
  const nameKey = activeTab === "listprobs" ? "Prob_name" : "Prob_menu";
  const orderKey = activeTab === "listprobs" ? "DP_Order" : undefined; // index +1 ถ้าไม่มี

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
      if (activeTab === "listprobs") {
        let payload = {
          Prob_name: newName,
          DP_Order: parseInt(newOrder, 10) || 0,
        };
        if (uploadedUrl) payload.Prob_pic = uploadedUrl;

        if (editingItem._id) {
          await axios.put(`/api/listprobs/${editingItem._id}`, payload);
          alert("อัพเดต ListProbs เรียบร้อย");
        } else {
          const maxOrder =
            listProbsData.length > 0
              ? Math.max(...listProbsData.map((d) => d.DP_Order || 0))
              : 0;
          payload.DP_Order = maxOrder + 1;
          await axios.post(`/api/listprobs`, payload);
          alert("เพิ่ม ListProbs เรียบร้อย");
        }
        loadData(); // โหลดใหม่
      } else if (activeTab === "listuseprobs") {
        let payload = {
          Prob_menu: newName,
          Prob_pickup: "-",
          pick_icon: uploadedUrl || "-", // ถ้าไม่เลือกภาพให้ default
        };
        if (editingItem._id) {
          await axios.put(`/api/listuseprobs/${editingItem._id}`, payload);
          alert("อัพเดต ListUseProbs เรียบร้อย");
        } else {
          await axios.post(`/api/listuseprobs`, payload);
          alert("เพิ่ม ListUseProbs เรียบร้อย");
        }
        loadData(); // โหลดใหม่
      }

      setEditingItem(null);
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
    if (activeTab === "listprobs") {
      fetchListProbs().then((res) => {
        const sorted = res.data.sort((a, b) => a.DP_Order - b.DP_Order);
        setListProbsData(sorted);
      });
    } else if (activeTab === "listuseprobs") {
      fetchListUseProbs().then((res) => {
        setListUseProbsData(res.data);
      });
    }
  }, [activeTab]);

  return (<div className="flex ">
    <main className="p-4 flex-1">
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">จัดการข้อมูล</h1>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("listprobs")}
            className={`px-4 py-2 rounded ${
              activeTab === "listprobs" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            ListProbs
          </button>
          <button
            onClick={() => setActiveTab("listuseprobs")}
            className={`px-4 py-2 rounded ${
              activeTab === "listuseprobs" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            ListUseProbs
          </button>
        </div>

        <button
          onClick={() => {
            setEditingItem({});
            setNewName("");
            setNewOrder("");
            setUploadedUrl(null);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          เพิ่มข้อมูล
        </button>
      </div>

      {/* ✅ ใช้ AdminTable */}
      <AdminTable
        data={activeTab === "listprobs" ? listProbsData : listUseProbsData}
        columns={columns}
        imageKey={imageKey}
        nameKey={nameKey}
        orderKey={orderKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* modal เดิมเหมือนเดิม */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded shadow-md w-96">
            <Label className="text-xl font-bold mb-4">
              {editingItem._id ? "แก้ไขข้อมูล" : "เพิ่มข้อมูลใหม่"}
            </Label>
            <label className="block mb-2">
              {activeTab === "listprobs" ? "ชื่อเรื่องปัญหา" : "ชื่อเรื่องการเลือกปัญหา"}
            </label>
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />

            {activeTab === "listprobs" && (
              <>
                <label className="block mb-2">ลำดับ DP_Order</label>
                <Input
                  type="number"
                  value={newOrder}
                  onChange={(e) => setNewOrder(Number(e.target.value))}
                  className="w-full border rounded p-2 mb-4"
                />
              </>
            )}

            <label className="block mb-2">
              {editingItem._id ? "เปลี่ยนรูปภาพ" : "อัพโหลดภาพ"}
            </label>
            {uploadedUrl && (
              <img src={uploadedUrl} alt="uploaded" className="w-40 h-40 rounded mt-2" />
            )}
            <ImageUploader onUploadComplete={setUploadedUrl} />

            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditingItem(null)} className="hover:bg-orange-400 px-4 py-2 rounded">
                ยกเลิก
              </Button>
              <Button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-400 hover:text-gray-800"
              >
                บันทึก
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  </div>
);
    
};

export default AdminListProbs;
