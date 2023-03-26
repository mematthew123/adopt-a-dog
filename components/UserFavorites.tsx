import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Animal, AnimalApiResponse } from "../types";
import usePetfinderToken from "libs/hooks/usePetfinderToken";
import { useUser } from "@clerk/clerk-react";
import { useFavorite } from "context/favoriteContext";


interface Props {}

export default function UserFavorites({}: Props) {
  const { user } = useUser();
  const { getUserFavorites } = useFavorite();
  const userFavorites = user ? getUserFavorites(user.id) : [];
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>([]);
  const [token, isLoaded] = usePetfinderToken();

  useEffect(() => {
    console.log("User Favorites:", userFavorites);
  }, [userFavorites]);

  useEffect(() => {
    const fetchFavoriteAnimals = async () => {
      const favoriteAnimalPromises = userFavorites.map(async (fav) => {
        const response = await fetch(
          `https://api.petfinder.com/v2/animals/${fav.animalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data: AnimalApiResponse = await response.json();
        console.log("Animal data:", data); // Add this line to inspect the response

        return data.animal;
      });

      const fetchedFavoriteAnimals = await Promise.all(favoriteAnimalPromises);
      setFavoriteAnimals(fetchedFavoriteAnimals.flat());
    };

    if (userFavorites.length > 0 && isLoaded) {
      fetchFavoriteAnimals();
    }
  }, [userFavorites, isLoaded, token]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:justify-between">
        {favoriteAnimals.map((animal) => (
          <div
            key={animal.id}
            className="p-2 border border-gray-300 rounded-lg place-content-center"
          >
            <h2 className="text-2xl font-bold mb-2">{animal.name}</h2>
            {animal.photos.length > 0 ? (
              <div className="my-2 flex justify-center aspect-auto">
                <Link href={`/animal/${animal.id}`}>
                  <Image
                    src={animal.photos[0].large}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    width={1200}
                    height={1200}
                    alt={""}
                    className="rounded-lg h-80 w-80 aspect-w-1 aspect-h-1 hover:shadow-2xl"
                    priority
                  />
                </Link>
              </div>
            ) : (
              <p className="text-center font-medium text-xl">
                Image coming soon
              </p>
            )}

            {/* Add more animal details if needed */}

            <hr className="my-6" />
            <Link href={`/animal/${animal.id}`}>
              <button className="hover:bg-stone-100 text-black font-bold py-2 px-4 rounded underline">
                More Info
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
