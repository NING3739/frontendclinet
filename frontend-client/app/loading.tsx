export default function Loading({ fullScreen = true }) {
  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "min-h-screen" : "min-h-[200px]"
      }`}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">加载中...</p>
      </div>
    </div>
  );
}
