const Loader = () => (
  <div className="text-center mt-8 p-6">
    <div className="flex justify-center mb-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">
      Analyzing Performance
    </h3>
    <p className="text-gray-500 mb-4">
      Running comprehensive analysis using Google PageSpeed Insights...
    </p>
    <div className="flex justify-center space-x-2">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      <div
        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
    <p className="text-xs text-gray-400 mt-4">
      This may take 10-30 seconds depending on the website complexity
    </p>
  </div>
);

export default Loader;
