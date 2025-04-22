// src/components/Pm25Dashboard.jsx
import { useEffect, useState } from "react";
import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/19MHYCUTLM8bKGVDALFfrDzK6_Vu52drfZD_-n_bF394/export?format=csv";

const getPm25LevelColor = (value) => {
  const num = parseFloat(value);
  if (num <= 25) return "bg-green-500";
  if (num <= 50) return "bg-yellow-400";
  if (num <= 100) return "bg-orange-400";
  if (num <= 150) return "bg-red-500";
  return "bg-purple-700";
};

const Pm25Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((item, index) => {
        const pm = item["ค่า PM2.5"];
        const province = item["จังหวัด"];
        const time = item["เวลาเก็บข้อมูล"];
        const levelColor = getPm25LevelColor(pm);

        return (
          <div
            key={index}
            className={`rounded-xl shadow-md text-white p-4 ${levelColor}`}
          >
            <h2 className="text-xl font-semibold">{province}</h2>
            <p className="text-4xl font-bold">{pm} µg/m³</p>
            <p className="text-sm opacity-80 mt-1">เวลา: {time}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Pm25Dashboard;
