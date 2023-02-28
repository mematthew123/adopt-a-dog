import { useState, useEffect } from 'react';
import DogsInMissoula from '../components/DogsInMissoula';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const fetchToken = async (): Promise<TokenResponse> => {
  const response = await fetch('/api/petfinder/token', {
    method: 'POST'
  });

  return response.json();
};

export default function Dogs() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const data = await fetchToken();
      setToken(data.access_token);
    };

    getToken();
  }, []);

  return (
    <div>
      <h1>Dogs in Missoula</h1>
      {token ? <DogsInMissoula token={token} /> : 'Loading...'}
    </div>
  );
}
