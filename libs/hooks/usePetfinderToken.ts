import { useState, useEffect } from 'react';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export default function usePetfinderToken(): [string, boolean] {
  const [token, setToken] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/petfinder/token', {
          method: 'POST',
        });
        const data: TokenResponse = await response.json();
        setToken(data.access_token);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchToken();
  }, []);

  return [token, isLoaded];
}
