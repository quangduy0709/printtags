import { RadioGroup } from "@headlessui/react";
import { classNames } from "../../../utils";

export interface RadioProps {
  value: string;
  title: string;
  className?: string;
  textClassName?: string;
}

const Radio = ({
  value,
  title,
  className,
  textClassName,
}: RadioProps): JSX.Element => {
  return (
    <RadioGroup.Option value={value}>
      {({ active, checked }) => (
        <div className="flex items-center text-sm cursor-pointer">
          <span
            className={classNames(
              checked
                ? "bg-primaryColor border-transparent"
                : "bg-white border-gray-300",
              active ? "ring-2 ring-offset-2 ring-green-500" : "",
              "h-4 w-4 rounded-full border flex items-center justify-center",
              className ? `${className}` : ""
            )}
            aria-hidden="true"
          >
            <span className="rounded-full bg-white w-1.5 h-1.5" />
          </span>
          <RadioGroup.Label
            as="span"
            className={`ml-3 font-medium text-gray-900 ${
              textClassName ? textClassName : ""
            }`}
          >
            {title}
          </RadioGroup.Label>
        </div>
      )}
    </RadioGroup.Option>
  );
};

Radio.Group = RadioGroup;

export default Radio;
