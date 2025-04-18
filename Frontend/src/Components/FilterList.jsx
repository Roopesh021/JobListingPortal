import { RadioGroup } from "@/Components/ui/radio-group";
import Filter from "./Filter";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Store/user-store";
const FilterList = () => {
  const { setSearchedQuery } = useContext(UserContext);

  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune"],
    },
    {
      filterType: "Industry",
      array: [
        "Frontend Developer",
        "BackendDeveloper",
        "Full Stack Developer",
        "Data Analyst",
      ],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "42k-1Lakh", "1Lakh-5Lakh"],
    },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log(selectedValue);
    setSearchedQuery(selectedValue);
  }, [selectedValue]);
  return (
    <>
      <div className="filter-bar">
        <h2 className="filter-bar-title">
          <AiOutlineMenuUnfold />
          Filter By
        </h2>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <Filter data={data} index={index}></Filter>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};
export default FilterList;
