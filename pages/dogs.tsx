import DogList from "../components/DogList";
import usePetfinderToken from 'libs/hooks/usePetfinderToken';
import Head from 'next/head';

export default function Dogs() {
  const [token, isLoaded] = usePetfinderToken();

  return (
    <>
      <Head>
        <title>Adopt MT | Dogs</title>
        <meta name="description" content="Adopt a furry friend today" />
        <meta property="og:title" content="Adopt MT | Dogs" key="title" />
        <meta property="og:description" content="Adopt a furry friend today" />
        <meta property="og:image" content="/flowerdog.jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="230" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adoptmt.org/" />
      </Head>

      <div className="px-4 bg-gray-50">
        <h1 className="text-4xl font-bold text-center py-2">Adopt these dogs!</h1>
        {isLoaded ? <DogList token={token} /> : "Loading..."}
      </div>
    </>

  );
}
