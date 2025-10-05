'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function AIInsights() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setLoading(true);
    // Example fetch call to your backend or AI API (e.g., OpenAI, Together AI)
    const response = await fetch("/api/ai/insights", {
      method: "POST",
      body: JSON.stringify({ topic: "bioscience publications" }),
    });
    const data = await response.json();
    setInsight(data.insight);
    setLoading(false);
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition mt-10">
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
        <CardDescription>
          Automatically generated summaries, correlations, and suggestions from analyzed bioscience publications.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Click below to generate AI-powered insights from the latest NASA bioscience research data.
          </p>
          <Button
            onClick={handleGenerateInsights}
            disabled={loading}
            variant="default"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" /> Generating...
              </>
            ) : (
              "Generate Insights"
            )}
          </Button>
        </div>

        {insight ? (
          <div className="p-4 bg-muted rounded-lg text-sm leading-relaxed">
            {insight}
          </div>
        ) : (
          <div className="p-4 border rounded-lg text-muted-foreground text-sm text-center">
            No insights yet. Click “Generate Insights” to begin.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
