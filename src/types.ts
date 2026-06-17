import type { ReactNode } from "react";

export type DeckSlide = {
  id: string;
  section: string;
  content: ReactNode;
};
