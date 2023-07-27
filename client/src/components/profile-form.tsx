"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"
import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import { Pen } from 'lucide-react';
import Image from 'next/image';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username deve ter pelo menos 2 caracteres.",
    })
    .max(30, {
      message: "Username não deve ter mais que 30 caracteres.",
    }),
  email: z
    .string({
      required_error: "Por favor selecione um email como principal.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please insira um URL válido." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "",
  urls: [
    { value: "https://archei.vercel.app" },
    { value: "http://twitter.com/archeisoftware" },
  ],
}

export function ProfileForm() {
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Você inseriu os seguintes valores:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const API_URL = "https://api-lionhearth.vercel.app/users"

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.id;
          setUserId(userId);

          if (userId) {
            const config: AxiosRequestConfig = {
              headers: { Authorization: `Bearer ${token}` },
            };
            try {
              const response = await axios.get(`${API_URL}/${userId}`, config);
              const imageBuffer = response.data.profileImage.data; // obtém o buffer de imagem do response
              const blob = new Blob([new Uint8Array(imageBuffer)], {
                type: "image/*",
              }); // cria um objeto Blob a partir do buffer
              const imageUrl = URL.createObjectURL(blob); // cria um URL para o objeto Blob
              setProfileImage(imageUrl); // define a URL como a fonte da imagem
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    fetchUser();
  }, []); // Certifique-se de passar um array vazio aqui para garantir que o efeito seja executado apenas uma vez após a montagem inicial


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (profileImage !== null) {
      formData.append("profileImage", profileImage);
    }
    await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });
  };
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // You can do any processing on the selected file if needed.
      // For now, we'll just set the profile image state.
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <div className="relative">
                <Image className="object-cover w-12 h-12 rounded-full cursor-pointer hover:" onClick={() => document.getElementById('profileImageInput')?.click()} src={profileImage} src={profileImage} alt='' width={400} height={400} />
                {/* Hidden file input to trigger the file selection dialog */}
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
                {/* Edit icon */}
                <div className="absolute bottom-2 left-[0.8rem]rounded-full p-1 cursor-pointer" onClick={() => document.getElementById('profileImageInput')?.click()}>
                  <Pen className='bg-transparent text-transparent hover:text-black 'size={16} />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Nome de usuário" {...field} />
              </FormControl>
              <FormDescription>
                Esse é o seu nome de usuário, ou mais conhecido como username. Lembre-se que é com ele que você faz seu login, e ele é único.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um email principal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Você pode configurar os emails verificados dentro de{" "}
                <Link href="/examples/forms" className='text-red-700'>configurações de email</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nos conte um pouco sobre você..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Você pode <span>@mencionar</span> outros usuários e outras organizações com links para eles.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Adicione links para seu site, blog, ou perfis de mídia sociais.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Adicionar URL
          </Button>
        </div>
        <Button type="submit" className="mt-2 bg-red-700" >Atualizar Perfil</Button>
      </form>
    </Form>
  )
}