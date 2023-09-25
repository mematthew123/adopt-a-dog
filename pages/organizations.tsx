import Organizations from '@/components/Organizations';
import usePetfinderToken from 'libs/hooks/usePetfinderToken';
import Head from 'next/head';



export default function Orgs() {
  const [token, isLoaded] = usePetfinderToken();

  return (
    <>
      <Head>
        <title>Adopt MT | Organizations</title>
        <meta name="description" content="Adopt a furry friend today" />
        <meta property="og:title" content="Adopt MT | Organizations" key="title" />
        <meta property="og:description" content="Adopt a furry friend today" />
        <meta property="og:image" content="/flowerdog.jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="230" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adoptmt.org/" />
      </Head>
      <div className="px-4 py-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Organizations</h1>
        <p className="text-lg mb-4">These guys are the best and deserve your support. Reach out to them today!</p>
        {token ? <Organizations /> : <p>Loading...</p>}
      </div>
    </>


  );
}
