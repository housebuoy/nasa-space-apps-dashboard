"use client";

export const dynamic = "force-dynamic"; // keep this; enables client-only render for this route during build

import { useEffect, useRef, MutableRefObject } from "react";
import nextDynamic from "next/dynamic"; // <-- alias to avoid name clash
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type {
  ForceGraphMethods,
  NodeObject,
  LinkObject,
} from "react-force-graph-2d";

// Dynamically import the graph only on the client
const ForceGraph2D = nextDynamic(
  () => import("react-force-graph-2d").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full place-items-center text-sm text-muted-foreground">
        Loading graph…
      </div>
    ),
  }
);

type GraphNode = { id: string; group: string };
type GraphLink = { source: string; target: string };

type FGMethods = ForceGraphMethods<
  NodeObject<GraphNode>,
  LinkObject<GraphNode, GraphLink>
>;

export default function KnowledgeGraphPage() {
  const fgRef =
    useRef<FGMethods | undefined>(undefined) as MutableRefObject<
      FGMethods | undefined
    >;

  // Example data
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

  const groupColors: Record<string, string> = {
    Mission: "#7C3AED",
    Organism: "#10B981",
    Instrument: "#3B82F6",
    Experiment: "#F59E0B",
  };

  useEffect(() => {
    const t = setTimeout(() => fgRef.current?.zoomToFit(400, 50), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Knowledge Graph</h1>
      <p className="text-muted-foreground">
        Explore relationships between missions, organisms, instruments, and
        experiments in NASA’s bioscience data.
      </p>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Entity Relationship Graph</CardTitle>
          <CardDescription>
            Interactive visualization showing connections among key bioscience
            entities.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[600px] bg-background rounded-md overflow-hidden">
          {/* <ForceGraph2D
            // dynamic()’s TS types don’t include ref; cast to keep types clean without any
            ref={fgRef as unknown as React.LegacyRef<FGMethods>}
            graphData={graphData}
            nodeLabel={(node: NodeObject<GraphNode>) =>
              `${String(node.id)} (${
                (node as unknown as GraphNode).group ?? ""
              })`
            }
            nodeAutoColorBy="group"
            backgroundColor="#00091d"
            linkColor={() => "rgba(255,255,255,0.8)"}
            nodeCanvasObject={(
              node: NodeObject<GraphNode>,
              ctx: CanvasRenderingContext2D,
              globalScale: number
            ) => {
              const label = String(node.id);
              const fontSize = 12 / globalScale;

              const color =
                groupColors[(node as unknown as GraphNode).group] || "#000";

              // node
              ctx.font = `${fontSize}px Inter`;
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x ?? 0, node.y ?? 0, 8, 0, 2 * Math.PI, false);
              ctx.fill();

              // label
              ctx.fillStyle = "#fff";
              ctx.textAlign = "center";
              ctx.textBaseline = "top";
              ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + 10);
            }}
          /> */}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        {Object.entries(groupColors).map(([group, color]) => (
          <div key={group} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-muted-foreground">{group}</span>
          </div>
        ))}
      </div>
    </div>
  );
}