import { useState, useEffect } from 'react';
import Organizations from '@/components/Organizations';

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

export default function Orgs() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const data = await fetchToken();
      setToken(data.access_token);
    };

    getToken();
  }, []);

  return (
<div className="px-4 py-8">
  <h1 className="text-3xl font-bold mb-4">Organizations</h1>
  <p className="text-lg mb-4">These guys are the best and deserve your support. Reach out to them today!</p>
  {token ? <Organizations/> : <p>Loading...</p>}
</div>

  );
}
