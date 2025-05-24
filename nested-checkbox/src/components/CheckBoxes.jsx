import "../App.css";
import { checkboxesData } from "./constants/checkBoxesData";

const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };
      //if children are present, need to add them to new state or if parent is checked all the childre should be checked
      const updateChildren = (node) => {
        node.children?.map((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(node);
      //if all children are checked then check parent
      const verifyChild = (node) => {
        if (!node.children) return newState[node.id] || false;
        const allChildrenChecked = node.children.every(
          (child) => newState[child.id]
        );
        node.children.map((child) => verifyChild(child));
        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };
      checkboxesData.forEach((node) => verifyChild(node));

      return newState;
    });
  };
  return (
    <div>
      {data.map((node) => {
        return (
          <div key={node.id} className="parent">
            <input
              type="checkbox"
              checked={checked[node.id] || false}
              onChange={(e) => handleChange(e.target.checked, node)}
            />
            <span>{node.label}</span>
            {node.children && (
              <CheckBoxes
                data={node.children}
                checked={checked}
                setChecked={setChecked}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckBoxes;
