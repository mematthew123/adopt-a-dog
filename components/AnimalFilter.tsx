import React, { useState, ChangeEvent } from "react";

export interface FilterCriteria {
  species?: string;
  age?: string;
  gender?: string;
  size?: string;
}

interface AnimalFilterProps {
  onFilterChange: (filter: FilterCriteria) => void;
}

export const AnimalFilter = ({ onFilterChange }: AnimalFilterProps) => {
  const [species, setSpecies] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const handleStartOver = () => {
    setSpecies("");
    setAge("");
    setGender("");
    setSize("");
    onFilterChange({});
  };  

  const handleSpeciesChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const species = event.target.value;
    setSpecies(species);
    onFilterChange({ species });
  };

  const handleAgeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const age = event.target.value;
    setAge(age);
    onFilterChange({ age });
  };

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const gender = event.target.value;
    setGender(gender);
    onFilterChange({ gender });
  };

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setSize(size);
    onFilterChange({ size });
  };


  const sizeOptions = ["small", "medium", "large"];
  const genderOptions = ["male", "female"];
  const speciesOptions = ["dog", "cat", "bird", "rabbit", "reptile"];
  const ageOptions = ["baby", "young", "adult", "senior"];

  return (
    <div className="flex flex-col justify-center items-center p-4">
    <h3 className="text-center text-2xl font-bold mb-4"> Find the perfect pet</h3>
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <div className="mb-2 sm:mb-0 sm:mr-4">
        <label className="block text-lg font-semibold mb-1">
          Species:
        </label>
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={species}
          onChange={handleSpeciesChange}
        >
          <option className="text-lg font-semibold" value="">
            Select species...
          </option>
          {speciesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2 sm:mb-0">
        <label className="block text-lg font-semibold mb-1">
          Age:
        </label>
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={age} 
          onChange={handleAgeChange}
        >
          <option className="text-lg font-semibold" value="">
            Select age...
          </option>
          {ageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
            
    <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
      <div className="mb-2 sm:mb-0 sm:mr-4">
        <label className="block text-lg font-semibold mb-1">
          Gender:
        </label>
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option className="text-lg font-semibold" value="">
              He/Her
              </option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

          </select>
        </div>
        <div className="mb-2 sm:mb-0">
          <label className="block text-lg font-semibold mb-1">
            Size:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option className="text-lg font-semibold" value="">
              Select size...
            </option>
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleStartOver}
        >
          Start Over
        </button>
      </div>
    </div>
  );
};