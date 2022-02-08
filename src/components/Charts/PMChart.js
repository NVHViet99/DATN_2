import {
  Line,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  AreaChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";

function PMChart() {
  const [idReg, setIdReg] = useState();

  // logic split PM, time, name and ID
  let result = [];
  if (idReg) {
    const key = Object.keys(idReg);
    key.forEach((value) => {
      result.push({
        PM: +idReg[value].split(" ")[0],
        time:
          idReg[value].split(" ")[1] +
          String("__") +
          idReg[value].split(" ")[2],
      });
    });
  }

  //get datetime sign in from firebase
  useEffect(() => {
    const idRef = firebase.database().ref("sensor/matchingPM");

    idRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const newId = [];
      for (let id in items) {
        newId.push(items[id]);
      }
      setIdReg(newId);
    });
  }, []);

  let sizeTemp = Object.keys(result).length;
  let rsTemp = [];
  for (let i = sizeTemp - 5; i < sizeTemp; i++) {
    rsTemp.push(result[i]);
  }

  console.log(rsTemp);

  return (
    <div className="card mb-5rem">
      <h2 className="text-center">Chart of PM2.5</h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart data={rsTemp}>
          <defs>
            <linearGradient id="colorPM" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8946A6" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#8946A6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="PM"
            type="monotone"
            stroke="#8946A6"
            fill="url(#colorPM)"
          />
          <XAxis
            // tick={false}
            interval="preserveStartEnd"
            dataKey="time"
            axisLine={true}
            tick={{ fill: "#252525", fontSize: 14, fontWeight: 400 }}
          />
          <YAxis
            interval="preserveStartEnd"
            // tick={false}
            tick={{ fill: "#252525", fontSize: 14, fontWeight: 400 }}
            unit="ug/m3"
            axisLine={true}
            // tickCount={8}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#8946A6",
              color: "#fff",
              fontSize: "13px",
            }}
            itemStyle={{ color: "#fff", fontSize: "13px" }}
            cursor={false}
          />
          <CartesianGrid opacity={0.1} />
          <Line
            type="monotone"
            dataKey="PM"
            stroke="#6867AC"
            strokeWidth="2"
            dot={{ fill: "#ECDBBA", stroke: "#8946A6", strokeWidth: 2, r: 5 }}
            activeDot={{
              fill: "#ECDBBA",
              stroke: "#6867AC",
              strokeWidth: 3,
              r: 7,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PMChart;
