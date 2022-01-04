import {
  LineChart,
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

function Chart() {
  const [idReg, setIdReg] = useState();
  const [hum, setHum] = useState();

  // logic split temp, time, name and ID
  let result = [];
  if (idReg) {
    const key = Object.keys(idReg);
    key.forEach((value) => {
      result.push({
        temp: idReg[value].split(" ")[0],
        time: idReg[value].split(" ")[1],
      });
    });
  }

  // logic split hum, time, name and ID
  let humResult = [];
  if (hum) {
    const key = Object.keys(hum);
    key.forEach((value) => {
      humResult.push({
        hum: hum[value].split(" ")[0],
        time: hum[value].split(" ")[1],
      });
    });
  }

  //get datetime sign in from firebase
  useEffect(() => {
    const idRef = firebase.database().ref("sensor/matching");

    idRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const newId = [];
      for (let id in items) {
        newId.push(items[id]);
      }
      setIdReg(newId);
    });
  }, []);

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

  let size = Object.keys(result).length;
  let rs = [];
  for (let i = size - 5; i < size; i++) {
    rs.push(result[i]);
  }
  console.log(rs);
  return (
    <div>
      <h2 className="text-center">Chart of temperature and humidity</h2>
      <ResponsiveContainer width="95%" aspect={3}>
        <AreaChart
          width={500}
          height={400}
          data={rs}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F05454" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#F05454" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="temp"
            stroke="#F05454"
            fill="url(#color)"
            axisLine={false}
            tickLine={false}
          />
          <XAxis dataKey="time" tick={{ fill: "#333" }} />
          <YAxis
            tick={{ fill: "#333" }}
            unit="°C"
            axisLine={true}
            tickLine={false}
            tickCount={8}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#F05454", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            cursor={false}
          />
          <CartesianGrid opacity={0.1} />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#A13333"
            strokeWidth="2"
            dot={{ fill: "#ECDBBA", stroke: "#F05454", strokeWidth: 2, r: 5 }}
            activeDot={{
              fill: "#ECDBBA",
              stroke: "#A13333",
              strokeWidth: 3,
              r: 7,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* -------------------------- */}
      <ResponsiveContainer width="95%" aspect={3} className="mt-5">
        <AreaChart
          width={500}
          height={400}
          data={humResult}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3DB2FF" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#3DB2FF" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="hum"
            stroke="#3DB2FF"
            fill="url(#color2)"
            axisLine={false}
            tickLine={false}
          />
          <XAxis dataKey="time" tick={{ fill: "#333" }} />
          <YAxis tick={{ fill: "#333" }} unit="%" allowDataOverflow={true} />
          <Tooltip
            contentStyle={{ backgroundColor: "#D9ECF2", color: "#333" }}
            itemStyle={{ color: "#333" }}
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
      {/* -------------------------- */}
    </div>
  );
}

export default Chart;
