"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useCookies } from "../hooks/use-cookies";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const [loginError, setLoginError] = useState("");
  const [token, setToken] = useState<string | null>(null); // Estado local para armazenar o token

  const { cookies, setCookie } = useCookies();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");
    // Add your login logic here
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
        setCookie("token", data.access_token);
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
        <div className="form-wrapper">
          <h2>Bem vinde, {username}!</h2>
          <h3>{cookies.token}</h3>
          <Link href="/todos">Vá para a tela de tarefas</Link>
        </div>
      ) : (
        <div className="form-wrapper">
          <div className={username.includes("pedro") ? "kira" : "kira hide"}>
            <img src="/images/avatar/kira.png" alt="avatar kira" />
          </div>
          <div className={username.includes("mari") ? "zeca" : "zeca hide"}>
            <img src="/images/avatar/zeca.png" alt="avatar zeca" />
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div>
              <h2>Login</h2>
            </div>
            <div>
              <input
                type="text"
                placeholder="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                onFocus={() => setFocus("username")}
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
            <div>
              <Link href="/singin">Sing Up</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
