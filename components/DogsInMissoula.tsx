import router from "next/router";
import { useState, useEffect } from "react";

interface Props {
  token: string;
}

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

interface AnimalApiResponse {
  animals: Animal[];
}

export default function DogsInMissoula({ token }: Props) {
  const [animals, setAnimals] = useState<Animal[]>([]);

  // we want an onclicik function that will take the animal id and then push to the next page

  const onClick = (id: number) => {
    router.push(`/animal/${id}`);
    
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await fetch(
        "https://api.petfinder.com/v2/animals?type=dog&location=Missoula%2C+MT",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data: AnimalApiResponse = await response.json();

      setAnimals(data.animals);
    };

    fetchAnimals();
  }, [token]);

  console.log(animals);
  return (
    <div>
      {animals.map((animal) => (
        <div key={animal.id} className="mb-6">
          <h2 className="text-2xl font-bold">{animal.name}</h2>
          <p className="text-lg font-medium">{animal.species}</p>
          <p className="text-lg font-medium">{animal.age}</p>
          <p className="text-lg whitespace-pre-wrap">{animal.description}</p>

          {animal.photos.length > 0 ? (
            <img
              src={animal.photos[0].small}
              alt={animal.name}
              className="my-2"
            />
          ) : (
            <p>No photo available</p>
          )}

          <p className="text-lg">
            {animal.attributes.spayed_neutered
              ? "Spayed/Neutered"
              : "Not Spayed/Neutered"}
          </p>
          <p className="text-lg">
            {animal.attributes.house_trained
              ? "House Trained"
              : "Not House Trained"}
          </p>
          <p className="text-lg">
            {animal.attributes.declawed ? "Declawed" : "Not Declawed"}
          </p>
          <p className="text-lg">
            {animal.attributes.special_needs
              ? "Special Needs"
              : "No Special Needs"}
          </p>
          <p className="text-lg">
            {animal.attributes.shots_current
              ? "Shots Current"
              : "Shots Not Current"}
          </p>
          <p className="text-lg">
            {animal.environment.children
              ? "Good with Children"
              : "Not Good with Children"}
          </p>
          <p className="text-lg">
            {animal.environment.dogs ? "Good with Dogs" : 'Not Good" with Dogs'}
          </p>
          <p>
            {animal.environment.cats ? "Good with Cats" : "Not Good with Cats"}
          </p>
          <p className="text-lg">{animal.tags.join(", ")}</p>
          <p className="text-lg">{animal.gender}</p>
          <p className="text-lg">{animal.size}</p>
          <p className="text-lg">{animal.coat}</p>
          <p className="text-lg">
            {animal.colors.primary}, {animal.colors.secondary},{" "}
            {animal.colors.tertiary}
          </p>
          <p className="text-lg">{animal.contact.email}</p>
          <p className="text-lg">{animal.contact.phone}</p>
          <p className="text-lg">{animal.contact.address.address1}</p>
          <p className="text-lg">{animal.contact.address.address2}</p>
          <p className="text-lg">{animal.contact.address.city}</p>
          <p className="text-lg">{animal.contact.address.state}</p>
          <p className="text-lg">{animal.contact.address.postcode}</p>
          <p className="text-lg">{animal.contact.address.country}</p>
          {/* <p className="text-lg">{animal.organization.id}</p> */}
          {/* <p className="text-lg">{animal.organization.name}</p> */}
          <button
            className="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            onClick={() => onClick(animal.id)}
          >
            View details
          </button>
          

          <hr className="my-6" />
        </div>
      ))}
    </div>
  );
}
