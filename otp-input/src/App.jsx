import "./App.css";
import OtpComponent from "./OtpComponent";

function App() {
  const handleOTPChange = (otp) => {
    console.log("Otp:", otp);
  };
  return (
    <>
      <OtpComponent otpChange={handleOTPChange} />
    </>
  );
}

export default App;
