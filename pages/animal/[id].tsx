import usePetfinderToken from "@/libs/hooks/usePetfinderToken";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Animal } from "@/types";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { useUser } from "@clerk/clerk-react";
import { useFavorite } from "@/context/favoriteContext";
import Link from "next/link";

interface Props {
  token: string;
}

export default function AnimalDetails({}: Props) {
  const [token, isLoaded] = usePetfinderToken();
  const router = useRouter();
  const { id } = router.query;
  const [isExpanded, setIsExpanded] = useState(false);
  const [personalityExpanded, setPersonalityExpanded] = useState(false);

  const { user } = useUser();
  const { toggleFavorite, getUserFavorites } = useFavorite();
  const userFavorites = user ? getUserFavorites(user.id) : [];

  function togglePersonalityExpand() {
    setPersonalityExpanded(!personalityExpanded);
  }

  const [animal, setAnimal] = useState<Animal>({
    breed: "",
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
      <div className=" bg-gray-50 flex flex-col justify-center items-center  border-gray-200 border-b-stone-800 border-2 rounded-lg">
        <div className="lg:grid-flow-col grid grid-cols-2 gap-4 sm:items-center">
          {animal.photos.map((photo) => (
            <Image
              src={photo.medium}
              key={photo.medium}
              alt={animal.name}
              className="my-2 rounded-lg bg-gray-50"
              width={300}
              height={300}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="text-center p-4 bg-gray-50">
        <h1 className="text-3xl font-bold mb-2">
          {user &&
            (userFavorites.some(
              (favorite) => favorite.animalId === animal.id
            ) ? (
              <FilledHeartIcon
                className="h-10 w-10 inline-block mr-2 cursor-pointer"
                onClick={() => toggleFavorite(user.id, animal.id)}
              />
            ) : (
              <HeartIcon
                className="h-10 w-10 inline-block mr-2 cursor-pointer"
                onClick={() => toggleFavorite(user.id, animal.id)}
              />
            ))}

          {animal.name}
        </h1>
        <p className="text-lg leading-relaxed">
          {animal.name} is a {animal.gender} and is considered to be a{" "}
          {animal.age} doggo.
        </p>
        <p className="text-lg mt-4">
          {animal.description}
        </p>

        <div className="text-center mt-4 p-4">
          <div className="flex flex-col justify-center items-center mb-4">
            <h2 className="text-3xl font-bold mb-2">Personality</h2>
            <button
              className="text-lg font-semibold text-black focus:outline-none"
              onClick={togglePersonalityExpand}
            >
              {personalityExpanded ? "Hide" : "Show"}
            </button>
          </div>
          <div
            className={`${
              personalityExpanded ? "block" : "hidden"
            } text-lg mt-4 description-section`}
          >
            <div className="text-center mt-4 p-4 flex flex-col justify-center items-center">
              {animal.tags.length > 0 ? (
                <ul className="list-none list-inside">
                  {animal.tags.map((tag) => (
                    <li key={tag} className="text-xl">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-lg">
                  <p>No personality information available</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-4 p-4 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-2">
              Physical Characteristics
            </h2>
            <button
              className="text-lg font-semibold text-black focus:outline-none"
              onClick={toggleExpand}
            >
              {isExpanded ? "Hide" : "Show"}
            </button>
          </div>

          <div
            className={`${
              isExpanded ? "block" : "hidden"
            } text-lg mt-4 description-section`}
          >
            <div className="text-center mt-4 p-4">
              <p className="text-lg mb-2">Size: {animal.size}</p>
              <p className="text-lg mb-2">
                Primary color: {animal.colors.primary}
              </p>
              <p className="text-lg mb-2">
                Secondary color: {animal.colors.secondary}
              </p>
              <p className="text-lg mb-2">
                Tertiary color: {animal.colors.tertiary}
              </p>
              <p className="text-lg mb-2">
                {animal.attributes.spayed_neutered
                  ? "Spayed/Neutered"
                  : "Not spayed/neutered"}
              </p>
              <p className="text-lg mb-2">
                {animal.attributes.house_trained
                  ? "House trained"
                  : "Not house trained"}
              </p>
              <p className="text-lg mb-2">
                {animal.attributes.declawed ? "Declawed" : "Not declawed"}
              </p>
              <p className="text-lg mb-2">
                {animal.attributes.special_needs
                  ? "Special needs"
                  : "No special needs"}
              </p>
              <p className="text-lg mb-2">
                {animal.attributes.shots_current
                  ? "Shots current"
                  : "Shots not current"}
              </p>
              <p className="text-lg mb-2">
                {animal.environment.children
                  ? "Good with children"
                  : "Not good with children"}
              </p>
              <p className="text-lg mb-2">
                {animal.environment.dogs
                  ? "Good with dogs"
                  : "Not good with dogs"}
              </p>
              <p className="text-lg mb-2">
                {animal.environment.cats
                  ? "Good with cats"
                  : "Not good with cats"}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center mt-4">
            <h2 className="text-3xl font-bold mb-2">Contact</h2>
            <p className="text-lg">
              If you are interested in adopting {animal.name}, please contact{" "}
              <span className=" text-sky-800 font-semibold text-lg">
                <Link href={`mailto:${animal.contact.email}`}>
                  {animal.contact.email}
              
                </Link>
                <Link href={`tel:${animal.contact.phone}`}>
                  {animal.contact.phone}
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
