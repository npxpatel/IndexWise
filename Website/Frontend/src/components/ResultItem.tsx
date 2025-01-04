import { ExternalLink } from "lucide-react";

interface ResultItemProps {
  result: string;
}

export function ResultItem({ result }: ResultItemProps) {

  const link = result.split("*")[0];
  const title = result.split("*")[1];
  const queryIdx = link.indexOf("?");
  console.log("QueryIdx: ", queryIdx);

  return (
    <div className="border-b border-gray-700 pb-8 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-400 hover:underline">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            {queryIdx >= 0
              ? link.substring(0, queryIdx)
              : link.substring(0, 100)}
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </h3>
      </div>
      <div className="flex items-center mt-2 text-sm text-gray-400">
        {title.length > 100
          ? title.substring(0, title.lastIndexOf(" ", 100)) + "..."
          : title}
      </div>
    </div>
  );
}
