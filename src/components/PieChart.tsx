import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Label } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { name: "Used", value: 275, fill: "var(--primary)" },
  { name: "Remaining", value: 200, fill: "var(--chart-6)" },
];

const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
const used = chartData.find((d) => d.name === "Used")?.value ?? 0;
const usedPercent = Math.round((used / total) * 100);

export function ChartPieDonutText() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Storage Usage</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
          <PieChart width={250} height={250}>
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} strokeWidth={0}>
              <Label
                position="center"
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox as { cx: number; cy: number };

                  return (
                    <>
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-2xl font-bold"
                      >
                        {usedPercent}%
                      </text>
                      <text
                        x={cx}
                        y={cy + 20}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-muted-foreground text-xs"
                      >
                        Full
                      </text>
                    </>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
}
