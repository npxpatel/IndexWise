import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchResults } from "../components/SearchResults";
import { DifficultyLegend } from "../components/DifficultyLegend";
import { Card } from "@/components/ui/card";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/search", {
        search: query,
      });

      // console.log(response.data)
      setResult(response.data);
      setShowResults(true);

      console.log("Searching for:", query);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Index - Wise
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search for coding questions..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(false);
              }}
              className="flex-grow bg-gray-800 text-gray-100 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              type="submit"
              className="ml-2 bg-blue-500 hover:bg-blue-600"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </form>

        <DifficultyLegend />

        {showResults ? (
          <SearchResults results={result} />
        ) : (
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">
                Search Results
              </h2>
              <p className="text-gray-300">No results to display.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
