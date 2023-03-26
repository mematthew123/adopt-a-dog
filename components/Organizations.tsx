import { useState, useEffect } from "react";
import usePetfinderToken from "libs/hooks/usePetfinderToken";

interface Props {}

interface Organization {
  id: string;
  name: string;
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
}

interface OrganizationApiResponse {
  organizations: Organization[];
}

export default function Organizations({}: Props) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [token, isLoaded] = usePetfinderToken();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await fetch(
        "https://api.petfinder.com/v2/organizations?location=Missoula%2C+MT",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      const data: OrganizationApiResponse = await response.json();

      setOrganizations(data.organizations);
    };

    if (isLoaded) {
      fetchOrganizations();
    }
  }, [token, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50">
      {organizations.map((org) => (
        <div
          key={org.id}
          className="p-4 border border-gray-300 rounded-lg flex flex-col"
        >
          <h2 className="text-2xl font-bold">{org.name}</h2>
          <div className="my-4">
            <h3 className="text-lg font-medium">Contact</h3>
            <p className="text-base">{org.email}</p>
            <p className="text-base">{org.phone}</p>
            <p className="text-base">{org.address.address1}</p>
            <p className="text-base">{org.address.address2}</p>
            <p className="text-base">
              {org.address.city}, {org.address.state}, {org.address.postcode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
