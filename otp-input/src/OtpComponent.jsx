import { useEffect, useRef, useState } from "react";
import "./App.css";

const OTP_BOX_COUNT = 5;
const OtpComponent = () => {
  const [inputArr, setInputArr] = useState(new Array(OTP_BOX_COUNT).fill(""));
  const refArr = useRef([]);
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);
  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newInputArr = [...inputArr];
    const trimmedValue = value.trim();
    newInputArr[index] = trimmedValue.slice(-1);
    setInputArr(newInputArr);
    value && refArr.current[index + 1]?.focus();
  };
  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    } else if (e.target.value && e.key === "ArrowRight") {
      refArr.current[index + 1]?.focus();
    } else if (e.target.value && e.key === "ArrowLeft") {
      refArr.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>Validate OTP</h1>
      {inputArr.map((input, index) => {
        return (
          <input
            className="otp-input"
            key={index}
            ref={(input) => (refArr.current[index] = input)}
            type="text"
            value={inputArr[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};

export default OtpComponent;
