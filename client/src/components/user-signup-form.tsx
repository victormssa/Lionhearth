"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ErrorResponse {
  error: string;
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useRouter();
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState<Date | string>("");
  const [bios, setBios] = useState("");
  const [status, setStatus] = useState("");
  const [acceptedNews, setAcceptedNews] = useState<boolean>(false);
  const [permission, setPermission] = useState("");
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const API_URL = "https://api-lionhearth.vercel.app/users/signup";

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
    } else {
      setError("");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedBirthDate = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
    setIsLoading(true);
    console.log("formattedBirthDate:", formattedBirthDate);
  console.log("acceptedNews:", acceptedNews);

    try {
      const newItem = {
        username,
        fullname: null,
        email,
        birthDate: formattedBirthDate.toISOString(),
        cellphone: null,
        password,
        permission,
        status,
        bios,
        acceptedNews: Boolean(acceptedNews),
      };
      const formData = new FormData();
      formData.append("profileImage", "");
      formData.append("username", newItem.username);
      formData.append("fullname", "");
      formData.append("email", newItem.email);
      formData.append("birthDate", newItem.birthDate);
      formData.append("cellphone", "");
      formData.append("password", newItem.password);
      formData.append("permission", "Player");
      formData.append("bios", "");
      formData.append("status", "Offline");
      formData.append("acceptedNews", newItem.acceptedNews.toString());

      await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Usuário criado com sucesso, enviando você para o login.");

      setTimeout(() => {
        navigate.push("/pt-br/auth/login");
      }, 6000);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (err: unknown) {
      const errorResponse = (err as ErrorResponse).error;
      setError(errorResponse ?? "An error occurred.");
      toast.error("Ocorreu um erro ao criar o usuário.");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 16);
    return minDate.toISOString().split("T")[0];
  };

  const avatarSrc = profileImage ? URL.createObjectURL(profileImage) : "";

  return (
    <>
      <ToastContainer />
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit}>
          <span className="border-b-4 border-red-700"></span>
          <div className="grid gap-2 mt-5">
            <section className="grid grid-cols-2 gap-2">
              <div className="grid gap-1">
                <Label className="text-white sr-only" htmlFor="email">
                  Username
                </Label>
                <p className="text-white">Seu nome de usuário</p>
                <Input
                  onChange={(event) => setUsername(event.target.value)}
                  id="username"
                  placeholder="Nome de usuário"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect="off"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-white sr-only" htmlFor="email">
                  Email
                </Label>
                <p className="text-white">Seu e-mail</p>
                <Input
                  onChange={(event) => setEmail(event.target.value)}
                  id="email"
                  placeholder="nome@exemplo.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-white sr-only" htmlFor="email">
                  Senha
                </Label>
                <p className="text-white">Sua senha</p>
                <Input
                  onChange={handlePasswordChange}
                  id="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-white sr-only" htmlFor="email">
                  Sua data de aniversário
                </Label>
                <p className="text-white">Sua data de nascimento</p>
                <Input
                  onChange={(event) => setBirthDate(event.target.value)}
                  id="date"
                  placeholder="Confirme a sua idade"
                  type="date"
                  autoCapitalize="none"
                  autoComplete="date"
                  autoCorrect="off"
                  required
                  disabled={isLoading}
                  max={getMinDate()}
                />
              </div>
            </section>
            <Button
              className="bg-red-700 hover:bg-red-600"
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
              )}
              Cadastre-se e parta para a Aventura!
            </Button>
            <div className="flex items-center mt-2">
              <Label className="text-white sr-only" htmlFor="email">
                Aceita receber noticías?
              </Label>
              <Input
                onChange={(event) => setAcceptedNews(event.target.checked)} // Convert the checked value to boolean
                id="news"
                className="mr-2 w-4 h-4 cursor-pointer accent-red-600"
                placeholder="Confirme a sua senha"
                type="checkbox"
                checked={acceptedNews} // Use 'checked' prop instead of 'value'
                autoCapitalize="none"
                autoComplete="news"
                autoCorrect="off"
                disabled={isLoading}
              />
              <p className="w-96 text-white">
                Aceito receber notícias sobre a Lionhearth.
              </p>
            </div>
            <div className="flex justify-center mb-0">
              {error && <div className="text-[#ff3030] font-bold">{error}</div>}
            </div>
            <span className="text-white">
              Já possuí uma conta?{" "}
              <a
                href="login"
                className="w-96 text-red-700 underline cursor-pointer hover:text-red-600 underline-offset-4 hover:text-primary"
              >
                Faça Login
              </a>
              .
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
