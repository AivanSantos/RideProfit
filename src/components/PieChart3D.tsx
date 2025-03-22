import { useEffect, useRef } from "react";
import { useCurrency } from "@/hooks/useCurrency";
import * as echarts from "echarts";
import type { CallbackDataParams, TooltipFormatterCallback } from "echarts/types/dist/shared";

interface DataItem {
  name: string;
  value: number;
}

interface PieChart3DProps {
  data: DataItem[];
  title?: string;
}

export default function PieChart3D({ data, title }: PieChart3DProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const { formatCurrency } = useCurrency();
  let chart: echarts.ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      chart = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        title: title ? {
          text: title,
          left: "center"
        } : undefined,
        tooltip: {
          trigger: "item",
          formatter: ((params) => {
            if (Array.isArray(params)) {
              return "";
            }
            const value = typeof params.value === "number" ? params.value : 0;
            return `${params.name}: ${formatCurrency(value)} (${params.percent}%)`;
          }) as TooltipFormatterCallback<CallbackDataParams>
        },
        series: [
          {
            name: title || "",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "50%"],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      chart.setOption(option);
    }

    const handleResize = () => {
      chart?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart?.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, title, formatCurrency]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
} 