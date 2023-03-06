import router from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimalFilter } from "../components/AnimalFilter";
import { FilterCriteria } from "../components/AnimalFilter";

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
  const [page, setPage] = useState(1); // declare page state variable
  const limit = 6; // set limit to 10 results per page
  const [filter, setFilter] = useState<FilterCriteria>({}); // declare filter state variable

  const handleFilterChange = (filter: FilterCriteria) => {
    setFilter(filter);
  };

  const onClick = (id: number) => {
    router.push(`/animal/${id}`);
  };

  const fetchAnimals = async (
    page: number,
    limit: number,
    filterCriteria: FilterCriteria
  ) => {
    const queryParams = new URLSearchParams({
      type: "dog",
      location: "Missoula, MT",
      page: page.toString(),
      limit: limit.toString(),
      ...filterCriteria, // add filter criteria as query parameters
    }).toString();

    const response = await fetch(
      `https://api.petfinder.com/v2/animals?${queryParams}`,
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

  useEffect(() => {
    fetchAnimals(page, limit, filter);
  }, [page, filter, limit]); // add filter to dependency array

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchAnimals(page - 1, limit, filter);
    }
  };

  return (
    <div>
      <AnimalFilter
        onFilterChange={function (filter: FilterCriteria): void {
          handleFilterChange(filter);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:justify-between">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="p-2 border border-gray-300 rounded-lg place-content-center"
          >
            <h2 className="text-2xl font-bold">{animal.name}</h2>
            {animal.photos.length > 0 ? (
              <div className="my-2 flex justify-center aspect-auto">
                <Image
                  src={animal.photos[0].medium}
                  width={300}
                  height={300}
                  alt={""}
                  className="rounded-lg h-80 w-80 aspect-w-1 aspect-h-1"
                  loading="eager"
                />
              </div>
            ) : (
              <p className=" text-center font-medium text-xl ">
                Image coming soon
              </p>
            )}
            <h2 className="text-2xl font-semibold">About</h2>
            <div>
              <h3 className="text-lg font-semibold">Personality</h3>
              {animal.tags.length === 0 ? (
                <p className="text-lg">There is no personality information for this animal</p>
              ) : (
                <p className="text-lg">{animal.tags.join(", ")}</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold underline">Contact</h3>
              <p className="text-lg text-blue-400">
                <a href={`mailto:${animal.contact.email}`}>
                  {animal.contact.email}
                </a>
              </p>
              <p className="text-lg text-blue-400 ">
                <a href={`tel:${animal.contact.phone}`}>
                  {animal.contact.phone}
                </a>
              </p>
            </div>

            <hr className="my-6" />
            <button
              className="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded underline"
              onClick={() => onClick(animal.id)}
            >
              More Info
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          className="hover:bg-blue-700 text-black font-bold py-2 px-4 mb-2 rounded"
          onClick={handlePreviousPage}
        >
          Previous Page
        </button>
        <button
          className="hover:bg-blue-700 text-black font-bold py-2 px-4 mb-2 rounded"
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
