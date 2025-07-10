import axios from 'axios';
import simulateMetrics from './alternativeFetch.js';

const API_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const fetchMetrics = async (url) => {
  try {
    console.log('Analyzing URL:', url);
    
    const response = await axios.get(API_ENDPOINT, {
      params: {
        url,
        strategy: 'desktop',
        category: ['PERFORMANCE'],
      },
      timeout: 30000, // 30 second timeout
    });

    const data = response.data;
    const lighthouseResult = data.lighthouseResult;

    // Get load time from First Contentful Paint (FCP) or Largest Contentful Paint (LCP)
    let loadTime = 0;
    if (lighthouseResult.audits['largest-contentful-paint']?.numericValue) {
      loadTime = (lighthouseResult.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2);
    } else if (lighthouseResult.audits['first-contentful-paint']?.numericValue) {
      loadTime = (lighthouseResult.audits['first-contentful-paint'].numericValue / 1000).toFixed(2);
    } else if (lighthouseResult.audits['interactive']?.numericValue) {
      loadTime = (lighthouseResult.audits['interactive'].numericValue / 1000).toFixed(2);
    } else {
      loadTime = 'N/A';
    }

    // Extract page size from resource summary
    let pageSize = 0;
    let requestCount = 0;

    if (lighthouseResult.audits['resource-summary']?.details?.items) {
      const resources = lighthouseResult.audits['resource-summary'].details.items;
      const totalBytes = resources.reduce((sum, item) => {
        return sum + (item.transferSize || 0);
      }, 0);
      pageSize = (totalBytes / 1024).toFixed(2); // Convert to KB
    }

    // Extract total number of requests
    if (lighthouseResult.audits['network-requests']?.details?.items) {
      requestCount = lighthouseResult.audits['network-requests'].details.items.length;
    } else {
      // Fallback: try to get request count from resource summary
      if (lighthouseResult.audits['resource-summary']?.details?.items) {
        requestCount = lighthouseResult.audits['resource-summary'].details.items.reduce((sum, item) => {
          return sum + (item.requestCount || 0);
        }, 0);
      }
    }

    // Additional metrics for better analysis
    const performanceScore = lighthouseResult.categories?.performance?.score
      ? Math.round(lighthouseResult.categories.performance.score * 100)
      : null;

    return {
      loadTime: loadTime === 'N/A' ? loadTime : `${loadTime}`,
      pageSize: pageSize > 0 ? `${pageSize}` : 'N/A',
      requestCount: requestCount || 'N/A',
      performanceScore,
      url: data.id, // The actual URL that was tested
      isSimulated: false
    };
  } catch (error) {
    console.error('Error fetching metrics from PageSpeed API:', error);
    
    // Check if we should use fallback simulation
    if (error.response?.status === 429 || error.response?.status === 403) {
      console.log('Using simulation due to API limits');
      const simulatedData = await simulateMetrics(url);
      return simulatedData;
    }
    
    // More specific error messages for real failures
    if (error.response?.status === 400) {
      throw new Error('Invalid URL provided. Please check the URL and try again.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. The website might be slow to respond.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else {
      // For network errors or other issues, try simulation as fallback
      console.log('Using simulation due to network error');
      try {
        const simulatedData = await simulateMetrics(url);
        return simulatedData;
      } catch {
        throw new Error('Unable to analyze the URL. Please check the URL and your internet connection.');
      }
    }
  }
};

export default fetchMetrics;
