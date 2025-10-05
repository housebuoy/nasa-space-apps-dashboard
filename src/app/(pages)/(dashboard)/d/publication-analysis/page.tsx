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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PublicationAnalysisPage() {
  // 🧭 Summary data (combined)
  const publicationSummary = [
    { title: "Active Years", value: "1998 – 2024", description: "Range of research data" },
    { title: "Peak Year", value: "2020", description: "Highest publication activity" },
    { title: "Growth Rate", value: "+35%", description: "Increase in the last 5 years" },
    { title: "Total Topics", value: "42", description: "Unique bioscience themes" },
    { title: "Top Topic", value: "Microgravity Biology", description: "Most researched theme" },
  ];

  // 📈 Publications over time (Temporal)
  const yearlyPublications = [
    { year: 2000, total: 45 },
    { year: 2005, total: 90 },
    { year: 2010, total: 160 },
    { year: 2015, total: 210 },
    { year: 2020, total: 300 },
    { year: 2024, total: 420 },
  ];

  // 🌿 Category evolution (Temporal)
  const categoryOverTime = [
    { year: 2015, Microgravity: 40, Plants: 15, Cells: 10 },
    { year: 2017, Microgravity: 55, Plants: 25, Cells: 12 },
    { year: 2019, Microgravity: 70, Plants: 35, Cells: 18 },
    { year: 2021, Microgravity: 85, Plants: 45, Cells: 20 },
    { year: 2023, Microgravity: 95, Plants: 60, Cells: 28 },
  ];

  // 📊 Topic trends (Topic)
  const topicTrendData = [
    { year: "2015", Microgravity: 30, Plants: 10, Cells: 5 },
    { year: "2017", Microgravity: 40, Plants: 15, Cells: 8 },
    { year: "2019", Microgravity: 55, Plants: 20, Cells: 10 },
    { year: "2021", Microgravity: 60, Plants: 30, Cells: 15 },
    { year: "2023", Microgravity: 75, Plants: 45, Cells: 22 },
  ];

  // 📋 Topic breakdown table
  const topicTableData = [
    { topic: "Microgravity Biology", count: 75, missions: 12, timespan: "2000–2024" },
    { topic: "Plant Adaptation", count: 45, missions: 8, timespan: "2010–2024" },
    { topic: "Cellular Responses", count: 22, missions: 6, timespan: "2005–2023" },
  ];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5 mt-6">
        {publicationSummary.map((item, index) => (
          <Card
            key={index}
            className="bg-background border border-muted-foreground/20 shadow-sm hover:shadow-md transition"
          >
            <CardHeader>
              <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Publications Over Time */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Publications Over Time</CardTitle>
          <CardDescription>Annual number of bioscience research publications</CardDescription>
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

      {/* Category Trends */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Category Trends Over Time</CardTitle>
          <CardDescription>Evolution of top research categories across the years</CardDescription>
        </CardHeader>
        <CardContent className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={categoryOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Microgravity" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="Plants" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="Cells" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
