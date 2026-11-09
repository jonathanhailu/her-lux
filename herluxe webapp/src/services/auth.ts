import { api } from "@/api/client";

export async function loginWithTelegram(initData: string) {
  const { data } = await api.post("/api/auth/telegram/", { init_data: initData });
  return data as { token: string; user: { id: number; first_name: string } };
}