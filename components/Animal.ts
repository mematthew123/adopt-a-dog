export interface Animal {
    id: number;
    name: string;
    species: string;
    age: string;
    description: string;
    photos: { small: string; medium: string; large: string; full: string }[];
    status: string;
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
  
  export interface AnimalApiResponse {
    animals: Animal[];
  }
