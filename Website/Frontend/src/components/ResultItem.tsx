import { ExternalLink } from "lucide-react";

interface ResultItemProps {
  result: string;
}

export function ResultItem({ result }: ResultItemProps) {
  const link = result.split("*")[0];
  const title = result.split("*")[1];
  const queryIdx = link.indexOf("?");

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:shadow-blue-500/20">
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <div className="flex items-center justify-center p-4">
          <img
            src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
            alt="LeetCode"
            className="w-20 h-20 object-contain"
          />
        </div>

        <div className="p-4">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">
                {title.length > 100
                  ? title.substring(0, 100).charAt(0).toUpperCase() +
                    title.substring(1, 100)
                  : title.charAt(0).toUpperCase() + title.substring(1)}
              </h3>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <span className="truncate max-w-[300px]">
                  {queryIdx >= 0 ? link.substring(0, queryIdx) : link}
                </span>
                <ExternalLink className="h-4 w-4 ml-1 flex-shrink-0" />
              </a>
            </div>

            <div className="mt-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                LeetCode Problem
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
