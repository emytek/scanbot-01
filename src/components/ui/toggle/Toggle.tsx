import { useState } from "react";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Toggle({ checked = false, onChange }: ToggleProps) {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
        isOn ? "bg-brand-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
          isOn ? "translate-x-5" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
}
