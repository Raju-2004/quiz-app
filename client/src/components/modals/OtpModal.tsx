import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/AppStore";
import { setVerify } from "../../store/VerifySlice";
import { setLoad } from "../../store/LoadSlice";
interface Props {
  closeModal: () => void;
  openNewModal: () => void;
  openSuccessModal: () => void;
  setData: (data: any[]) => void;
}
const OtpModal = ({
  closeModal,
  openNewModal,
  openSuccessModal,
  setData,
}: Props) => {

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const dispatch = useAppDispatch();
  const Email = useAppSelector((state) => state.email.email);
  console.log(Email);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();
  const onHandleSubmit = () => {  
    let otp = "";
    inputRefs.current.forEach((input) => {
      otp += input?.value || "";
    });
    console.log(otp);
    console.log(Email);

    fetch(serverUrl+"verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: Email, otp: otp }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "OTP verified successfully") {
          closeModal();
          console.log(location.pathname);
          if (location.pathname === "/auth/signup") {
            dispatch(setVerify({ isVerify: true }));
            setData(["email", "verified"]);
            openSuccessModal();
          } else if (location.pathname === "/auth/signin") {
            openNewModal();
          }
        } else {
          setErrorMessage(data.error || "Error verifying OTP");
        }
      })
      .catch((error) => {
        console.error("Error Verifying otp:", error);
        setErrorMessage("Error verifying OTP");
      });
  };
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const keyCode = event.keyCode || event.which;
    const isNumericKey =
      (keyCode >= 48 && keyCode <= 57) || // Regular number keys
      (keyCode >= 96 && keyCode <= 105);   // Numpad number keys
    const isBackspaceKey = keyCode === 8 || keyCode === 46;
  
    if (!isNumericKey && !isBackspaceKey) {
      event.preventDefault();
      setErrorMessage("Please enter only numeric values.");
      return;
    } else {
      setErrorMessage("");
    }
  
    if (isNumericKey) {
      const value = String.fromCharCode(keyCode >= 96 ? keyCode - 48 : keyCode);
      event.preventDefault();
  
      inputRefs.current[index]?.focus();
      inputRefs.current[index]?.setAttribute("value", value);
      inputRefs.current[index]?.dispatchEvent(
        new Event("input", { bubbles: true })
      );
  
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (isBackspaceKey) {
      event.preventDefault();
  
      if (index >= 0) {
        inputRefs.current[index]?.blur();
        inputRefs.current[index]?.setAttribute("value", "");
        inputRefs.current[index]?.dispatchEvent(
          new Event("input", { bubbles: true })
        );
  
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-10 px-8 w-[435px] h-[312px] rounded-lg">
        <h2 className="text-2xl font-bold text-indigo">OTP VERIFICATION</h2>
        <p className="font-medium text-lg mb-3 text-gray-400">
          Enter 4 digit one time password
        </p>
        <div className={`flex justify-between items-center w-96 px-8 my-6`}>
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className="w-14 h-14 p-4 text-1xl text-center bg-light_gray focus:outline-none"
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
          ))}
        </div>
        {errorMessage && (
          <span className="text-red-500 text-center ml-8 pb-3">
            {errorMessage}
          </span>
        )}
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="w-44 h-12  flex justify-center items-center  hover:bg-indigo bg-light_gray hover:text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onHandleSubmit}
            className="w-44 h-12  flex justify-center items-center  hover:bg-indigo bg-light_gray hover:text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
