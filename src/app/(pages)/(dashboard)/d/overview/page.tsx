'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import CountUp from "react-countup";

export default function OverviewPage() {

    const overviewStats = [
    {
      title: "Total Publications",
      value: "12480",
      description: "All bioscience research documents analyzed",
    },
    {
      title: "Research Categories",
      value: "42",
      description: "Unique bioscience topics across NASA missions",
    },
    {
      title: "Time Span",
      value: "2024",
      suffix: "",
      description: "Range of experiments included in this dataset",
    },
    {
      title: "Missions Covered",
      value: "63",
      description: "Distinct NASA missions with bioscience data",
    },
  ];

  const categoryData = [
    { name: "Human Physiology", value: 4200 },
    { name: "Plant Growth", value: 2600 },
    { name: "Cell Biology", value: 1800 },
    { name: "Microgravity Research", value: 1200 },
    { name: "Radiation Effects", value: 680 },
  ];

  const missionData = [
    { name: "ISS", value: 5800 },
    { name: "Apollo", value: 2200 },
    { name: "Skylab", value: 1600 },
    { name: "Shuttle", value: 2100 },
    { name: "Artemis", value: 780 },
  ];

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const timeData = [
  { year: "2000", publications: 120 },
  { year: "2005", publications: 250 },
  { year: "2010", publications: 400 },
  { year: "2015", publications: 580 },
  { year: "2020", publications: 710 },
  { year: "2024", publications: 830 },
];


  return (
    <div>
      <h1 className="text-3xl font-bold my-4">Overview</h1>
      <p className="text-muted-foreground">
        Welcome to the NASA Bioscience Dashboard Overview. <br />
        Explore 608 NASA bioscience publications with AI-powered insights for space mission planning and research. <br />
        
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        {overviewStats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-background border border-muted-foreground/20 shadow-sm hover:shadow-md transition border-x-0 rounded-none"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">
                {stat.title}
              </CardTitle>
              <CardDescription className="text-xs">{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {stat.title === "Time Span" ? (
                <p className="text-3xl font-bold text-foreground">
                  1970 - {stat.value}
                </p>
              ) : (
                <p className="text-3xl font-bold text-foreground">
                  <CountUp
                    end={Number(stat.value)}
                    duration={2}
                    separator=","
                  />
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-10">
        {/* Publications by Category */}
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Publications by Category</CardTitle>
            <CardDescription>
              Distribution of research papers across key bioscience categories.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => {
                    return `${name ?? ""} ${(percent ? percent * 100 : 0).toFixed(0)}%`;
                  }}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Publications by Mission */}
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Publications by Mission</CardTitle>
            <CardDescription>
              Overview of research outputs from different NASA missions.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={missionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#82ca9d"
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ""} ${(percent ? percent * 100 : 0).toFixed(0)}%`
                  }
                >
                  {missionData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 mt-10">
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Publications Over Time</CardTitle>
            <CardDescription>
              Annual trend of bioscience research publications.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="publications"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}