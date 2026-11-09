import { useEffect } from "react";
import { getTelegram, getTelegramUser, initTelegram } from "@/utils/telegram";
import { useTelegramUser } from "@/store/telegramUser";

export function useInitTelegram() {
  const { setUser, setIsTelegram } = useTelegramUser();
  useEffect(() => {
    initTelegram();
    setIsTelegram(!!getTelegram());
    setUser(getTelegramUser());
  }, [setUser, setIsTelegram]);
}