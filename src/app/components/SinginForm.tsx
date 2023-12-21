"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SinginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError("");
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }
    fetch("/api/singin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          return data;
        } else {
          throw new Error(data.message);
        }
      })
      .then((data) => {
        setSuccessMessage("Account created successfully");
        router.push("/login");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setSignupError(err.message);
      });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <h2>Sing Up</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        {signupError && <div className="error">{signupError}</div>}
        <button type="submit" role="primary">
          Sign Up
        </button>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SinginForm;
