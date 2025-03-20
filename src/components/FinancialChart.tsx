
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart3 } from "lucide-react";
import * as d3 from "d3";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface FinancialChartProps {
  title: string;
  data: ChartData[];
  type: "pie" | "bar";
}

const FinancialChart = ({ title, data, type }: FinancialChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    const width = chartRef.current.clientWidth;
    const height = 300;

    if (type === "pie") {
      drawPieChart(width, height);
    } else {
      drawBarChart(width, height);
    }
  }, [data, type]);

  const drawPieChart = (width: number, height: number) => {
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal().domain(data.map(d => d.name)).range(data.map(d => d.color));

    const pie = d3.pie<ChartData>().value(d => d.value);
    const path = d3.arc<d3.PieArcDatum<ChartData>>().outerRadius(radius * 0.8).innerRadius(radius * 0.4);
    const label = d3.arc<d3.PieArcDatum<ChartData>>().outerRadius(radius * 0.9).innerRadius(radius * 0.9);

    const arc = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Add slices with transition
    arc
      .append("path")
      .attr("d", path)
      .attr("fill", d => color(d.data.name) as string)
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);

    // Add labels with transition
    arc
      .append("text")
      .attr("transform", d => `translate(${label.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(d => (d.data.value > 5 ? `${d.data.name}: ${d.data.value}%` : ""))
      .style("font-size", "12px")
      .style("opacity", 0)
      .transition()
      .delay(500)
      .duration(500)
      .style("opacity", 1);

    // Add legend
    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${radius * 1.2}, ${-radius + i * 20})`);

    legend
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", d => d.color);

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 6)
      .attr("dy", ".35em")
      .text(d => `${d.name} (${d.value}%)`)
      .style("font-size", "10px");
  };

  const drawBarChart = (width: number, height: number) => {
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([innerHeight, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Add x axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em");

    // Add y axis
    g.append("g").call(d3.axisLeft(y).ticks(5));

    // Add bars with transition
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name) as number)
      .attr("y", innerHeight)
      .attr("width", x.bandwidth())
      .attr("fill", d => d.color)
      .attr("height", 0)
      .transition()
      .duration(1000)
      .attr("y", d => y(d.value))
      .attr("height", d => innerHeight - y(d.value));

    // Add value labels
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => (x(d.name) as number) + x.bandwidth() / 2)
      .attr("y", d => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .text(d => d.value)
      .style("font-size", "12px")
      .style("opacity", 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1);
  };

  return (
    <Card className="shadow-sm hover-lift transition-all duration-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          {type === "pie" ? (
            <PieChart className="h-5 w-5 mr-2 text-primary" />
          ) : (
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full" ref={chartRef}></div>
      </CardContent>
    </Card>
  );
};

export default FinancialChart;
