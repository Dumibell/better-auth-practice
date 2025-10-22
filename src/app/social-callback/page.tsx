"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SocialCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const _status = searchParams.get("status");
    if (!_status) return;
    setStatus(_status);
    if (_status === "success") {
      router.replace("/signin/sucess");
    }
  }, [searchParams, router]);

  if (status === "new-user") {
    alert("New user registered");
    router.replace("/signin/sucess");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-2xl">Social Callback</h1>
    </div>
  );
}
