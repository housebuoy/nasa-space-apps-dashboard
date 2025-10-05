"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Legend, Bar } from "recharts";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// 🎨 Color palette for charts
const COLORS = ["#7C3AED", "#10B981", "#F59E0B", "#3B82F6", "#EF4444"];

export default function EntityAnalysisPage() {
  // 🧠 Stats
  const stats = [
    {
      title: "Unique Entities",
      value: "1,243",
      description: "Missions, organisms, instruments & locations",
    },
    {
      title: "Top Mission",
      value: "ISS",
      description: "Most cited mission across publications",
    },
    {
      title: "Top Organism",
      value: "Arabidopsis thaliana",
      description: "Most studied plant in microgravity",
    },
    {
      title: "Top Instrument",
      value: "KUBIK Incubator",
      description: "Frequently used in space biology experiments",
    },
  ];

  // 📊 Entity Type Distribution
  const entityTypeData = [
    { name: "Missions", value: 35 },
    { name: "Organisms", value: 25 },
    { name: "Instruments", value: 20 },
    { name: "Facilities", value: 15 },
    { name: "Institutions", value: 5 },
  ];

  // 📈 Top Entities by Mentions
  const topEntitiesData = [
    { name: "ISS", mentions: 450 },
    { name: "E. coli", mentions: 230 },
    { name: "Zebrafish", mentions: 180 },
    { name: "Arabidopsis", mentions: 160 },
    { name: "Space Shuttle", mentions: 130 },
  ];

  // 🔍 Entity Search
  const [searchTerm, setSearchTerm] = useState("");
  const allEntities = [
    { name: "ISS", type: "Mission", publications: 450 },
    { name: "E. coli", type: "Organism", publications: 230 },
    { name: "Zebrafish", type: "Organism", publications: 180 },
    { name: "KUBIK Incubator", type: "Instrument", publications: 120 },
  ];

  const filteredEntities = allEntities.filter(entity =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Entity Analysis</h1>
      <p className="text-muted-foreground">
        Explore key entities—missions, organisms, instruments, and more—from NASA bioscience publications.
      </p>

      {/* 🔹 Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <Card key={idx} className="bg-background border border-muted-foreground/20 shadow-sm hover:shadow-md transition border-x-0 rounded-none">
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

      {/* 🔹 Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Entity Type Distribution */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Entity Type Distribution</CardTitle>
            <CardDescription>Proportion of different entity categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={entityTypeData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {entityTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Entities by Mentions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Top Entities by Mentions</CardTitle>
            <CardDescription>Most frequently referenced entities in publications</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topEntitiesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mentions" fill="#7C3AED" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Entity Search */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Search Entities</CardTitle>
          <CardDescription>Filter entities by name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Search for an entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border rounded-md">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Publications</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntities.length > 0 ? (
                  filteredEntities.map((entity, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{entity.name}</td>
                      <td className="p-2">{entity.type}</td>
                      <td className="p-2">{entity.publications}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4 text-muted-foreground">
                      No entities found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
