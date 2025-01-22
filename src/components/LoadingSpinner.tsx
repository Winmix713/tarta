interface LoadingSpinnerProps {
  isVisible: boolean;
}

export function LoadingSpinner({ isVisible }: LoadingSpinnerProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="alert"
      aria-label="Loading predictions"
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#CCFF00]" />
    </div>
  );
}