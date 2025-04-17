import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
// import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError(null);

    // Simulate an API call
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h1 className="text-xl font-semibold text-black">Welcome Back</h1>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin} className="">
          <Input
            type="email"
            label="Email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            label="Password"
            id="password"
            placeholder="Minimum 8 characters"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 pt-2.5">{error}</p>}

          <button type="submit" className="btn-primary" onClick={handleLogin}>
            LOGIN
          </button>
          <p className="text-sm text-slate-600 mt-3">
            Don't have an account?
            <Link to="/signup" className="text-primary underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
