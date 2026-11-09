import { create } from "zustand";

type TgUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
} | null;

type State = {
  user: TgUser;
  isTelegram: boolean;
  setUser: (u: TgUser) => void;
  setIsTelegram: (v: boolean) => void;
};

export const useTelegramUser = create<State>((set) => ({
  user: null,
  isTelegram: false,
  setUser: (user) => set({ user }),
  setIsTelegram: (isTelegram) => set({ isTelegram }),
}));