import { useCallback, useEffect, useState } from "react";
import { deck } from "./slides";

function readSlideFromHash(total: number): number {
  const parsed = Number(window.location.hash.replace(/^#\/?/, ""));
  if (Number.isInteger(parsed) && parsed >= 1 && parsed <= total) {
    return parsed - 1;
  }
  return 0;
}

function useDeckNavigation(total: number) {
  const [index, setIndex] = useState(() => readSlideFromHash(total));

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setIndex(clamped);
      window.location.hash = `/${clamped + 1}`;
    },
    [total],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          event.preventDefault();
          setIndex((current) => {
            const next = Math.min(total - 1, current + 1);
            window.location.hash = `/${next + 1}`;
            return next;
          });
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          setIndex((current) => {
            const next = Math.max(0, current - 1);
            window.location.hash = `/${next + 1}`;
            return next;
          });
          break;
        case "Home":
          event.preventDefault();
          setIndex(0);
          window.location.hash = "/1";
          break;
        case "End":
          event.preventDefault();
          setIndex(total - 1);
          window.location.hash = `/${total}`;
          break;
      }
    }

    function handleHashChange() {
      setIndex(readSlideFromHash(total));
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [total]);

  return { index, goTo };
}

export function App() {
  const { index, goTo } = useDeckNavigation(deck.length);
  const slide = deck[index];

  return (
    <div className="deck">
      <div
        className="deck-progress"
        style={{ width: `${((index + 1) / deck.length) * 100}%` }}
      />
      <main key={slide.id} className="slide">
        {slide.content}
      </main>
      <footer className="deck-footer">
        <span className="deck-section">{slide.section}</span>
        <span className="deck-controls">
          <button type="button" onClick={() => goTo(0)} aria-label="Restart deck">
            ⤒
          </button>
          <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous slide">
            ←
          </button>
          <span className="deck-counter">
            {index + 1} / {deck.length}
          </span>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="Next slide">
            →
          </button>
        </span>
      </footer>
    </div>
  );
}
