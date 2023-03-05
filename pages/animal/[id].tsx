import usePetfinderToken from "@/libs/hooks/usePetfinderToken";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Animal } from "../../components/DogsInMissoula";

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
      shots_current: false,
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
        country: "",
      },
    },
    organization: { id: "", name: "" },
  });

  useEffect(() => {
    const fetchAnimal = async () => {
      if (!isLoaded) {
        return;
      }

      const response = await fetch(
        `https://api.petfinder.com/v2/animals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(
          `Error fetching animal: ${response.status} ${response.statusText}`
        );
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
        {animal.photos.map((photo) => (
          <img
            src={photo.large}
            key={photo.full}
            alt={animal.name}
            className="my-2"
          />
        ))}
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
      <p className="text-lg">
        {animal.attributes.special_needs ? "Special Needs" : "No Special Needs"}
      </p>
      <p className="text-lg">
        {animal.attributes.shots_current ? "Shots Current" : "Shots Not Current"}
      </p>

      <p className="text-lg">
        {animal.environment.children ? "Good with Children" : "Not Good with Children"}
      </p>
      <p className="text-lg">
        {animal.environment.dogs ? "Good with Dogs" : "Not Good with Dogs"}
      </p>
      <p className="text-lg">
        {animal.environment.cats ? "Good with Cats" : "Not Good with Cats"}
      </p>
          
      <p className="text-lg">
  Tags: {animal.tags.join(', ')}
</p>


      <p className="text-lg">Organization Name: {animal?.organization?.name}</p>
<p className="text-lg">Organization ID: {animal?.organization?.id}</p>

<h3 className="text-xl font-bold mt-4">Contact Details</h3>
<p className="text-lg">Email: {animal?.contact?.email ?? 'N/A'}</p>
<p className="text-lg">Phone: {animal?.contact?.phone ?? 'N/A'}</p>
<p className="text-lg">Address: {animal?.contact?.address?.address1 ?? 'N/A'}</p>
<p className="text-lg">{animal?.contact?.address?.address2}</p>
<p className="text-lg">{animal?.contact?.address?.city}, {animal?.contact?.address?.state} {animal?.contact?.address?.postcode}</p>
<p className="text-lg">{animal?.contact?.address?.country ?? 'N/A'}</p>




    </div>
  );
}
