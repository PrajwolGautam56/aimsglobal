import Link from "next/link";
import type React from "react";

function renderInline(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const href = match[2];
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a key={i} href={href} className="text-primary-light underline" target="_blank" rel="noopener noreferrer">
            {match[1]}
          </a>
        );
      }
      return (
        <Link key={i} href={href} className="text-primary-light underline">
          {match[1]}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let inBlockquote = false;
  let blockquoteLines: string[] = [];

  function flushList() {
    if (listItems.length) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-4 list-disc space-y-2 pl-6 text-text-primary">
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  function flushBlockquote() {
    if (blockquoteLines.length) {
      elements.push(
        <blockquote
          key={`bq-${elements.length}`}
          className="my-6 rounded-xl border-l-4 border-accent bg-accent/5 p-4 text-text-primary"
        >
          {blockquoteLines.map((line, i) => (
            <p key={i}>{renderInline(line.replace(/^>\s*/, ""))}</p>
          ))}
        </blockquote>
      );
      blockquoteLines = [];
      inBlockquote = false;
    }
  }

  for (const line of lines) {
    if (line.startsWith("> ")) {
      flushList();
      inBlockquote = true;
      blockquoteLines.push(line);
      continue;
    }
    if (inBlockquote && line.trim() === "") {
      flushBlockquote();
      continue;
    }
    if (inBlockquote) {
      flushBlockquote();
    }

    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="mb-3 mt-8 text-xl font-bold text-text-primary">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="mb-4 mt-10 text-2xl font-bold text-text-primary">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={elements.length} className="mb-6 text-3xl font-bold text-text-primary sm:text-4xl">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.startsWith("---")) {
      flushList();
      elements.push(<hr key={elements.length} className="my-8 border-border" />);
    } else if (line.trim()) {
      flushList();
      elements.push(
        <p key={elements.length} className="mb-4 leading-relaxed text-text-primary">
          {renderInline(line)}
        </p>
      );
    }
  }

  flushList();
  flushBlockquote();

  return <article className="prose-custom">{elements}</article>;
}
