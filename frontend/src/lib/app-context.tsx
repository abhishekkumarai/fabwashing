"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Lang, translate } from "./i18n";

type AppState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  branch: string; // branch code or "ALL"
  setBranch: (b: string) => void;
  authed: boolean;
  signIn: () => void;
  signOut: () => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [branch, setBranchState] = useState<string>("ALL");
  const [authed, setAuthed] = useState<boolean>(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLangState((localStorage.getItem("lang") as Lang) || "en");
    setBranchState(localStorage.getItem("branch") || "ALL");
    setAuthed(localStorage.getItem("authed") === "1");
    setReady(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  const setBranch = (b: string) => {
    setBranchState(b);
    localStorage.setItem("branch", b);
  };
  const signIn = () => {
    setAuthed(true);
    localStorage.setItem("authed", "1");
  };
  const signOut = () => {
    setAuthed(false);
    localStorage.removeItem("authed");
  };

  const t = (key: string) => translate(key, lang);

  const value: AppState = { lang, setLang, t, branch, setBranch, authed, signIn, signOut };

  // Avoid hydration flash before localStorage is read.
  if (!ready) return null;

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
