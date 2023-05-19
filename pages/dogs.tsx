import DogList from "../components/DogList";
import usePetfinderToken from 'libs/hooks/usePetfinderToken';

export default function Dogs() {
  const [token, isLoaded] = usePetfinderToken();

  return (
    <div className="px-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-center py-2">Adopt these dogs!</h1>
      {isLoaded ? <DogList token={token} /> : "Loading..."}
    </div>
  );
}
