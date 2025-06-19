
import { useState, useEffect } from 'react';

interface LogoData {
  logoUrl: string;
  fallbackUrl: string;
}

export const useLogo = () => {
  const [logoUrl, setLogoUrl] = useState<string>('/assets/img/logo.png');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch('/api/logo.json');
        const data: LogoData = await response.json();
        setLogoUrl(data.logoUrl || data.fallbackUrl);
      } catch (error) {
        console.log('Using fallback logo');
        setLogoUrl('/assets/img/logo.png');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return { logoUrl, isLoading };
};
