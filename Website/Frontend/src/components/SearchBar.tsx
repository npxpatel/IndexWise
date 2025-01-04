import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchBar({ query, onQueryChange, onSubmit }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative flex">
          <Input
            type="text"
            placeholder="Search for coding questions..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-grow bg-gray-800/80 backdrop-blur-sm text-gray-100 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-r-none"
          />
          <Button
            type="submit"
            className="rounded-l-none bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}