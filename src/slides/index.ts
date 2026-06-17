import type { DeckSlide } from "../types";
import { agentsSlides } from "./agents";
import { hooksSlides } from "./hooks";
import { introSlides } from "./intro";
import { mcpSlides } from "./mcp";
import { outroSlides } from "./outro";
import { skillsSlides } from "./skills";
import { tokensSlides } from "./tokens";

export const deck: DeckSlide[] = [
  ...introSlides,
  ...skillsSlides,
  ...agentsSlides,
  ...hooksSlides,
  ...tokensSlides,
  ...mcpSlides,
  ...outroSlides,
];
