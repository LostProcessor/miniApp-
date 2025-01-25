import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Typography } from "@mui/material";

const PieChartComponent = ({ raised, target }) => {
  
  const progress = Math.min(raised/ target, 1); // Cap progress at 1 (100%)
  const remaining = 1 - progress;

  const data = [
    { name: "Raised", value: progress },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#4caf50", "#e0e0e0"]; // Green for raised, gray for remaining

  return (
    <Box sx={{ width: "100%", maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Money Raised Progress
      </Typography>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          startAngle={90}
          endAngle={-270} 
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${(value * 100).toFixed(1)}%`, name]} />
        <Legend formatter={(value) => (value === "Raised" ? `Raised: $${raised}` : `Target: $${target}`)} />
      </PieChart>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {raised >= target
          ? "Target Achieved!"
          : `Raised $${raised} out of $${target}`}
      </Typography>
    </Box>
  );
};

export default PieChartComponent;
