"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Info {
  email: string;
  password: string;
  name: string;
}

export default function SignIn() {
  const router = useRouter();
  const { signIn } = authClient;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await signIn.email(
      {
        email,
        password, // user password -> min 8 characters by default
        // callbackURL: "/signin-success", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading

          console.log("ctx in onRequest", ctx);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log("ctx in onSuccess", ctx);
          alert("Sign in successful");
          router.push("/signin-success");
        },
        onError: (ctx) => {
          // display the error message
          console.log("ctx in onError", ctx);
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-2xl mb-3">SIGN IN</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSignin}>
        <div className="flex gap-2">
          <label>email</label>
          <input
            className="w-30 border"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label>password</label>
          <input
            className="w-30 border"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-16 bg-gray-200 rounded">
          sign in
        </button>
      </form>
    </div>
  );
}
