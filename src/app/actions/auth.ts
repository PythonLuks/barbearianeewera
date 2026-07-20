"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(password: string) {
  // Simple mock password for development
  if (password === "admin123") {
    (await cookies()).set("admin_session", "true", { httpOnly: true, path: "/" });
    redirect("/admin");
  } else {
    throw new Error("Senha incorreta");
  }
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/login");
}

export async function checkAuth() {
  const session = (await cookies()).get("admin_session");
  if (!session || session.value !== "true") {
    redirect("/login");
  }
}
