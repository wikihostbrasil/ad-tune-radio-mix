
import { useState, useEffect } from 'react';

interface UseLoadingStateProps {
  initialDelay?: number;
  minLoadingTime?: number;
}

export const useLoadingState = ({ 
  initialDelay = 0, 
  minLoadingTime = 1000 
}: UseLoadingStateProps = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, initialDelay + minLoadingTime);

    return () => clearTimeout(timer);
  }, [initialDelay, minLoadingTime]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return {
    isLoading,
    showSplash,
    handleSplashComplete,
    setIsLoading
  };
};
