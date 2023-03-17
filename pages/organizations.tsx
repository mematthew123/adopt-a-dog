import Organizations from '@/components/Organizations';
import usePetfinderToken from 'libs/hooks/usePetfinderToken';



export default function Orgs() {
  const [token, isLoaded] = usePetfinderToken();

  return (
<div className="px-4 py-8">
  <h1 className="text-3xl font-bold mb-4">Organizations</h1>
  <p className="text-lg mb-4">These guys are the best and deserve your support. Reach out to them today!</p>
  {token ? <Organizations/> : <p>Loading...</p>}
</div>

  );
}
