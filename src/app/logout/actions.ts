"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function logout() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error && error.message !== "No active session") {
      console.error("Supabase logout error:", error.message);
      redirect("/error");
    }
  } catch (err) {
    console.error("Unexpected logout error:", err);
    redirect("/error");
  }

  revalidatePath("/login");
  redirect("/login");
}
