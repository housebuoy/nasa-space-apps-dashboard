"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

export default function SearchPublicationsPage() {
  // 🔎 Sample Data (You’ll replace this with fetched NASA data or AI summaries)
  const publications = [
    {
      id: 1,
      title: "Microgravity Effects on Arabidopsis Root Growth",
      category: "Plant Biology",
      mission: "ISS",
      year: 2022,
    },
    {
      id: 2,
      title: "Zebrafish Muscle Adaptation in Spaceflight",
      category: "Animal Physiology",
      mission: "ISS",
      year: 2021,
    },
    {
      id: 3,
      title: "E. coli Gene Expression in Microgravity",
      category: "Microbiology",
      mission: "Space Shuttle",
      year: 2019,
    },
    {
      id: 4,
      title: "Plant Hormonal Regulation in Low Gravity",
      category: "Plant Biology",
      mission: "ISS",
      year: 2020,
    },
  ];

  // 🧭 States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMission, setSelectedMission] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // 🧠 Filtering Logic
  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || pub.category === selectedCategory;
    const matchesMission =
      selectedMission === "all" || pub.mission === selectedMission;
    const matchesYear = selectedYear === "all" || pub.year === Number(selectedYear);

    return matchesSearch && matchesCategory && matchesMission && matchesYear;
  });

  const categories = ["Plant Biology", "Animal Physiology", "Microbiology"];
  const missions = ["ISS", "Space Shuttle"];
  const years = ["2022", "2021", "2020", "2019"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Search Publications</h1>
      <p className="text-muted-foreground">
        Explore NASA bioscience publications with intelligent search and filters.
      </p>

      {/* 🔹 Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Total Publications</CardTitle>
            <CardDescription>All available NASA bioscience studies</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{publications.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Filtered Results</CardTitle>
            <CardDescription>Matching your search and filters</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{filteredPublications.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Filters */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
          <CardDescription>
            Refine publications by keywords, category, mission, and year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* 🔍 Search */}
            <Input
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* 🧬 Category Filter */}
            <Select onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 🚀 Mission Filter */}
            <Select onValueChange={setSelectedMission}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Mission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Missions</SelectItem>
                {missions.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 📅 Year Filter */}
            <Select onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 📜 Publications Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Publications</CardTitle>
          <CardDescription>List of publications matching your filters.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border rounded-md">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Mission</th>
                  <th className="text-left p-2">Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub) => (
                    <tr key={pub.id} className="border-t hover:bg-muted/50 transition">
                      <td className="p-2 font-medium">{pub.title}</td>
                      <td className="p-2">
                        <Badge variant="secondary">{pub.category}</Badge>
                      </td>
                      <td className="p-2">{pub.mission}</td>
                      <td className="p-2">{pub.year}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center p-4 text-muted-foreground"
                    >
                      No publications found.
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
