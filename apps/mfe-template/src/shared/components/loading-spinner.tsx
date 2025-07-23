type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large";
  message?: string;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  message = "Loading...",
}) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`} />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};
