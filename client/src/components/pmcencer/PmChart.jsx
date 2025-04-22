import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/19MHYCUTLM8bKGVDALFfrDzK6_Vu52drfZD_-n_bF394/export?format=csv&gid=1506988263";

const Pm25ChartLast7Days = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const raw = results.data
          .filter((row) => row.pm25_avg && row.date_pm_sensor)
          .map((row) => {
            // แปลงวันที่จาก "30/1/2025" เป็น Date object
            const [day, month, year] = row.date_pm_sensor.split("/");
            return {
              date: new Date(`${year}-${month}-${day}`), // YYYY-MM-DD
              label: row.date_pm_sensor,
              pm25: parseFloat(row.pm25_avg),
            };
          });

        // เรียงวันที่ล่าสุด → เก่าสุด
        const sorted = raw.sort((a, b) => b.date - a.date);

        // ดึง 7 แถวล่าสุดแล้ว reverse กลับเพื่อแสดงจากเก่า → ใหม่
        const latest7 = sorted.slice(0, 7).reverse();

        setData(latest7);
      },
    });
  }, []);

  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-center mb-2">
        PM2.5 เฉลี่ยย้อนหลัง 7 วันล่าสุด
      </h3>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">ไม่มีข้อมูล</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="pm25"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Pm25ChartLast7Days;
