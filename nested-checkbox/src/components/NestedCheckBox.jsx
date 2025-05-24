import { useState } from "react";
import CheckBoxes from "./CheckBoxes";
import { checkboxesData } from "./constants/checkBoxesData";

const NestedCheckBox = () => {
  const [checked, setChecked] = useState({});
  return (
    <div>
      <CheckBoxes
        data={checkboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export default NestedCheckBox;
