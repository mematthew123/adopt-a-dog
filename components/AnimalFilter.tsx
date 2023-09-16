import React, { useState, ChangeEvent, useEffect } from "react";

export interface FilterCriteria {
  species?: string;
  age?: string;
  gender?: string;
  size?: string;
  tags?: string;
  breed?: string;
}

interface AnimalFilterProps {
  onFilterChange: (filter: FilterCriteria) => void;
  breeds: string[];
}

export const AnimalFilter = ({ onFilterChange, breeds }: AnimalFilterProps) => {
  const [filter, setFilter] = useState<FilterCriteria>({});

  const updateFilter = (newFilter: FilterCriteria) => {
    setFilter((prevFilter) => {
      return { ...prevFilter, ...newFilter };
    });
  };

  // Use useEffect to call onFilterChange when filter changes
  useEffect(() => {
    onFilterChange(filter);
  }, [filter]);


  const handleStartOver = () => {
    setFilter({});
    onFilterChange({});
  };


  const handleAgeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const age = event.target.value;
    updateFilter({ age });
  };

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const gender = event.target.value;
    updateFilter({ gender });
  };

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    updateFilter({ size });
  };

  const sizeOptions = ["small", "medium", "large", "Extra-large"];
  const genderOptions = ["male", "female"];
  const ageOptions = ["baby", "young", "adult", "senior"];
  

  // State variable to track whether the filter is visible
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  // Function to toggle the visibility of the filter
  const toggleFilterVisibility = () => {
    setFilterVisible((prevVisible) => !prevVisible);
  };

  return (
    <>
      <button
        className="block bg-stone-100 text-black font-bold py-2 px-4 rounded mb-4"
        onClick={toggleFilterVisibility}
      >
        {filterVisible ? "Hide Filter" : "Show Filter"}
      </button>
      <div
        className={`${
          filterVisible ? "" : "hidden"
        } container mx-auto mb-4 sm:mb-0`}
      >
        <div className="flex flex-col justify-center items-center p-4">
          <h3 className="text-center text-2xl font-bold mb-4">
            Find the perfect doggo
          </h3>
          <div className="flex flex-col justify-center items-center">
            <div className="sm:flex sm:flex-row sm:justify-center sm:items-center">

              {/* Age */}
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-lg font-semibold"
                onChange={handleAgeChange}
              >
                <option value="">Age</option>
                {ageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Gender */}
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-lg font-semibold"
                onChange={handleGenderChange}
              >
                <option value="">Gender</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Size */}
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-lg font-semibold"
                onChange={handleSizeChange}
              >
                <option value="">Size</option>
                {sizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleStartOver}
            >
             Clear Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalFilter;
