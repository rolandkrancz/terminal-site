/* ═══════════════════════════════════════════════════════════
   terminal.js — Terminal UI engine (input, history, output)
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── DOM References ──────────────────────────────────────
  const outputEl = document.getElementById("output");
  const inputEl  = document.getElementById("input");
  const termBody = document.getElementById("terminal");

  // ── Initialise ──────────────────────────────────────────
  initFilesystem();

  // ── Helpers ─────────────────────────────────────────────
  function updatePrompt() {
    document.getElementById("prompt-path").textContent = pathDisplay();
  }
  // Expose globally so commands.js (cd) can call it
  window.updatePrompt = updatePrompt;

  function appendOutput(html) {
    if (html === null) return; // clear case
    const div = document.createElement("div");
    div.className = "output-line";
    div.innerHTML = html;
    outputEl.appendChild(div);
  }

  function echoPrompt(cmd) {
    const html =
      `<span class="prompt-label">roland@dev</span> ` +
      `<span class="prompt-path">${esc(pathDisplay())}</span> ` +
      `<span class="prompt-symbol">$</span> ${span(cmd, "")}`;
    appendOutput(html);
  }

  // ── Welcome Message ─────────────────────────────────────
  appendOutput(renderWelcome());

  // ── Available Commands (for tab-complete) ───────────────
  const COMMANDS = [
    "help", "about", "skills", "projects", "experience", "education",
    "contact", "whoami", "date", "uname", "pwd", "ls",
    "cd", "cat", "tree", "clear", "history", "grep", "exit", "echo",
    "ping", "git", "sudo", "curl",
  ];

  // ── Key Handler ─────────────────────────────────────────
  inputEl.addEventListener("keydown", (e) => {
    // ── Enter: execute command ───────────────────────────
    if (e.key === "Enter") {
      const cmd = inputEl.value;
      echoPrompt(cmd);
      const result = processCommand(cmd);
      if (result !== null && result !== "") appendOutput(result);
      inputEl.value = "";
      termBody.scrollTop = termBody.scrollHeight;
      return;
    }

    // ── Arrow Up: previous history ──────────────────────
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputEl.value = commandHistory[historyIndex];
      }
      return;
    }

    // ── Arrow Down: next history ────────────────────────
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputEl.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputEl.value = "";
      }
      return;
    }

    // ── Tab: auto-complete ──────────────────────────────
    if (e.key === "Tab") {
      e.preventDefault();
      const val = inputEl.value;
      const parts = val.split(/\s+/);
      const last = parts[parts.length - 1];

      if (parts.length === 1) {
        // Command completion
        const matches = COMMANDS.filter((c) => c.startsWith(last));
        if (matches.length === 1) {
          inputEl.value = matches[0] + " ";
        }
      } else {
        // Path completion
        const dirPath = last.includes("/")
          ? last.slice(0, last.lastIndexOf("/") + 1)
          : "";
        const prefix = last.includes("/")
          ? last.slice(last.lastIndexOf("/") + 1)
          : last;
        const targetDir = dirPath ? resolvePath(dirPath) : cwd;
        const node = getNode(targetDir);

        if (node && node.type === "dir") {
          const matches = Object.keys(node.children).filter((n) =>
            n.startsWith(prefix)
          );
          if (matches.length === 1) {
            const match = matches[0];
            const child = node.children[match];
            parts[parts.length - 1] =
              dirPath + match + (child.type === "dir" ? "/" : "");
            inputEl.value = parts.join(" ");
          }
        }
      }
    }
  });

  // ── Focus input on click anywhere ─────────────────────
  document.addEventListener("click", () => inputEl.focus());
  inputEl.focus();
})();
