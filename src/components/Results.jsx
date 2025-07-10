const Results = ({ data }) => {
  if (!data) return null;

  // const getPerformanceColor = (score) => {
  //   if (score >= 90) return "text-green-600";
  //   if (score >= 50) return "text-yellow-600";
  //   return "text-red-600";
  // };

  const formatValue = (value, unit) => {
    if (value === "N/A") return value;
    return `${value} ${unit}`;
  };

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Analysis Results
      </h2>

      {data.url && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Analyzed URL:</p>
          <p className="text-blue-700 font-medium break-all">{data.url}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Load Time
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatValue(data.loadTime, "seconds")}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Time to largest contentful paint
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Page Size
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {formatValue(data.pageSize, "KB")}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total transfer size</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            HTTP Requests
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {data.requestCount}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total network requests</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          {data.isSimulated
            ? "Results generated using simulation (Demo mode)"
            : "Results powered by Google PageSpeed Insights API"}
        </p>
      </div>
    </div>
  );
};

export default Results;
