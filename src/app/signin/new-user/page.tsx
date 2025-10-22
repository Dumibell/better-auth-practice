"use client";

import { useRouter } from "next/navigation";

export default function NewUser() {
  const router = useRouter();

  const handleNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: update username in DB
    router.push("/signin/success");
  };
  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-2xl">New User</h1>
      <form className="flex flex-col gap-2" onSubmit={handleNewUser}>
        {/* TODO: input username & submit button */}
        <input type="text" placeholder="Username" className="w-30 border" />
        <button type="submit" className="px-2 bg-gray-200 rounded mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}
