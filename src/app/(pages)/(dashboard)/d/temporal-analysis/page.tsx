"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function TemporalAnalysisPage() {
  const temporalSummary = [
    { title: "Active Years", value: "1998 – 2024", description: "Range of research data" },
    { title: "Peak Year", value: "2020", description: "Highest publication activity" },
    { title: "Growth Rate", value: "+35%", description: "Increase in the last 5 years" },
  ];

  const yearlyPublications = [
    { year: 2000, total: 45 },
    { year: 2005, total: 90 },
    { year: 2010, total: 160 },
    { year: 2015, total: 210 },
    { year: 2020, total: 300 },
    { year: 2024, total: 420 },
  ];

  const categoryOverTime = [
    { year: 2015, Microgravity: 40, Plants: 15, Cells: 10 },
    { year: 2017, Microgravity: 55, Plants: 25, Cells: 12 },
    { year: 2019, Microgravity: 70, Plants: 35, Cells: 18 },
    { year: 2021, Microgravity: 85, Plants: 45, Cells: 20 },
    { year: 2023, Microgravity: 95, Plants: 60, Cells: 28 },
  ];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {temporalSummary.map((item, index) => (
          <Card key={index} className="bg-background border border-muted-foreground/20 shadow-sm hover:shadow-md transition border-x-0 rounded-none">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Publications Over Time */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Publications Over Time</CardTitle>
          <CardDescription>
            Annual number of bioscience research publications.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yearlyPublications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Trends Over Time */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Category Trends Over Time</CardTitle>
          <CardDescription>
            Evolution of top research categories across the years.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={categoryOverTime} stackOffset="expand">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
              <Tooltip formatter={(v: number) => `${v.toFixed(0)} publications`} />
              <Legend />
              <Area
                type="monotone"
                dataKey="Microgravity"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="Plants"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="Cells"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
