import { useEffect, useState } from "react";
import axios from "axios";

const MigrateListProbs = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  // โหลดข้อมูลจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/listprobs");

        // ✅ ตรวจว่าข้อมูลเป็น array จริง
        if (Array.isArray(res.data)) {
          // ✅ กรองแถวที่ไม่มี Prob_name ออก
          const clean = res.data.filter((item) => item.Prob_name);
          setData(clean);
        } else {
          console.error("Expected array, got:", res.data);
        }
      } catch (error) {
        console.error("Error fetching listprobs", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (item) => {
    setSelected((prev) =>
      prev.some((i) => i.$rowID === item.$rowID)
        ? prev.filter((i) => i.$rowID !== item.$rowID)
        : [...prev, item]
    );
  };

  const handleSave = async () => {
    if (selected.length === 0) {
      alert("กรุณาเลือกข้อมูลก่อนบันทึก");
      return;
    }
    try {
      setIsSaving(true); // เริ่มโหลด
      await axios.post("/api/migrate", selected);
      alert("บันทึกข้อมูลเข้า MongoDB เรียบร้อยแล้ว!");
      setSelected([]);
    } catch (error) {
      console.error("Error saving to MongoDB", error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsSaving(false); // หยุดโหลด
    }
  };
  console.log(selected)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        รายการเมนูหลัก Smart-Apps (listprobs)
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">เลือก</th>
              <th className="p-2 border">ไอค่อน</th>
              <th className="p-2 border">ลำดับ</th>
              <th className="p-2 border">ชื่อปุ่มกด</th>
              <th className="p-2 border">สถิติการกด</th>
              <th className="p-2 border">Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selected.some((i) => i.$rowID === item.$rowID)}
                    onChange={() => handleSelect(item)}
                  />
                </td>
                <td className="p-2 border text-center">
                  <img
                    src={item["Prob_pic"]}
                    alt="icon"
                    className="h-10 w-10 object-contain mx-auto"
                  />
                </td>
                <td className="p-2 border text-center">{item["1ToqF"]}</td>
                <td className="p-2 border">{item["Prob_name"]}</td>
                <td className="p-2 border text-center">
                  {item["KBFBi"] ?? "-"}
                </td>
                <td className="p-2 border">{item["Location_Tb"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={selected.length === 0 || isSaving}
          className={`bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition disabled:bg-gray-300 flex items-center gap-2`}
        >
          {isSaving && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {isSaving ? "กำลังบันทึก..." : "บันทึกเข้า MongoDB"}
        </button>
      </div>
    </div>
  );
};

export default MigrateListProbs;
