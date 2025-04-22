import { useEffect, useState } from "react";
import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/19MHYCUTLM8bKGVDALFfrDzK6_Vu52drfZD_-n_bF394/export?format=csv";

  const getPm25LevelInfo = (value) => {
    const pm = parseFloat(value);
    if (pm <= 25) return { color: "bg-green-500", emoji: "🟢 อากาศดีมาก" };
    if (pm <= 50) return { color: "bg-yellow-400", emoji: "🌤️ ปานกลาง" };
    if (pm <= 100) return { color: "bg-orange-400", emoji: "😷 เริ่มกระทบสุขภาพ" };
    if (pm <= 150) return { color: "bg-red-500", emoji: "🛑 อันตราย" };
    return { color: "bg-purple-700", emoji: "☠️ อันตรายมาก!" };
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
  
    const getLatestEntry = (data) => {
      const reversed = [...data].reverse();
      return reversed.find((row) => row?.pm25 && row?.Time);
    };
  
    const latest = getLatestEntry(data);
    if (!latest) return <p className="text-center mt-6">ไม่พบข้อมูลล่าสุด</p>;
  
    const { color, emoji } = getPm25LevelInfo(latest.pm25);
    const date = latest.date_select || new Date().toLocaleDateString("th-TH");

    
  
    return (
      <div className={`p-6 max-w-md mx-auto rounded-xl shadow-md space-y-2 text-center text-black ${color}`}>
        <h2 className="text-xl font-bold">ค่าฝุ่นล่าสุด</h2>
        <p className="text-5xl font-semibold">{latest.pm25} µg/m³</p>
        <p className="text-md font-medium">{emoji}</p>
        <p className="opacity-80">เวลา {latest.Time} วันที่ {date}</p>
  
        <div className="flex flex-wrap justify-center gap-4 text-sm mt-4 font-semibold">
          <span>🌫️ PM1: {latest.pm1}</span>
          <span>🌪️ PM10: {latest.pm10}</span>
          <span>🌡️ อุณหภูมิ: {latest.Temp}°C</span>
          <span>💧 ความชื้น: {latest.Humidity}%</span>
        </div>
      </div>
  );
};

export default Pm25Dashboard;
