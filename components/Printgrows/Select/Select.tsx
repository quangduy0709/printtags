import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { classNames } from "../../../utils";

interface OptionProps {
  value: string | number;
  label: string | ReactNode;
  disabled?: boolean;
  children?: OptionProps[];
}

interface SelectProps {
  /**
   * Set label for select
   */
  label?: string;
  /**
   * Set name for select
   */
  name?: string;
  /**
   * Set options for select
   */
  options: OptionProps[];
  /**
   * Set selected for select
   */
  value: string | number;
  /**
   * Set onchange icon for select
   */
  onChange: (value: string) => void;
  /**
   * The class name of the container of the Select
   */
  className?: string;
  /**
   * Disabled state of select
   */
  disabled?: boolean;

  error?: string;

  require?: boolean;
}

const Select = ({
  options,
  value,
  onChange,
  label,
  name,
  className,
  disabled,
  error,
  require = false,
}: SelectProps) => {
  const [selected, setSelected] = useState<string | number | null>(null);

  const selectedOption = useMemo(() => {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.children) {
        const result = option.children.find((item) => item.value === selected);
        if (result) {
          return result;
        }
      } else if (option.value === selected) {
        return option;
      }
    }
  }, [selected, options]);

  const onChangeHandler = (value: string) => {
    setSelected(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    value && setSelected(value);
  }, [value]);

  const common = error
    ? "text-red-900 placeholder-red-300 outline-none ring-red-500 border-red-500 rounded-md"
    : "focus:ring-cyan-500 focus:border-cyan-500";

  return (
    <Listbox value={selected} onChange={onChangeHandler} disabled={disabled}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="flex gap-2 text-sm font-medium text-gray-700">
              {label} {require ? <p className="text-red-500">*</p> : null}
            </Listbox.Label>
          )}
          <div className={`pg-select-wrapper mt-1 relative ${className || ""}`}>
            <Listbox.Button
              className={`pg-select-btn ${
                disabled
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white cursor-default"
              } h-full relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left  focus:outline-none focus:ring-1 sm:text-sm ${common}`}
            >
              <span className="block truncate">
                {selectedOption ? selectedOption.label : "Select an item"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="pg-select-container absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option, index) =>
                  option.children ? (
                    <Fragment key={option.value}>
                      <div className="cursor-default select-none relative py-2 pl-3 pr-9 text-xs text-gray-400">
                        {option.label}
                      </div>
                      {option.children.map((item) => (
                        <Option
                          key={item.value}
                          option={item}
                          isChildren={true}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <Option option={option} key={index} />
                  )
                )}
              </Listbox.Options>
            </Transition>
          </div>
          {error && (
            <p className="error-description mt-2 text-sm text-red-600 flex gap-1 items-center">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
              <span>{error}</span>
            </p>
          )}
        </>
      )}
    </Listbox>
  );
};

const Option = ({
  option,
  isChildren,
}: {
  option: OptionProps;
  isChildren?: boolean;
}) => {
  return (
    <Listbox.Option
      disabled={option.disabled}
      className={({ active, selected }) =>
        classNames(
          "pg-select-item",
          selected ? "pg-select-item-selected" : "",
          active ? "text-white bg-cyan-500" : "text-gray-900",
          `select-none relative py-2 ${isChildren ? "pl-6" : "pl-3"} pr-9`,
          option.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        )
      }
      value={option.value}
    >
      {({ selected, active }) => (
        <>
          <span
            className={classNames(
              selected ? "font-semibold" : "font-normal",
              "block truncate"
            )}
          >
            {option.label}
          </span>

          {selected ? (
            <span
              className={classNames(
                active ? "text-white" : "text-cyan-700",
                "absolute inset-y-0 right-0 flex items-center pr-4"
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

export default Select;
