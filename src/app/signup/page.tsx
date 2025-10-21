"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Info {
  email: string;
  password: string;
  name: string;
}

export default function SignUp() {
  const router = useRouter();
  const { signUp } = authClient;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await signUp.email(
      {
        email,
        password, // user password -> min 8 characters by default
        name, // user display nam
        // callbackURL: "/email-verified", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading

          console.log("ctx in onRequest", ctx);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log("ctx in onSuccess", ctx);
          alert("Sign up successful");
          router.push("/signup-success");
        },
        onError: (ctx) => {
          // when email verification is required
          if (ctx.error.status === 403) {
            alert("Please verify your email address");
          }
          // display the error message
          console.log("ctx in onError", ctx);
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-2xl mb-3">SIGN UP</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSignup}>
        <div className="flex gap-2">
          <label>email</label>
          <input
            type="email"
            value={email}
            className="w-30 border"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label>password</label>
          <input
            type="password"
            value={password}
            className="w-30 border"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label>name</label>
          <input
            value={name}
            className="w-30 border"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="w-16 bg-gray-200 rounded">
          sign up
        </button>
      </form>
    </div>
  );
}
