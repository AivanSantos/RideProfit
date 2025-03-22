import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChart3DProps {
  data: PieChartData[];
  title: string;
}

const PieChart3D = ({ data, title }: PieChart3DProps) => {
  return (
    <div className="h-[300px] sm:h-[400px] w-full">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Sombra do gráfico */}
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={5}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            blendStroke
            isAnimationActive={true}
            filter="url(#shadow)"
          >
            <filter id="shadow" height="200%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="4"
                floodColor="#000"
                floodOpacity="0.2"
              />
            </filter>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
                strokeWidth={1}
                style={{ opacity: 0.8 }}
              />
            ))}
          </Pie>

          {/* Gráfico principal */}
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={5}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            blendStroke
            isAnimationActive={true}
            fill="#FF5733"
            stroke="#FF5733"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
                strokeWidth={1}
                style={{ opacity: 1 }}
              />
            ))}
          </Pie>

          {/* Legenda fixa */}
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              paddingLeft: "10px",
              fontSize: "12px",
              color: "#666"
            }}
            formatter={(value: string) => (
              <span className="text-xs sm:text-sm">{value}</span>
            )}
            payload={data.map((entry, index) => ({
              value: entry.name,
              type: "circle",
              color: entry.color,
              id: `legend-${index}`
            }))}
          />

          <Tooltip
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              name,
            ]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              fontSize: "12px"
            }}
            labelStyle={{
              color: "#666",
              fontWeight: "bold",
              fontSize: "12px"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart3D; 