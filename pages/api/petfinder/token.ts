import { useState, useEffect } from "react";
import { NextApiRequest } from "next";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

const useTokenResponse = (req: NextApiRequest): TokenResponse => {
  const [tokenResponse, setTokenResponse] = useState<TokenResponse>();

  useEffect(() => {
    const getToken = async () => {
      const clientId = process.env.PETFINDER_CLIENT_ID;
      const clientSecret = process.env.PETFINDER_CLIENT_SECRET;
      const encodedAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
        "base64"
      );
      const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });
      const data: TokenResponse = await response.json();

      setTokenResponse(data);
    };

    getToken();
  }, [req]);

  return tokenResponse as TokenResponse;
};

export default useTokenResponse;
