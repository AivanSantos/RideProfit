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
  // Criar array de cores para o Recharts
  const COLORS = data.map(entry => entry.color);

  return (
    <div className="h-[400px] w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Sombra do gráfico */}
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
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
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={1}
                style={{ filter: "brightness(0.8)" }}
              />
            ))}
          </Pie>

          {/* Gráfico principal */}
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            blendStroke
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>

          {/* Legenda fixa */}
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              paddingLeft: "20px",
              fontSize: "14px",
              color: "#666"
            }}
            formatter={(value: string) => (
              <span className="text-sm">{value}</span>
            )}
            payload={data.map((entry, index) => ({
              value: entry.name,
              type: "circle",
              color: COLORS[index % COLORS.length],
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
              padding: "8px"
            }}
            labelStyle={{
              color: "#666",
              fontWeight: "bold"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart3D; 