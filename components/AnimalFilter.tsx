import React, { useState, ChangeEvent } from "react";

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
  const [species, setSpecies] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const handleStartOver = () => {
    setSpecies("");
    setAge("");
    setGender("");
    setSize("");
    onFilterChange({});
    setTags("");
  };

  const handleBreedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const breed = event.target.value;
    onFilterChange({ breed });
  };

  const handleTagsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const tag = event.target.value;
    setTags(tag);
    onFilterChange({ tags });
  };

  const handleAgeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const age = event.target.value;
    onFilterChange({ age });
  };

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const gender = event.target.value;
    onFilterChange({ gender });
  };

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    onFilterChange({ size });
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
              {/* Breed */}
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-lg font-semibold"
                onChange={handleBreedChange}
              >
                <option value="">Breed</option>
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>

              {/* Age */}
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-lg font-semibold"
                value={age}
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
                value={gender}
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
                value={size}
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
              Start Over
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimalFilter;
