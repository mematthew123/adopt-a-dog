import router from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimalFilter } from "../components/AnimalFilter";
import { FilterCriteria } from "../components/AnimalFilter";
import { Animal, AnimalApiResponse } from "./Animal";
import Link from "next/link";

interface Props {
  token: string;
}

export default function DogsInMissoula({ token }: Props) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [page, setPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("currentPage") as string; // get the saved page number from local storage
    return savedPage ? parseInt(savedPage) : 1; // default to page 1 if no value is saved
  });

  const limit = 6;
  const [filter, setFilter] = useState<FilterCriteria>({});

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
      ...filterCriteria,
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
    // Save the current page number to local storage whenever it changes
    localStorage.setItem("currentPage", page.toString());

    fetchAnimals(page, limit, filter);
  }, [page, filter, limit]);

  const handleNextPage = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <AnimalFilter
        onFilterChange={handleFilterChange}
        breeds={[
          "Labrador Retriever",
          "Poodle",
          "Pit Bull Terrier",
          "Shih Tzu",
          "Boxer",
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:justify-between">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="p-2 border border-gray-300 rounded-lg place-content-center"
          >
            <h2 className="text-2xl font-bold mb-2">{animal.name}</h2>
            {animal.photos.length > 0 ? (
              <div className="my-2 flex justify-center aspect-auto">
                <Link href={`/animal/${animal.id}`}>
                  <Image
                    src={animal.photos[0].medium}
                    width={300}
                    height={300}
                    alt={""}
                    className="rounded-lg h-80 w-80 aspect-w-1 aspect-h-1 hover:shadow-2xl"
                    loading="eager"
                  />
                </Link>
              </div>
            ) : (
              <p className="text-center font-medium text-xl">
                Image coming soon
              </p>
            )}
            <h2 className="text-2xl font-semibold my-2">About</h2>
            <div className="my-2">
              <h3 className="text-lg font-semibold mb-2">Personality</h3>
              {animal.tags.length === 0 ? (
                <p className="text-lg">
                  There is no personality information for this animal
                </p>
              ) : (
                <p className="text-lg">{animal.tags.join(", ")}</p>
              )}
            </div>

            <div className="my-2">
              <h3 className="text-lg font-semibold underline mb-2">Contact</h3>
              <p className="text-lg text-sky-800  mb-2">
                <a href={`mailto:${animal.contact.email}`}>
                  {animal.contact.email}
                </a>
              </p>
              <p className="text-lg text-sky-800 mb-2">
                <a href={`tel:${animal.contact.phone}`}>
                  {animal.contact.phone}
                </a>
              </p>
            </div>

            <hr className="my-6" />
            <button
              className="hover:bg-stone-100 text-black font-bold py-2 px-4 rounded underline"
              onClick={() => onClick(animal.id)}
            >
              More Info
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between my-4">
        <button
          className="hover:bg-stone-100 text-black font-bold py-2 px-4 rounded"
          onClick={handlePreviousPage}
        >
          Previous Page
        </button>
        <button
          className="hover:bg-stone-100 text-black font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
