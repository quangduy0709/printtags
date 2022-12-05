import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../../../utils";

interface SwitchProps {
  /**
   * Checked state of switch
   */
  checked?: boolean;
  /**
   * On change event handler
   */
  onChange?: (checked: boolean) => void;
}

const Toggle = ({ checked, onChange }: SwitchProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (checked !== undefined) {
      setEnabled(checked);
    }
  }, [checked]);

  const onChangeSwitch = (checked: boolean) => {
    setEnabled(checked);
    onChange && onChange(checked);
  };

  return (
    <Switch
      checked={enabled}
      onChange={onChangeSwitch}
      className={classNames(
        "pg-input-switch",
        enabled ? "pg-input-switch-enabled bg-green-600" : "bg-gray-200",
        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        )}
      />
    </Switch>
  );
};

export default Toggle;
