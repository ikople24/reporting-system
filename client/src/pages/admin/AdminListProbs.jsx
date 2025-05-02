import { useEffect, useState } from "react";
import { fetchListProbs, deleteListProb } from "@/api/listprobs";


const AdminListProbs = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const loadData = async () => {
    const res = await fetchListProbs();
    setData(res.data);
  };

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
            {data.map((item) => (
              <tr key={item._id}>
                <td className="p-2 border text-center">{item["1ToqF"]}</td>
                <td className="p-2 border text-center">
                  {item["Prob_pic"] ? (
                    <img
                      src={item["Prob_pic"]}
                      alt={item["Prob_name"]}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <span>-</span>  // fallback ถ้าไม่มีรูป
                  )}
                </td>
                <td className="p-2 border">{item["Prob_name"]}</td>
                <td className="p-2 border text-center">
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
    </div>
  );
};

export default AdminListProbs;
