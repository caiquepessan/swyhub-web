"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <button 
      onClick={handleSignOut}
      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  );
}
