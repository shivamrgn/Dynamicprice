export default function DashboardLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-800 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-zinc-500 font-medium animate-pulse">Loading dashboard modules...</p>
    </div>
  );
}
