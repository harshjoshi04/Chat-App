import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", disabled, children, ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `bg-[#111111] text-white px-7 py-3 rounded-xl outline-none border-2 border-MainColor border-opacity-50 disabled:opacity-65 `,
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <span className="opacity-60">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
