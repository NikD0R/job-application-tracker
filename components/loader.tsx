export default function Loader({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent ${className || ""}`}
      />
    </div>
  );
}
