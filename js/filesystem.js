/* ═══════════════════════════════════════════════════════════
   filesystem.js — Virtual filesystem simulation
   ═══════════════════════════════════════════════════════════ */

const FS = {
  "~": {
    type: "dir",
    children: {
      "about.txt":      { type: "file", content: "about" },
      "skills.txt":     { type: "file", content: "skills" },
      "projects":       { type: "dir", children: {} },
      "experience.txt": { type: "file", content: "experience" },
      "education.txt":  { type: "file", content: "education" },
      "contact.txt":    { type: "file", content: "contact" },
      ".bashrc":        { type: "file", content: "bashrc" },
      "README.md":      { type: "file", content: "readme" },
    },
  },
};

/** Populate project sub-directories from DATA.projects */
function initFilesystem() {
  DATA.projects.forEach((p) => {
    FS["~"].children["projects"].children[p.name] = {
      type: "dir",
      children: {
        "README.md": { type: "file", content: `project:${p.name}` },
      },
    };
  });
}

/** Current working directory */
let cwd = "~";

/**
 * Resolve a user-supplied path to an absolute virtual path.
 * Handles ~, /, .., and relative paths.
 */
function resolvePath(path) {
  if (path === "~" || path === "") return "~";
  if (path === "/") return "~";

  let parts;
  if (path.startsWith("~/")) {
    parts = path.slice(2).split("/").filter(Boolean);
  } else if (path.startsWith("/")) {
    parts = path.slice(1).split("/").filter(Boolean);
  } else {
    const cwdParts = cwd === "~" ? [] : cwd.slice(2).split("/").filter(Boolean);
    parts = [...cwdParts, ...path.split("/").filter(Boolean)];
  }

  // Resolve .. and .
  const resolved = [];
  for (const p of parts) {
    if (p === "..") resolved.pop();
    else if (p !== ".") resolved.push(p);
  }

  return resolved.length ? "~/" + resolved.join("/") : "~";
}

/**
 * Look up a filesystem node at the given path.
 * Returns null if the path does not exist.
 */
function getNode(path) {
  const resolved = resolvePath(path);
  if (resolved === "~") return FS["~"];

  const parts = resolved.slice(2).split("/").filter(Boolean);
  let node = FS["~"];
  for (const p of parts) {
    if (!node || node.type !== "dir" || !node.children[p]) return null;
    node = node.children[p];
  }
  return node;
}

/** Return the display string for the current working directory */
function pathDisplay() {
  return cwd;
}
