"use client";

import { useEffect, useRef, MutableRefObject } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import ForceGraph2D, { ForceGraphMethods, NodeObject, LinkObject } from "react-force-graph-2d";

type GraphNode = { id: string; group: string };
type GraphLink = { source: string; target: string };

export default function KnowledgeGraphPage() {
  const fgRef = useRef<ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>> | undefined>(undefined) as MutableRefObject<ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>> | undefined>;

  // 🌐 Example Knowledge Graph Data (can be replaced by AI-generated or API data)
  const graphData = {
    nodes: [
      { id: "ISS", group: "Mission" },
      { id: "Arabidopsis", group: "Organism" },
      { id: "Zebrafish", group: "Organism" },
      { id: "E. coli", group: "Organism" },
      { id: "KUBIK Incubator", group: "Instrument" },
      { id: "Microgravity Study", group: "Experiment" },
      { id: "Space Shuttle", group: "Mission" },
    ],
    links: [
      { source: "ISS", target: "Arabidopsis" },
      { source: "ISS", target: "Zebrafish" },
      { source: "ISS", target: "E. coli" },
      { source: "KUBIK Incubator", target: "ISS" },
      { source: "Microgravity Study", target: "Arabidopsis" },
      { source: "Space Shuttle", target: "E. coli" },
      { source: "ISS", target: "Microgravity Study" },
    ],
  };

  // 🎨 Color palette by group
  const groupColors: Record<string, string> = {
    Mission: "#7C3AED",
    Organism: "#10B981",
    Instrument: "#3B82F6",
    Experiment: "#F59E0B",
  };

  // 🧠 Zoom to fit graph on load
  useEffect(() => {
    if (fgRef.current) {
      setTimeout(() => {
        fgRef.current?.zoomToFit(400, 50);
      }, 1000);
    }
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Knowledge Graph</h1>
      <p className="text-muted-foreground">
        Explore relationships between missions, organisms, instruments, and experiments in NASA’s bioscience data.
      </p>

      {/* 🌐 Interactive Knowledge Graph */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Entity Relationship Graph</CardTitle>
          <CardDescription>
            Interactive visualization showing connections among key bioscience entities.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[600px] bg-background rounded-md overflow-hidden">
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            nodeLabel={(node: NodeObject<GraphNode>) => `${node.id} (${(node as GraphNode).group ?? ""})`}
            nodeAutoColorBy="group"
            backgroundColor="#00091d"
            linkColor={() => "rgba(255,255,255,0.8)"}
            nodeCanvasObject={(node: NodeObject<GraphNode>, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Inter`;
              const color = groupColors[(node as GraphNode).group] || "#000";
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x ?? 0, node.y ?? 0, 8, 0, 2 * Math.PI, false);
              ctx.fill();
              ctx.fillStyle = "#ffff";
              ctx.textAlign = "center";
              ctx.textBaseline = "top";
              ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + 10);
            }}
          />
        </CardContent>
      </Card>

      {/* 🧩 Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(groupColors).map(([group, color]) => (
          <div key={group} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-sm text-muted-foreground">{group}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
