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
        // callbackURL: "/signin/sucess", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("ctx in onRequest", ctx);
        },
        onSuccess: (ctx) => {
          console.log("ctx in onSuccess", ctx);
          alert("Sign in successful");
          router.push("/signin/sucess");
        },
        onError: (ctx) => {
          // display the error message
          console.log("ctx in onError", ctx);
          alert(ctx.error.message);
        },
      }
    );
  };

  const handleSigninWithGoogle = async () => {
    const { data, error } = await signIn.social(
      {
        /**
         * The social provider ID
         * @example "github", "google", "apple"
         */
        provider: "google",
        /**
         * A URL to redirect after the user authenticates with the provider
         * @default "/"
         */
        callbackURL: "/signin/success",
        /**
         * A URL to redirect if an error occurs during the sign in process
         */
        errorCallbackURL: "/signin/error",
        /**
         * A URL to redirect if the user is newly registered
         */
        newUserCallbackURL: "/signin/new-user",
        /**
         * disable the automatic redirect to the provider.
         * @default false
         */
        // disableRedirect: true,
      },
      {
        onRequest: (ctx) => {
          console.log("ctx in onRequest", ctx);
        },
        onSuccess: (ctx) => {
          console.log("ctx in onSuccess", ctx);
        },
        onError: (ctx) => {
          console.log("ctx in onError", ctx);
        },
      }
    );
  };

  const handleSigninWithGithub = async () => {
    const { data, error } = await signIn.social(
      {
        /**
         * The social provider ID
         * @example "github", "google", "apple"
         */
        provider: "github",
        /**
         * A URL to redirect after the user authenticates with the provider
         * @default "/"
         */
        callbackURL: "/signin/success",
        /**
         * A URL to redirect if an error occurs during the sign in process
         */
        errorCallbackURL: "/signin/error",
        /**
         * A URL to redirect if the user is newly registered
         */
        newUserCallbackURL: "/signin/new-user",
        /**
         * disable the automatic redirect to the provider.
         * @default false
         */
        // disableRedirect: true,
      },
      {
        onRequest: (ctx) => {
          console.log("ctx in onRequest", ctx);
        },
        onSuccess: (ctx) => {
          console.log("ctx in onSuccess", ctx);
        },
        onError: (ctx) => {
          console.log("ctx in onError", ctx);
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
        <button type="submit" className="px-2 bg-gray-200 rounded">
          sign in
        </button>
      </form>
      <button
        type="submit"
        className="px-2 bg-gray-200 rounded mt-2"
        onClick={handleSigninWithGoogle}
      >
        sign in with google
      </button>
      <button
        type="submit"
        className="px-2 bg-gray-200 rounded mt-2"
        onClick={handleSigninWithGithub}
      >
        sign in with github
      </button>
    </div>
  );
}
