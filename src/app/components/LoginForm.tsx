"use client";
import React, { useState } from "react";
import { ImageFooter } from "./ImageFooter";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const [loginError, setLoginError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your login logic here
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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
        setIsLoggedIn(true);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setLoginError(err.message);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <h2>Bem vinde, {email}!</h2>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      ) : (
        <div className="form-wrapper">
          <div className={email.includes("pedro") ? "kira" : "kira hide"}>
            <img src="/images/avatar/kira.png" alt="avatar kira" />
          </div>
          <div className={email.includes("mari") ? "zeca" : "zeca hide"}>
            <img src="/images/avatar/zeca.png" alt="avatar zeca" />
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div>
              <h2>Login</h2>
            </div>
            <div>
              <input
                type="email"
                placeholder="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setFocus("email")}
                onBlur={() => setFocus(null)}
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
                onFocus={() => setFocus("password")}
                onBlur={() => setFocus(null)}
                required
              />
            </div>

            {loginError && <div className="error">{loginError}</div>}

            <button type="submit" role="primary">
              Login
            </button>
          </form>
          <div>
            <Link href="/singin">create new account</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
