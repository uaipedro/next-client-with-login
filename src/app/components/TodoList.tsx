// react main component todo list fetch from api

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useCookies } from "../hooks/use-cookies";
import { useRouter } from "next/navigation";

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null); // Estado local para armazenar o token

  const { cookies, setCookie } = useCookies();
  const router = useRouter();
  console.log(cookies.token);

  useEffect(() => {
    fetch("/api/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
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
        setTodos(data?.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Todo List</h1>
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} | {todo.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Lista vazia...</p>
      )}
      <button
        onClick={() => {
          setCookie("token", "");
          router.push("/login");
        }}
      >
        Logout
      </button>
    </>
  );
};
