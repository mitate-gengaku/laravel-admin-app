import { Box, Button, Text, TextField } from "@radix-ui/themes";
import Axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useReducer } from "react";
import { toast } from "sonner";

import cn from "../utility/cn";

import { Header } from "@/components/Header";
import { axios } from "@/lib/axios";

interface IData {
  email: string;
  password: string;
}

type ActionType =
  | {
      type: "email";
      value: string;
    }
  | {
      type: "password";
      value: string;
    };

const reducer = (state: IData, action: ActionType) => {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: action.value,
      };
    case "password":
      return {
        ...state,
        password: action.value,
      };
    default:
      return {
        ...state,
      };
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
  });

  const router = useRouter();
  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/api/login", state);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (e) {
      if (Axios.isAxiosError(e)) {
        toast.error("あなたのアカウントは利用停止になっています。");
      }
      console.error(e);
    }
  };

  return (
    <Box>
      <Header />
      <main className="p-6">
        <form className={cn("flex flex-col gap-4")} onSubmit={onLogin}>
          <h2 className={cn("text-2xl")}>ログイン</h2>
          <Box>
            <Text as="label" size="1" htmlFor="email" className="text-gray-400">
              Eメール
            </Text>
            <TextField.Root>
              <TextField.Input
                id="email"
                name="email"
                type="email"
                className={cn("w-full py-1")}
                onChange={(e) =>
                  dispatch({ type: "email", value: e.target.value })
                }
                autoComplete="email"
                placeholder="Email"
              />
            </TextField.Root>
          </Box>
          <Box>
            <Text
              as="label"
              size="1"
              htmlFor="password"
              className="text-gray-400"
            >
              パスワード
            </Text>
            <TextField.Root>
              <TextField.Input
                id="password"
                name="password"
                type="password"
                className={cn("w-full py-1")}
                placeholder="Password"
                onChange={(e) =>
                  dispatch({ type: "password", value: e.target.value })
                }
              />
            </TextField.Root>
          </Box>
          <Button
            type="submit"
            color="sky"
            variant="solid"
            size="2"
            className="cursor-pointer bg-sky-500 text-gray-100 transition hover:bg-sky-600"
          >
            ログイン
          </Button>
        </form>
      </main>
    </Box>
  );
};

export default Login;
