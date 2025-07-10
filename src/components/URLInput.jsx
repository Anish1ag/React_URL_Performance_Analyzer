import { useState } from "react";

const URLInput = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Please enter a URL");
      return;
    }

    // Add protocol if missing
    const normalizedUrl = /^https?:\/\//.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;

    // Validate the URL
    if (!validateUrl(normalizedUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    onAnalyze(normalizedUrl);
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div>
          <label
            htmlFor="url-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website URL
          </label>
          <input
            id="url-input"
            type="text"
            value={url}
            placeholder="Enter a website URL (e.g., example.com or https://example.com)"
            onChange={handleInputChange}
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
              error
                ? "border-red-300 focus:ring-red-300 focus:border-red-300"
                : "border-gray-300 focus:ring-blue-300 focus:border-blue-300"
            }`}
            disabled={loading}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            loading || !url.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          } text-white`}
        >
          {loading ? "Analyzing..." : "Analyze Performance"}
        </button>
      </form>

      <div className="mt-3 text-xs text-gray-500">
        <p>• Enter any public website URL</p>
        <p>• Analysis may take 10-30 seconds to complete</p>
        <p>• Results are powered by Google PageSpeed Insights</p>
      </div>
    </div>
  );
};

export default URLInput;
