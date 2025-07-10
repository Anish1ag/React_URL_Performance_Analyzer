// Alternative method for fetching metrics when PageSpeed API is not available
// This is a simulation for demonstration purposes

const simulateMetrics = async (url) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  // Parse domain for simulation
  const domain = new URL(url).hostname;
  const isPopularSite = ['google.com', 'facebook.com', 'amazon.com', 'youtube.com'].some(site => 
    domain.includes(site)
  );
  
  // Simulate realistic metrics based on domain characteristics
  const baseLoadTime = isPopularSite ? 1.2 : 2.5;
  const loadTimeVariation = (Math.random() - 0.5) * 2; // ±1 second variation
  const loadTime = Math.max(0.5, baseLoadTime + loadTimeVariation).toFixed(2);
  
  const basePageSize = isPopularSite ? 1200 : 800;
  const pageSizeVariation = Math.random() * 800; // 0-800 KB variation
  const pageSize = (basePageSize + pageSizeVariation).toFixed(2);
  
  const baseRequestCount = isPopularSite ? 45 : 25;
  const requestVariation = Math.floor(Math.random() * 30); // 0-30 variation
  const requestCount = baseRequestCount + requestVariation;
  
  const performanceScore = isPopularSite 
    ? Math.floor(85 + Math.random() * 15) // 85-100
    : Math.floor(60 + Math.random() * 30); // 60-90
  
  return {
    loadTime: loadTime.toString(),
    pageSize: pageSize.toString(),
    requestCount: requestCount.toString(),
    performanceScore,
    url: url,
    isSimulated: true
  };
};

export default simulateMetrics;
