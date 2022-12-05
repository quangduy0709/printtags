import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment, ReactNode, Children, cloneElement, isValidElement } from 'react';

interface PopoverProps {
  children?: ReactNode;
  title: string;
  className?: string;
  height?: number | string;
  width?: number | string;
}

const PopoverComponent = ({ children, title, className, height, width }: PopoverProps) => {
  return (
    <Popover className={`relative ${className}`}>
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`printgrows-popover-button inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
          >
            <span>{title}</span>
            <ChevronDownIcon
              className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="pringrows-popover-panel absolute z-10 px-4 mt-3 transform left-0 sm:px-0 overflow-auto rounded-lg shadow-lg"
              style={{ height: height, width: width }}
            >
              <div className="relative grid gap-8 bg-white p-7">
                {Children.map(children, (child) => {
                  if (isValidElement(child)) {
                    return cloneElement(child, { open, close });
                  }
                  return child;
                })}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopoverComponent;
