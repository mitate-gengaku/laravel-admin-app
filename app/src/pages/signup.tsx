import { Box, Button, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { FormEvent, useReducer } from "react";

import cn from "../utility/cn";

import { Header } from "@/components/Header";
import { axios } from "@/lib/axios";

interface IData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

type ActionType =
  | {
      type: "name";
      value: string;
    }
  | {
      type: "email";
      value: string;
    }
  | {
      type: "password";
      value: string;
    }
  | {
      type: "password_confirmation";
      value: string;
    };

const reducer = (state: IData, action: ActionType) => {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.value,
      };
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
    case "password_confirmation":
      return {
        ...state,
        password_confirmation: action.value,
      };
    default:
      return {
        ...state,
      };
  }
};

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const router = useRouter();
  const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/api/register", state);
      if (response.status === 201) {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      <Header />
      <main className="p-6">
        <form className={cn("flex flex-col gap-4")} onSubmit={onSignUp}>
          <h2 className={cn("text-2xl")}>サインアップ</h2>
          <Box>
            <Text as="label" size="1" htmlFor="name" className="text-gray-400">
              ユーザー名
            </Text>
            <TextField.Root>
              <TextField.Input
                id="name"
                name="name"
                type="name"
                className={cn("w-full py-1")}
                onChange={(e) =>
                  dispatch({ type: "name", value: e.target.value })
                }
                autoComplete="name"
                placeholder="Name"
              />
            </TextField.Root>
          </Box>
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
            <Text as="label" size="1" htmlFor="email" className="text-gray-400">
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
          <Box>
            <Text
              as="label"
              size="1"
              htmlFor="password_confirmation"
              className="text-gray-400"
            >
              パスワード(再確認)
            </Text>
            <TextField.Root>
              <TextField.Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                className={cn("w-full py-1")}
                placeholder="Password Confirmation"
                onChange={(e) =>
                  dispatch({
                    type: "password_confirmation",
                    value: e.target.value,
                  })
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
            サインアップ
          </Button>
        </form>
      </main>
    </Box>
  );
};

export default SignUp;
