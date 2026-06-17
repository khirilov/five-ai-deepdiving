import Prism from "prismjs";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-markdown";
import { useMemo } from "react";

type CodeBlockProps = {
  code: string;
  lang?: "yaml" | "json" | "bash" | "tsx" | "ts" | "markdown" | "text";
  title?: string;
};

const langAliases: Record<string, string> = {
  ts: "typescript",
  text: "plain",
};

export function CodeBlock({ code, lang = "text", title }: CodeBlockProps) {
  const html = useMemo(() => {
    const resolved = langAliases[lang] ?? lang;
    const grammar = Prism.languages[resolved];
    if (!grammar) {
      return undefined;
    }
    return Prism.highlight(code.trim(), grammar, resolved);
  }, [code, lang]);

  return (
    <figure className="code-block">
      {title ? <figcaption className="code-title">{title}</figcaption> : null}
      <pre>
        {html ? (
          // Highlight output comes from Prism over our own static strings.
          <code dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <code>{code.trim()}</code>
        )}
      </pre>
    </figure>
  );
}
