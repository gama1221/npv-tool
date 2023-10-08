import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";
const SimplePieChartComponent = ({data}) => {
    return (
        <div>
            <PieChart width={1000} height={400}>
                <Pie
                    dataKey="result"
                    nameKey="type"
                    numOctaves="type"
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#00FF00"
                    label
                />
                <Tooltip />
            </PieChart>
        </div>
    );
}
export default SimplePieChartComponent