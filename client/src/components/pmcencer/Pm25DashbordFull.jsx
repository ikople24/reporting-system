// Full PM2.5 Dashboard (วงกลม + Hourly + Daily Chart)
import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const HOURLY_CSV_URL = "https://docs.google.com/spreadsheets/d/19MHYCUTLM8bKGVDALFfrDzK6_Vu52drfZD_-n_bF394/export?format=csv&gid=0";
const DAILY_CSV_URL = "https://docs.google.com/spreadsheets/d/19MHYCUTLM8bKGVDALFfrDzK6_Vu52drfZD_-n_bF394/export?format=csv&gid=1506988263";

const getPmColor = (value) => {
  const pm = parseFloat(value);
  if (pm <= 12) return "#00BCD4";     // ฟ้า
  if (pm <= 25) return "#4CAF50";     // เขียว
  if (pm <= 37) return "#FFEB3B";     // เหลือง
  if (pm <= 50) return "#FF9800";     // ส้ม
  return "#F44336";                   // แดง
};

const Pm25DashboardFull = () => {
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [latestValue, setLatestValue] = useState(null);

  useEffect(() => {
    // Load Hourly
    Papa.parse(HOURLY_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data
          .filter((row) => row.pm25 && row.Time && row.date_select)
          .map((row) => ({
            time: row.Time,
            date: row.date_select,
            pm25: parseFloat(row.pm25),
          }));
        setHourlyData(data);
        setLatestValue(data[data.length - 1]);
      },
    });

    // Load Daily
    Papa.parse(DAILY_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data
          .filter((row) => row.pm25_avg && row.date_pm_sensor)
          .map((row) => ({
            date: row.date_pm_sensor,
            pm25: parseFloat(row.pm25_avg),
          }))
          .sort((a, b) => {
            const [da, ma, ya] = a.date.split("/");
            const [db, mb, yb] = b.date.split("/");
            return new Date(`${yb}-${mb}-${db}`) - new Date(`${ya}-${ma}-${da}`);
          });

        const last7 = data.slice(-7);
        setDailyData(last7);
      },
    });
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Current PM2.5 Indicator */}
      {latestValue && (
        <div className="flex items-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center flex-col shadow-md"
            style={{ backgroundColor: getPmColor(latestValue.pm25) }}
          >
            <span className="text-3xl font-bold text-white">{latestValue.pm25}</span>
            <span className="text-sm text-white">µg/m³</span>
          </div>
          <div className="ml-6">
            <p className="text-xl font-semibold text-orange-500">
              คุณภาพอากาศมีผลกระทบต่อสุขภาพ
            </p>
            <p className="text-sm text-gray-600">
              {latestValue.date} - {latestValue.time} น.
            </p>
          </div>
        </div>
      )}

      {/* Hourly Chart */}
      {/* <div>
        <h3 className="text-lg font-semibold mb-2">PM2.5 (Hourly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pm25">
              {hourlyData.map((entry, index) => (
                <Cell key={index} fill={getPmColor(entry.pm25)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div> */}

      {/* Daily Chart */}
      {/* <div>
        <h3 className="text-lg font-semibold mb-2">PM2.5 (Daily)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pm25">
              {dailyData.map((entry, index) => (
                <Cell key={index} fill={getPmColor(entry.pm25)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default Pm25DashboardFull;