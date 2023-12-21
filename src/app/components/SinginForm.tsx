"use client";
import Link from "next/link";
import React, { useState } from "react";

const SinginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

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
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }
    // Add your signup logic here
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <h2>Sing In</h2>
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
      </form>
      <div>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default SinginForm;
