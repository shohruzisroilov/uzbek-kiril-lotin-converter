import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className = "", ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={`
          input-base
          resize-none
          min-h-[200px] sm:min-h-[280px] lg:min-h-[360px]
          text-base leading-relaxed
          ${props.readOnly ? "cursor-default" : ""}
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
