"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast-provider";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        throw new Error("Logout failed");
      }

      toast({ title: "Logged out", variant: "success" });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "Could not log out",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
}
