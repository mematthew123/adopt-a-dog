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
        <p>
          Sweet {animal.name} is a {animal.age} {animal.gender} who is{" "}
          {animal.status}, and is looking for a new forever home.
        </p>
        <br/>
        {/* <p> {animal.name} does well with {animal.environment.children ? "children" : "no children"}.
        Which means {animal.name} is {animal.environment.dogs ? "good with dogs" : "not good with dogs"}.
         {animal.name} is {animal.environment.cats ? "good with cats" : "not good with cats"}.


        </p> */}
        <div className="text-center mt-2 p-4 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Physical Characteristics</h2>
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
            <p>Size: {animal.size}</p>
            <p>Primary color: {animal.colors.primary}</p>
            <p>Secondary color: {animal.colors.secondary}</p>
            <p>Tertiary color: {animal.colors.tertiary}</p>
            <p>
              {animal.attributes.spayed_neutered
                ? "Spayed/Neutered"
                : "Not spayed/neutered"}
            </p>
            <p>
              {animal.attributes.house_trained
                ? "House trained"
                : "Not house trained"}
            </p>
            <p>{animal.attributes.declawed ? "Declawed" : "Not declawed"}</p>
            <p>
              {animal.attributes.special_needs
                ? "Special needs"
                : "No special needs"}
            </p>
            <p>
              {animal.attributes.shots_current
                ? "Shots current"
                : "Shots not current"}
            </p>
            <p>
              {animal.environment.children
                ? "Good with children"
                : "Not good with children"}
            </p>
            <p>
              {animal.environment.dogs
                ? "Good with dogs"
                : "Not good with dogs"}
            </p>
            <p>
              {animal.environment.cats
                ? "Good with cats"
                : "Not good with cats"}
            </p>
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
                <p>No personality information available </p>
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-4 p-4 mb-4 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p className="text-lg">
            If you are interested in adopting {animal.name}, please contact
            <p className=" text-sky-800 font-semibold text-lg">
              <a href={`mailto:${animal.contact.email}`}>
                {animal.contact.email}
              </a>{" "}
              <a href={`tel:${animal.contact.phone}`}>{animal.contact.phone}</a>
              .
            </p>
          </p>
        </div>
      </div>
    </>
  );
}
