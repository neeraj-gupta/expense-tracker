import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Input = ({ type, value, onChange, placeholder, label, className }) => {
  const [showPassword, setShowPassword] = useState(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={className}>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full bg-transparent outline-none"
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-primary cursor-pointer"
                onClick={handleTogglePassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-slate-400 cursor-pointer"
                onClick={handleTogglePassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
