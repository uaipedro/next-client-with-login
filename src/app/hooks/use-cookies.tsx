// create a react custom hook with universal cookies

import { useState } from "react";
import Cookies from "universal-cookie";

export const useCookies = () => {
  const baseCookies = new Cookies(null, { path: "/" });

  const [cookies, setCookies] = useState<any>({});

  const setCookie = (name: string, value: string, options?: any) => {
    baseCookies.set(name, value, options);
    setCookies({ ...baseCookies });
  };

  return { cookies, setCookie };
};
