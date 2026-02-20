export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-slate-700 font-medium">
          Analyzing genomic data…
        </p>
      </div>
    </div>
  );
}
