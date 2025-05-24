import { useEffect, useRef, useState } from "react";
import "./App.css";

const OTP_BOX_COUNT = 5;
const OtpComponent = ({ otpChange }) => {
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
    if (newInputArr.every((digit) => digit !== "")) {
      otpChange(newInputArr.join(""));
    }
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
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\s/g, "")
      .slice(0, OTP_BOX_COUNT);
    if (!pastedData) return;
    const newOTP = [...inputArr];
    for (let i = 0; i < pastedData.length; i++) {
      newOTP[i] = pastedData[i];
      if (refArr.current[i]) {
        refArr.current[i].value = pastedData[i];
      }
    }
    setInputArr(newOTP);
    if (newOTP.every((digit) => digit !== "")) {
      otpChange(newOTP.join(""));
    }
    const nextFocus = Math.min(pastedData.length, OTP_BOX_COUNT - 1);
    refArr.current[nextFocus]?.focus();
  };
  return (
    <div className="App" onPaste={handlePaste}>
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
