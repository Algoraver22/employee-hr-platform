import React, { useEffect, useState } from 'react';

const LoadingFallback = ({ children, timeout = 3000 }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  const handleRetry = () => {
    setShowFallback(false);
    setForceRender(prev => prev + 1);
  };

  if (showFallback) {
    return (
      <div className="loading-fallback">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h3>Loading your dashboard...</h3>
          <p>This is taking longer than expected</p>
          <button className="btn btn-primary" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <div key={forceRender}>{children}</div>;
};

export default LoadingFallback;