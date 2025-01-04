import { useState } from "react";
import axios from "axios";
import { SearchResults } from "@/components/SearchResults";
import { SearchBar } from "@/components//SearchBar";
import { Header } from "@/components/Header";
import { EmptyState } from "@/components/EmptyState";

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
      setResult(response.data);
      setShowResults(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowResults(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2" />
        </div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Header 
            title="Index - Wise"
            subtitle="Find the perfect coding questions to level up your skills"
          />

          <SearchBar 
            query={query}
            onQueryChange={handleQueryChange}
            onSubmit={handleSubmit}
          />

          <div className="mt-12">
            {showResults ? (
              <SearchResults results={result} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}