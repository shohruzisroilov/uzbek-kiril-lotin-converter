import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  characterCount?: number;
  wordCount?: number;
  maxCharacters?: number;
  error?: string;
  badge?: string;
}

export function TextArea({
  label,
  characterCount,
  wordCount,
  maxCharacters,
  error,
  badge,
  className = "",
  ...props
}: TextAreaProps) {
  const isOverLimit = maxCharacters !== undefined && characterCount !== undefined && characterCount > maxCharacters;

  return (
    <div className="flex flex-col gap-1.5 h-full">
      {(label || badge) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {label}
            </label>
          )}
          {badge && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
              {badge}
            </span>
          )}
        </div>
      )}
      <textarea
        className={`
          input-base
          resize-none
          min-h-[260px]
          text-base leading-relaxed
          ${error || isOverLimit ? "border-red-400 dark:border-red-500 focus:ring-red-400" : ""}
          ${props.readOnly ? "bg-gray-50 dark:bg-gray-900/50 cursor-default" : ""}
          ${className}
        `}
        {...props}
      />
      <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 px-1">
        <span className="flex gap-3">
          {characterCount !== undefined && (
            <span className={isOverLimit ? "text-red-500 font-medium" : ""}>
              {characterCount.toLocaleString()} belgi
            </span>
          )}
          {wordCount !== undefined && wordCount > 0 && (
            <span>{wordCount.toLocaleString()} so'z</span>
          )}
        </span>
        {maxCharacters && characterCount !== undefined && (
          <span className={isOverLimit ? "text-red-500 font-medium" : ""}>
            {characterCount}/{maxCharacters}
          </span>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500 dark:text-red-400 px-1">{error}</span>
      )}
    </div>
  );
}
