"use client";

import { authClient } from "@/lib/auth-client";
import {
  BetterAuthClientOptions,
  InferUserFromClient,
  User,
} from "better-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SigninSuccess() {
  const router = useRouter();
  const [user, setUser] =
    useState<InferUserFromClient<BetterAuthClientOptions>>();
  const { signOut, getSession, deleteUser } = authClient;

  const getUserInfo = async () => {
    const session = await getSession();
    setUser(session.data?.user);
  };

  const handleSignout = async () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;

    const { data, error } = await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
        onError: (ctx) => {
          console.error(ctx.error);
          alert(ctx.error.message);
        },
      },
    });
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    const { data, error } = await deleteUser({
      fetchOptions: {
        onSuccess: () => {
          alert("User deleted successfully");
          router.push("/signin");
        },
        onError: (ctx) => {
          console.error(ctx.error);
          alert(ctx.error.message);
        },
      },
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl">Sign in Success</h1>
        {user && (
          <div>
            <div>Name: {user?.name}</div>
            <div>Email: {user?.email}</div>
            <div>ID: {user?.id}</div>
          </div>
        )}
        <button className="px-2 bg-gray-200 rounded" onClick={handleSignout}>
          sign out
        </button>
        <button className="px-2 bg-gray-200 rounded" onClick={handleDeleteUser}>
          delete user
        </button>
      </div>
    </div>
  );
}
