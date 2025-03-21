import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
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

const RADIAN = Math.PI / 180;
const DEPTH = 20;

const PieChart3D = ({ data, title }: PieChart3DProps) => {
  // Criar efeito 3D com gradientes
  const gradients = data.map((entry, index) => ({
    id: `gradient-${index}`,
    color: entry.color,
  }));

  return (
    <div className="h-[350px] w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Definição dos gradientes para efeito 3D */}
          <defs>
            {gradients.map((gradient) => (
              <linearGradient
                key={gradient.id}
                id={gradient.id}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={gradient.color}
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor={gradient.color}
                  stopOpacity={0.6}
                />
              </linearGradient>
            ))}
          </defs>

          {/* Sombra do gráfico */}
          <Pie
            data={data}
            cx="50%"
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
                fill={`url(#gradient-${index})`}
                stroke={entry.color}
                strokeWidth={1}
              />
            ))}
          </Pie>

          {/* Gráfico principal */}
          <Pie
            data={data}
            cx="50%"
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
                fill={`url(#gradient-${index})`}
                stroke={entry.color}
                strokeWidth={1}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart3D; 