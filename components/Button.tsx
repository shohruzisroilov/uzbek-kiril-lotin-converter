import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses: Record<string, string> = {
    primary:
      "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-sm hover:shadow-md disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500",
    secondary:
      "bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm",
    danger:
      "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-sm hover:shadow-md disabled:bg-gray-300 dark:disabled:bg-gray-700",
    success:
      "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-sm hover:shadow-md disabled:bg-gray-300 dark:disabled:bg-gray-700",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
  };

  const sizeClasses: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        button-base
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        disabled:cursor-not-allowed disabled:opacity-60
        ${className}
      `}
      {...props}
    >
      <span className="morph-content" data-morphing={loading || undefined}>
        {loading ? (
          <>
            <span
              className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              style={{ animation: "spin 650ms linear infinite" }}
            />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}
