import usePetfinderToken from "@/libs/hooks/usePetfinderToken";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Animal } from "../../components/DogsInMissoula";
import Image from "next/image";

interface Props {
  token: string;
}

export default function AnimalDetails({}: Props) {
  const [token, isLoaded] = usePetfinderToken();
  const router = useRouter();
  const { id } = router.query;
  const [isExpanded, setIsExpanded] = useState(false);
  const [personalityExpanded, setPersonalityExpanded] = useState(false);

  function togglePersonalityExpand() {
    setPersonalityExpanded(!personalityExpanded);
  }

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

  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }

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
    <>
      <div className="flex flex-col justify-center items-center mt-4 border-gray-200 border-b-stone-800 border-2 rounded-lg">
        <div className="lg:grid-flow-col grid grid-cols-2 gap-4 sm:items-center">
          {animal.photos.map((photo) => (
            <Image
              src={photo.medium}
              key={photo.medium}
              alt={animal.name}
              className="my-2 rounded-lg"
              width={300}
              height={300}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-2 p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">{animal.name}</h1>
        <h2 className="text-xl font-bold text-emerald-600">
          100% {animal.status}
        </h2>
      </div>

      <div className="text-center mt-2 p-4 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">Description</h2>
        <button
          className="text-lg font-semibold text-emerald-600 focus:outline-none"
          onClick={toggleExpand}
        >
          {isExpanded ? "Hide" : "Show"}
        </button>
      </div>
      <div
        className={`${
          isExpanded ? "block" : "hidden"
        } text-lg mt-2 description-section`}
      >
        <div className="text-center mt-2 p-4 flex flex-col justify-center items-center">
          <p>{animal.age}</p>
          <p>{animal.gender}</p>
          <p>{animal.size}</p>
          <p>{animal.coat}</p>
          <p>{animal.colors.primary}</p>
          <p>{animal.colors.secondary}</p>
          <p>{animal.colors.tertiary}</p>
          <p>{animal.attributes.spayed_neutered ? "Spayed/Neutered" : ""}</p>
          <p>{animal.attributes.house_trained ? "House Trained" : ""}</p>
          <p>{animal.attributes.declawed ? "Declawed" : ""}</p>
          <p>{animal.attributes.special_needs ? "Special Needs" : ""}</p>
          <p>{animal.attributes.shots_current ? "Shots Current" : ""}</p>
          <p>{animal.environment.children ? "Good with Children" : ""}</p>
          <p>{animal.environment.dogs ? "Good with Dogs" : ""}</p>
          <p>{animal.environment.cats ? "Good with Cats" : ""}</p>
        </div>
      </div>
      <div className="text-center mt-4 p-4 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">Personality</h2>
        <button
          className="text-lg font-semibold text-emerald-600 focus:outline-none"
          onClick={togglePersonalityExpand}
        >
          {personalityExpanded ? "Hide" : "Show"}
        </button>
      </div>
      <div
        className={`${
          personalityExpanded ? "block" : "hidden"
        } text-lg mt-2 description-section`}
      >
        <div className="text-center mt-4 p-4 flex flex-col justify-center items-center">
          {animal.tags.length > 0 ? (
            personalityExpanded && (
              <ul className="list-none">
                {animal.tags.map((tag) => (
                  <li key={tag}>🐶 {tag}</li>
                ))}
              </ul>
            )
          ) : (
            <div className="text-lg">
              <p>There is no personality information for this animal.</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-4 p-4 mb-4 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="text-lg text-blue-400">
          <a href={`mailto:${animal.contact.email}`}>{animal.contact.email}</a>
        </p>
        <p className="text-lg text-blue-400 ">
          <a href={`tel:${animal.contact.phone}`}>{animal.contact.phone}</a>
        </p>
      </div>
    </>
  );
}
