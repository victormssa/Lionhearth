"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface DecodedToken {
  exp: number;
}

interface Credentials {
  username: string;
  password: string;
}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const navigate = useRouter();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newItem: Credentials = { username: username, password };

    try {
      const url = `https://api-lionhearth.vercel.app/users/login`;
      const response = await axios.post(url, newItem);
      const data = response.data;

      Cookies.set("token", data.token, { secure: true, expires: 1 });
      const token = Cookies.get("token");
      if (token) {
        const decodedToken: DecodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          navigate.push("/pt-br/home");
        }
      } else {
        setPassword("");
        setUsername("");
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          const { status } = axiosError.response;

          if (status === 401) {
            setErrorMessage("Usuário ou senha incorretos.");
            setErrorFields(["username", "password"]);
          } else if (status === 0) {
            setErrorMessage("Erro com o CORS.");
          } else {
            setErrorMessage(`Erro de requisição: ${status}.`);
          }
        } else {
          setErrorMessage("Erro de requisição desconhecido, cheque o suporte.");
        }
      } else {
        setErrorMessage("Erro ao fazer login.");
      }
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={login}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Username
            </Label>
            <Input
              className="text-black"
              value={username}
              id="username"
              placeholder="Nome de usuário"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="on"
              onChange={handleUsernameChange}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Senha
            </Label>
            <Input
              className="text-black"
              value={password}
              id="password"
              placeholder="Sua senha"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              onChange={handlePasswordChange}
              disabled={isLoading}
            />
          </div>
          <Button
            className="bg-red-700 hover:bg-red-600 mb-2"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
            )}
            Entrar em sua conta
          </Button>
          <div className="flex justify-center mb-0">
            {errorMessage && (
              <div className="text-[#ff3030] font-bold">{errorMessage}</div>
            )}
          </div>

          <span>
            Ainda não possuí uma conta?{" "}
            <a
              href="/pt-br/auth/sign-up"
              className="w-96 text-red-700 underline cursor-pointer hover:text-red-600 underline-offset-4 hover:text-primary"
            >
              Cadastre-se
            </a>
            .
          </span>
        </div>
      </form>
    </div>
  );
}
