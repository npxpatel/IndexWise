import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <div className="p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-200">
          No Results Yet
        </h2>
        <p className="text-gray-400">
          Start searching for coding questions to see results
        </p>
      </div>
    </Card>
  );
}