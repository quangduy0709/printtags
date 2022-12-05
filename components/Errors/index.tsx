import React from "react";
import { XCircleIcon } from "@heroicons/react/solid";
interface IPros {
  error: string[];
}
const Errors: React.FC<IPros> = (props) => {
  const error = props;

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc pl-5 space-y-1">
              {error.error.map((item: string, index: number) => (
                <li key={index}>{item} </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Errors;
