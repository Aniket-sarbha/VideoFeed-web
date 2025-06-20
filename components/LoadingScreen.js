export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">Loading videos...</p>
        <div className="flex space-x-1 mt-3 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
