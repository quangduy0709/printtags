import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
interface IProps {
  content: string;
}
const index: React.FC<IProps> = (props) => {
  const { content } = props;
  return (
    <div className="rounded-md bg-green-50 p-4 fixed bottom-12 right-10 border shadow-md border-gray-400">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Completed</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>{content}</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              >
                View status
              </button>
              <button
                type="button"
                className="ml-3 bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
