import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProp>(
  ({ className, type = "text", disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `bg-transparent border-[2px] px-4 py-2 rounded-2xl  outline-none placeholder:text-MainColor placeholder:text-xs text-sm  border-MainColor border-opacity-50 disabled:opacity-65`,
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
