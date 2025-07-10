// src/App.jsx
import { useState } from "react";
import URLInput from "./components/URLInput";
import Results from "./components/Results";
import Loader from "./components/Loader";
import fetchMetrics from "./utils/fetchMetrics";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url) => {
    setLoading(true);
    setMetrics(null);
    setError(null);

    try {
      const data = await fetchMetrics(url);
      setMetrics(data);
    } catch (error) {
      console.error("Analysis error:", error);
      setError(error.message || "Failed to analyze URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setMetrics(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            URL Performance Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Analyze website performance metrics including load time, page size,
            and HTTP requests
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <URLInput onAnalyze={handleAnalyze} loading={loading} />
        </div>

        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-2">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold text-red-800">
                Analysis Failed
              </h3>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {metrics && <Results data={metrics} />}

        {!loading && !error && !metrics && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Ready to Analyze
            </h3>
            <p className="text-gray-500">
              Enter a website URL above to get started with performance analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
