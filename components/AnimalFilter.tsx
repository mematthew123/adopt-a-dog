import React, { useState, ChangeEvent } from "react";

export interface FilterCriteria {
  species?: string;
  age?: string;
  gender?: string;
  size?: string;
  tags?: string;
}

interface AnimalFilterProps {
  onFilterChange: (filter: FilterCriteria) => void;
}

export const AnimalFilter = ({ onFilterChange }: AnimalFilterProps) => {
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

  const handleTagsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const tag = event.target.value;
    setTags(tag);
    onFilterChange({ tags });
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

  // const tagOptions = [
  //   "Friendly, Affectionate, Loyal, Gentle, Playful, Smart, Brave, Curious, Funny, Athletic, Loves kisses",
  // ];

  const sizeOptions = ["small", "medium", "large"];
  const genderOptions = ["male", "female"];
  const ageOptions = ["baby", "young", "adult", "senior"];

  return (
    <div className="container mx-auto">
  <div className="flex flex-col justify-center items-center p-4">
    <h3 className="text-center text-2xl font-bold mb-4">
      Find the perfect doggo
    </h3>
    <div className="flex flex-col justify-center items-center">
      <div className="sm:flex sm:flex-row sm:justify-center sm:items-center">
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
        className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleStartOver}
      >
        Start Over
      </button>
    </div>
  </div>
</div>

  );
};

export default AnimalFilter;
