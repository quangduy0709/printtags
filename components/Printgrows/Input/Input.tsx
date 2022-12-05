import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

interface InputProps {
  /**
   * Set label for input
   */
  label?: string;
  /**
   * Set name for input
   */
  name?: string;
  /**
   * Set placeholder for input
   */
  placeHolder?: string;
  /**
   * Set type for input
   */
  type: string;
  /**
   * Set help text for input
   */
  helpText?: string;
  /**
   * Set prefix icon for input
   */
  prefix?: React.ReactNode;
  /**
   * Set suffix icon for input
   */
  suffix?: React.ReactNode;
  /**
   * Set onchange handler for input
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Set onclick handler for input
   */
  onClick?: () => void;
  /**
   * Set onBlur handler for input
   */
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Set value for input
   */
  value?: string | number;
  /**
   * The class name of the container of the input
   */
  className?: string;
  /**
   * The class name of the container of the input
   */
  error?: ReactNode;
  /**
   * Disable state of input
   */
  disabled?: boolean;
  /**
   * Max length of input
   */
  maxLength?: number;
  /**
   * Set onEnter handler for input
   */
  onEnter?: () => void;
  required?: boolean;
}

const Input = ({
  type = "text",
  label,
  name,
  placeHolder,
  helpText,
  prefix,
  suffix,
  onChange,
  onClick,
  value = "",
  className,
  error,
  onBlur,
  disabled,
  maxLength,
  onEnter,
  required = false,
}: InputProps) => {
  const [inputValue, setInputValue] = useState<string | number>("");
  const classNameInput = useMemo(() => {
    const common = error
      ? "block w-full border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 rounded-md shadow-sm"
      : "focus:ring-slate-400 focus:border-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md";
    return [
      "printgrows-input",
      common,
      prefix && "pl-10",
      suffix && "pr-10",
      disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
    ]
      .filter(Boolean)
      .join(" ");
  }, [prefix, suffix, error, disabled]);

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    onChange && onChange(e as ChangeEvent<HTMLInputElement>);
  };

  const onBlurInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onBlur && onBlur(e as ChangeEvent<HTMLInputElement>);
  };

  const onKeyDownInput = (
    e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    switch (e.key) {
      case "Enter":
        onEnter && onEnter();
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={`pg-form-control ${className || ""}`}>
      {/** Label rendering */}
      {label && (
        <label
          htmlFor={label}
          className="text-sm font-medium text-gray-700 flex gap-2"
        >
          {label} {required ? <p className="text-red-500">*</p> : null}
        </label>
      )}
      <div className="relative rounded-md shadow-sm mt-1">
        {/** Prefix icon rendering */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="printgrows-button-icon w-5 h-5 text-gray-400 text-sm">
              {prefix}
            </span>
          </div>
        )}
        {type === "textarea" ? (
          <textarea
            name={name || label}
            className={classNameInput}
            placeholder={placeHolder}
            onChange={onChangeInput}
            onClick={onClick}
            onBlur={onBlurInput}
            value={inputValue}
            disabled={disabled}
            maxLength={maxLength}
            onKeyDown={onKeyDownInput}
          />
        ) : (
          <input
            type={type}
            name={name || label}
            className={classNameInput}
            placeholder={placeHolder}
            onChange={onChangeInput}
            onClick={onClick}
            onBlur={onBlurInput}
            value={inputValue}
            disabled={disabled}
            maxLength={maxLength}
            onKeyDown={onKeyDownInput}
          />
        )}
        {/** Suffix icon rendering */}
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="printgrows-button-icon w-5 h-5 text-gray-400 text-sm">
              {suffix}
            </span>
          </div>
        )}
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
      {/** Help text rendering */}
      {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

export default Input;
