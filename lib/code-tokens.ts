export type CodeTokenKind = "keyword" | "string" | "function" | "comment" | "number" | "plain";
export type CodeToken = { kind: CodeTokenKind; text: string };

const keywords = new Set([
  "import",
  "from",
  "export",
  "default",
  "const",
  "let",
  "await",
  "async",
  "function",
  "return",
  "true",
  "false",
]);

const tokenPattern =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)(?=\s*\()|(\b[A-Za-z_$][\w$]*\b)/g;

export function tokenizeCodeLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let lastIndex = 0;

  const push = (kind: CodeTokenKind, text: string) => {
    if (!text) return;
    const previous = tokens[tokens.length - 1];
    if (previous && previous.kind === kind) previous.text += text;
    else tokens.push({ kind, text });
  };

  for (const match of line.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    push("plain", line.slice(lastIndex, index));
    const [text, comment, string, number, call, word] = match;
    if (comment) push("comment", comment);
    else if (string) push("string", string);
    else if (number) push("number", number);
    else if (call) push(keywords.has(call) ? "keyword" : "function", call);
    else if (word) push(keywords.has(word) ? "keyword" : "plain", word);
    lastIndex = index + text.length;
  }

  push("plain", line.slice(lastIndex));
  return tokens;
}
