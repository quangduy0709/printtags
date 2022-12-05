import { CalendarIcon } from "@heroicons/react/solid";
import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../Input/Input";

interface DatePickerProps {
  /**
   * Set name for input
   */
  name?: string;

  /**
   * On change date handler
   */
  onChange: (date: Date | null) => void;
  /**
   * Selected date
   */
  selected: Date | null;
  /**
   * The class name of the container of the datepicker
   */
  className?: string;
  /**
   * Placeholder of the datepicker
   */
  placeholder?: string;
}

const DatePicker = ({
  name,
  onChange,
  selected,
  className,
  placeholder = "Choose a date",
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    setSelectedDate(selected);
  }, [selected]);

  const onChangeDate = (date: Date | null) => {
    setSelectedDate(date);
    onChange && onChange(date);
  };

  return (
    <ReactDatePicker
      onChange={onChangeDate}
      selected={selectedDate}
      className={className}
      customInput={
        <Input
          name={name || ""}
          className={`pg-input-datepicker`}
          placeHolder={placeholder}
          type="text"
          value={selected?.toString()}
          suffix={<CalendarIcon />}
        />
      }
    />
  );
};

export default DatePicker;
