# React URL Performance Analyzer

A comprehensive React web application that analyzes the performance of any given URL using Google PageSpeed Insights API. The tool measures and displays key performance metrics including load time, page size, number of HTTP requests, and overall performance score.

## 🚀 Features

- **Load Time Analysis** - Measures total page load duration using Largest Contentful Paint (LCP)
- **Page Size Calculation** - Aggregates size of HTML, CSS, JS, images in KB/MB
- **HTTP Request Count** - Tracks total number of HTTP requests made
- **Performance Score** - Lighthouse performance score (0-100)
- **Responsive Design** - Clean, modern UI that works on all devices
- **Real-time Analysis** - Live performance metrics from Google PageSpeed Insights
- **Fallback Simulation** - Alternative metrics when API limits are reached
- **Error Handling** - Comprehensive error handling with user-friendly messages

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0 with Functional Components and Hooks
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 3.4.17
- **HTTP Client**: Axios 1.10.0
- **API**: Google PageSpeed Insights API v5
- **Linting**: ESLint 9.30.1

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn**
- **Git** (for cloning the repository)

## 🏗️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Anish1ag/React_URL_Performance_Analyzer.git
cd React_URL_Performance_Analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup (Optional)

For production use, you may want to set up a Google PageSpeed Insights API key:

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the PageSpeed Insights API
4. Create credentials (API Key)
5. Create a `.env` file in the root directory:

```env
VITE_PAGESPEED_API_KEY=your_api_key_here
```

**Note**: The application works without an API key but may have rate limitations.

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 🏗️ Project Structure

```
Demo_Project/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Loader.jsx          # Loading animation component
│   │   ├── Results.jsx         # Results display component
│   │   └── URLInput.jsx        # URL input form component
│   ├── utils/
│   │   ├── fetchMetrics.js     # Main API logic
│   │   └── alternativeFetch.js # Fallback simulation
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── index.css               # Global styles
│   └── main.jsx                # Application entry point
├── index.html                  # HTML template
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Project documentation
```

## 🔧 How It Works

### Performance Analysis Workflow

1. **URL Input Validation**

   - Validates URL format
   - Automatically adds HTTPS protocol if missing
   - Provides real-time validation feedback

2. **API Request Process**

   - Sends request to Google PageSpeed Insights API
   - Includes 30-second timeout for slow websites
   - Analyzes desktop performance by default

3. **Data Processing**

   - Extracts Largest Contentful Paint (LCP) for load time
   - Calculates total page size from resource summary
   - Counts HTTP requests from network analysis
   - Computes Lighthouse performance score

4. **Fallback Mechanism**

   - Automatically switches to simulation when API limits are reached
   - Provides realistic performance estimates
   - Maintains consistent user experience

5. **Results Display**
   - Color-coded performance scores (Green: 90+, Yellow: 50-89, Red: <50)
   - Formatted metrics with appropriate units
   - Clear indication of real vs. simulated data

## 🎨 UI/UX Features

- **Clean Design**: Modern, minimalist interface using Tailwind CSS
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Engaging animation during analysis
- **Error Handling**: User-friendly error messages with retry options
- **Visual Feedback**: Color-coded performance indicators
- **Progressive Enhancement**: Graceful fallback for API limitations

## 🔧 Development Tools & AI Assistance

### Tools Used in Development

- **GitHub Copilot**: Code completion and suggestions
- **AI-Assisted Development**: Used for component structure and API integration
- **Vite Hot Module Replacement**: Fast development experience
- **ESLint**: Code quality and consistency
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixes

### AI Development Process

1. **Component Architecture**: AI-assisted component structure design
2. **API Integration**: Automated API response handling logic
3. **Error Handling**: Comprehensive error scenarios and user feedback
4. **Styling**: Tailwind CSS class suggestions and responsive design
5. **Code Optimization**: Performance improvements and best practices

## 🚀 Deployment Options

### Vercel

```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Netlify

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## 📊 Performance Metrics Explained

- **Load Time**: Time to Largest Contentful Paint (LCP) - when the main content becomes visible
- **Page Size**: Total transfer size of all resources (HTML, CSS, JS, images)
- **HTTP Requests**: Total number of network requests made during page load
- **Performance Score**: Lighthouse score (0-100) based on various performance metrics

## 🔒 API Rate Limits & Fallback

The Google PageSpeed Insights API has rate limits:

- **Free tier**: 25,000 requests per day
- **Rate limit**: 1 request per second

When limits are reached, the application automatically switches to simulation mode, providing realistic performance estimates based on URL characteristics.

## 🐛 Troubleshooting

### Common Issues

1. **API Rate Limit Exceeded**

   - Solution: Application automatically uses simulation mode
   - Alternative: Set up your own API key

2. **Network Timeout**

   - Solution: Application retries with simulation
   - Check: Ensure stable internet connection

3. **Invalid URL Error**

   - Solution: Ensure URL is accessible and properly formatted
   - Example: Use `https://example.com` instead of `example`

4. **Build Errors**
   - Solution: Delete `node_modules` and run `npm install`
   - Check: Ensure Node.js version is 18+ and npm is 8+

## 🤝 Contributing

This project was developed as part of a technical assignment. For any questions or suggestions, please feel free to reach out.

---

**Created with ❤️ using React, Vite, and Tailwind CSS**
