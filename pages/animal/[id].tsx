import usePetfinderToken from "@/libs/hooks/usePetfinderToken";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Animal}  from "../../components/DogsInMissoula";

interface Props {
  token: string;
}

export default function AnimalDetails({}: Props) {
  const [token, isLoaded] = usePetfinderToken();
  const router = useRouter();
  const { id } = router.query;
  const [animal, setAnimal] = useState<Animal>({
    id: 0,
    name: "",
    species: "",
    age: "",
    description: "",
    photos: [],
    status: "",
    attributes: {
      spayed_neutered: false,
      house_trained: false,
      declawed: false,
      special_needs: false,
      shots_current: false
    },
    environment: { children: false, dogs: false, cats: false },
    tags: [],
    gender: "",
    size: "",
    coat: "",
    colors: { primary: "", secondary: "", tertiary: "" },
    contact: {
      email: "",
      phone: "",
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        country: ""
      }
    },
    organization: { id: "", name: "" }
  });

  useEffect(() => {
    const fetchAnimal = async () => {
      if (!isLoaded) {
        return;
      }

      const response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        console.error(`Error fetching animal: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setAnimal(data.animal);
    };

    fetchAnimal();
  }, [id, token, isLoaded]);

    return (    
    <div>
      <h2 className="text-2xl font-bold">{animal.name}</h2>
      <p className="text-lg font-medium">{animal.species}</p>
      <p className="text-lg font-medium">{animal.age}</p>
      <p className="text-lg whitespace-pre-wrap">{animal.description}</p>
        <p className="text-lg">{animal.status}</p>

      <div className="flex justify-center">

{animal.photos.length > 0 ? (
  <img
    src={animal.photos[0].small}
    alt={animal.name}
    className="my-2"
  />
) : (
  <p>No photo available</p>
)}
</div>

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
        </div>
        );
        }

    