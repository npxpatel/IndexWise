import { Card } from '@/components/ui/card'
import { ResultItem } from './ResultItem'

interface SearchResultsProps {
  results: any[] 
}

export function SearchResults({ results }: SearchResultsProps) {
  console.log('Results received:', results)
  console.log(typeof(results))

  if (!Array.isArray(results)) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Search Results</h2>
          <p className="text-gray-300">No results to display.</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Search Results</h2>
        <div className="space-y-4 ">
          {results.map((result, index) => (
            <ResultItem key={index} result={result} />
          ))}
        </div>
      </div>
    </Card>
  )
}


