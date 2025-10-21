"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SigninSuccess() {
  const router = useRouter();
  const { signOut } = authClient;

  const handleSignout = async () => {
    const { data, error } = await signOut({
      fetchOptions: {
        onSuccess: () => {
          if (window.confirm("Are you sure you want to sign out?")) {
            router.push("/signin");
          }
        },
        onError: (ctx) => {
          console.error(ctx.error);
          alert(ctx.error.message);
        },
      },
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl">Sign in Success</h1>
        <button className="w-20 bg-gray-200 rounded" onClick={handleSignout}>
          sign out
        </button>
      </div>
    </div>
  );
}
