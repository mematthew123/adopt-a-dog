import { useState } from "react";

interface SidebarProps {
  onFilter: (filter: { organization: string }) => void;
}

export default function Sidebar({ onFilter }: SidebarProps) {
  const [organization, setOrganization] = useState("");

  const handleFilter = () => {
    onFilter({ organization });
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-medium mb-2">Filter</h2>
      <div className="mb-4">
        <label htmlFor="organization-select" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
        <select
          id="organization-select"
          className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        >
          <option value="">All</option>
          <option value="ABC Shelter">ABC Shelter</option>
          <option value="XYZ Rescue">XYZ Rescue</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600" onClick={handleFilter}>Filter</button>
    </div>
  );
}
