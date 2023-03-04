import type { NextApiRequest, NextApiResponse } from 'next';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const clientId = process.env.PETFINDER_CLIENT_ID;
const clientSecret = process.env.PETFINDER_CLIENT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse<TokenResponse>) {
  if (req.method !== 'POST') {
    return;
  }

  try {
    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data: TokenResponse = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
}
