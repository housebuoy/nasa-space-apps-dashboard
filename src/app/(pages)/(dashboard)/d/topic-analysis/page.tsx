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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TopicAnalysisPage() {
  const topicSummary = [
    { title: "Total Topics", value: "42", description: "Unique bioscience themes" },
    { title: "Top Topic", value: "Microgravity Biology", description: "Most researched theme" },
    { title: "Emerging Topic", value: "Plant Adaptation", description: "Rising interest since 2020" },
  ];

  const topicTrendData = [
    { year: "2015", Microgravity: 30, Plants: 10, Cells: 5 },
    { year: "2017", Microgravity: 40, Plants: 15, Cells: 8 },
    { year: "2019", Microgravity: 55, Plants: 20, Cells: 10 },
    { year: "2021", Microgravity: 60, Plants: 30, Cells: 15 },
    { year: "2023", Microgravity: 75, Plants: 45, Cells: 22 },
  ];

  const topicTableData = [
    { topic: "Microgravity Biology", count: 75, missions: 12, timespan: "2000–2024" },
    { topic: "Plant Adaptation", count: 45, missions: 8, timespan: "2010–2024" },
    { topic: "Cellular Responses", count: 22, missions: 6, timespan: "2005–2023" },
  ];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {topicSummary.map((item, index) => (
          <Card key={index} className="bg-background border border-muted-foreground/20 shadow-sm hover:shadow-md transition border-x-0 rounded-none">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Topic Trends */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Topic Trends Over Time</CardTitle>
          <CardDescription>Frequency of top topics across years</CardDescription>
        </CardHeader>
        <CardContent className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={topicTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Microgravity" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="Plants" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="Cells" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Topic Table */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Topic Details</CardTitle>
          <CardDescription>Breakdown of research topics with counts and missions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead>Publications</TableHead>
                <TableHead>Missions</TableHead>
                <TableHead>Time Span</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topicTableData.map((topic, index) => (
                <TableRow key={index}>
                  <TableCell>{topic.topic}</TableCell>
                  <TableCell>{topic.count}</TableCell>
                  <TableCell>{topic.missions}</TableCell>
                  <TableCell>{topic.timespan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
