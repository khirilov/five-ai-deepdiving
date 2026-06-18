import type { ReactNode } from "react";

export type Lang = "en" | "uk";

export type LocalizedContent = Record<Lang, ReactNode>;

export type DeckSlide = {
  id: string;
  section: string;
  content: LocalizedContent;
};
