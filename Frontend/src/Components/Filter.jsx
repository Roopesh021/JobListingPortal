import { Label } from "@/Components/ui/label";
import { RadioGroupItem } from "@/Components/ui/radio-group";
import "./Filter.css";
import { IoMdArrowDropdown } from "react-icons/io";
const Filter = ({ data, index }) => {
  return (
    <>
      <div className="filter-container">
        <h3>{data.filterType}</h3>
        <IoMdArrowDropdown />
      </div>
      <div className="filter-options">
        {data.array.map((item, idx) => {
          const itemId = `id${index} - ${idx}`;
          return (
            <div className="filter-option">
              <RadioGroupItem type="radio" value={item} id={itemId} />
              <Label htmlFor={itemId}>{item}</Label>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Filter;
