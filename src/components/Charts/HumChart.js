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
import classes from "./TempChart.module.scss";
import firebase from "../../utilities/firebase";

function HumChart() {
  const [hum, setHum] = useState();

  // logic split hum, time, name and ID
  let humResult = [];
  if (hum) {
    const key = Object.keys(hum);
    key.forEach((value) => {
      humResult.push({
        hum: hum[value].split(" ")[0],
        time:
          hum[value].split(" ")[1] + String("__") + hum[value].split(" ")[2],
      });
    });
  }

  //get hum sign in from firebase
  useEffect(() => {
    const idRef = firebase.database().ref("sensor/matchingHum");

    idRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const newId = [];
      for (let id in items) {
        newId.push(items[id]);
      }
      setHum(newId);
    });
  }, []);

  let sizeHum = Object.keys(humResult).length;
  let rsHum = [];
  for (let i = sizeHum - 5; i < sizeHum; i++) {
    rsHum.push(humResult[i]);
  }

  return (
    <div className="card mb-5rem">
      {/* -------------------------- */}
      <h2 className="text-center">Chart of humidity</h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart width={300} height={400} data={rsHum}>
          <defs>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3DB2FF" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#3DB2FF" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="hum"
            type="monotone"
            stroke="#3DB2FF"
            fill="url(#color2)"
          />
          <XAxis
            // tick={false}
            interval="preserveStartEnd"
            dataKey="time"
            axisLine={true}
            tick={{
              fill: "#252525",
              fontSize: 14,
              fontWeight: 400,
            }}
          />
          <YAxis
            interval="preserveStartEnd"
            // tick={false}
            tick={{
              fill: "#252525",
              fontSize: 14,
              fontWeight: 400,
            }}
            unit="%"
            axisLine={true}
            tickCount={4}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#D9ECF2",
              color: "#333",
              fontSize: "13px",
            }}
            itemStyle={{ color: "#333", fontSize: "13px" }}
            cursor={false}
          />
          <CartesianGrid opacity={0.1} />
          <Line
            type="monotone"
            dataKey="hum"
            stroke="#3DB2FF"
            strokeWidth="2"
            dot={{ fill: "#ECDBBA", stroke: "#D9ECF2", strokeWidth: 2, r: 5 }}
            activeDot={{
              fill: "#ECDBBA",
              stroke: "#3DB2FF",
              strokeWidth: 3,
              r: 7,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HumChart;
