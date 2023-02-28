import useTokenResponse from "./token";
import type { NextApiRequest, NextApiResponse } from "next";

interface Animal {
  id: number;
  name: string;
  species: string;
  age: string;
  breeds: { primary: string };
  story: string;
  description: string;
  photos: {
    small: string;
    medium: string;
    large: string;
    full: string;
  }[];
  attributes: {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed: boolean;
    special_needs: boolean;
    shots_current: boolean;
  };
  environment: { children: boolean; dogs: boolean; cats: boolean };
  tags: string[];
  gender: string;
  size: string;
  coat: string;
  colors: { primary: string; secondary: string; tertiary: string };
  contact: {
    email: string;
    phone: string;
    address: {
      address1: string;
      address2: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
  };
  organization: { id: string; name: string };
}

interface AnimalApiResponse {
  animal: Animal;
}

export default async function animal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const tokenResponse = useTokenResponse(req);
  const token = tokenResponse?.access_token;

  if (!token) {
    res.status(500).send("Error retrieving Petfinder token");
    return;
  }

  const response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data: AnimalApiResponse = await response.json();

  res.status(200).json(data.animal);
}
