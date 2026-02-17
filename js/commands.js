/* ═══════════════════════════════════════════════════════════
   commands.js — Rendering helpers & command processor
   ═══════════════════════════════════════════════════════════ */

// ── Rendering Helpers ───────────────────────────────────────

/** Wrap text in a <span> with optional CSS classes, HTML-escaped. */
function span(text, cls = "") {
  return cls ? `<span class="${cls}">${esc(text)}</span>` : esc(text);
}

/** Escape HTML special characters. */
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Section Renderers ───────────────────────────────────────

function renderWelcome() {
  return `
${span("Hi, I'm Roland, a Software and DevOps Engineer.", "c-green")}
${span("Welcome to my website!", "c-green")}
${span("Type", "c-muted")} ${span("help", "c-cyan")} ${span("to see available commands.", "c-muted")}
${span("Type", "c-muted")} ${span("ls", "c-cyan")} ${span("to explore files, or", "c-muted")} ${span("cat <file>", "c-cyan")} ${span("to read them.", "c-muted")}
`;
}

function renderHelp() {
  return `
${span("Available Commands", "c-cyan c-bold section-heading")}

${span("Navigation", "c-yellow c-bold")}
  ${span("ls", "c-green")}  ${span("[path]", "c-muted")}          List directory contents
  ${span("cd", "c-green")}  ${span("<dir>", "c-muted")}           Change directory
  ${span("cat", "c-green")} ${span("<file>", "c-muted")}          Display file contents
  ${span("pwd", "c-green")}                 Print working directory
  ${span("tree", "c-green")}                Show directory tree

${span("Quick Access", "c-yellow c-bold")}
  ${span("about", "c-green")}               About me
  ${span("skills", "c-green")}              Technical skills
  ${span("projects", "c-green")}            Featured projects
  ${span("experience", "c-green")}          Work experience
  ${span("education", "c-green")}           Education
  ${span("contact", "c-green")}             Contact info

${span("Info", "c-yellow c-bold")}
  ${span("whoami", "c-green")}              Who am I?
  ${span("date", "c-green")}                Current date
  ${span("uname -a", "c-green")}            System info
  ${span("echo", "c-green")}  ${span("<text>", "c-muted")}          Print text

${span("Search", "c-yellow c-bold")}
  ${span("history", "c-green")}             Command history

${span("Session", "c-yellow c-bold")}
  ${span("clear", "c-green")}               Clear terminal
  ${span("help", "c-green")}                Show this help
`;
}

function renderAbout() {
  return `
${span("cat ~/about.txt", "c-muted")}

${span(`  ╭── ${DATA.name} ──╮`, "c-cyan c-bold")}

${DATA.about.map((l) => "  " + span(l, "")).join("\n")}

${span(`  ╰${"─".repeat(DATA.name.length + 6)}╯`, "c-cyan")}
`;
}

function renderSkills() {
  let out = `\n${span("cat ~/skills.txt", "c-muted")}\n\n`;
  for (const [cat, items] of Object.entries(DATA.skills)) {
    out += `  ${span(cat, "c-yellow c-bold")}\n`;
    out += `  ${items.map((i) => span(i, "c-green")).join(span(" · ", "c-muted"))}\n\n`;
  }
  return out;
}

function renderProjects() {
  let out = `\n${span("ls ~/projects/", "c-muted")}\n\n`;
  DATA.projects.forEach((p, i) => {
    out += `  ${span("📁 " + p.name, "c-cyan c-bold")}\n`;
    out += `     ${span(p.desc, "")}\n`;
    out += `     ${span("Tech:", "c-yellow")} ${span(p.tech, "c-muted")}\n`;
    out += `     ${span("Link:", "c-yellow")} <a href="${esc(p.url)}" target="_blank">${esc(p.url)}</a>\n`;
    if (i < DATA.projects.length - 1) out += "\n";
  });
  return out;
}

function renderProject(name) {
  const p = DATA.projects.find((pr) => pr.name === name);
  if (!p) return span(`cat: ${name}/README.md: No such file`, "c-red");
  return `
${span("# " + p.name, "c-cyan c-bold")}

${span(p.desc, "")}

${span("Tech Stack:", "c-yellow")} ${span(p.tech, "")}
${span("Repository:", "c-yellow")} <a href="${esc(p.url)}" target="_blank">${esc(p.url)}</a>
`;
}

function renderExperience() {
  let out = `\n${span("cat ~/experience.txt", "c-muted")}\n\n`;
  DATA.experience.forEach((e, i) => {
    out += `  ${span(e.role, "c-green c-bold")} ${span("@", "c-muted")} ${span(e.company, "c-cyan c-bold")}\n`;
    out += `  ${span(e.period, "c-yellow")}\n`;
    e.details.forEach((d) => {
      out += `  ${span(d, "")}\n`;
    });
    if (i < DATA.experience.length - 1) out += "\n";
  });
  return out;
}

function renderEducation() {
  let out = `\n${span("cat ~/education.txt", "c-muted")}\n\n`;
  DATA.education.forEach((e) => {
    out += `  ${span("🎓 " + e.degree, "c-green c-bold")}\n`;
    out += `     ${span(e.school, "c-cyan")} ${span("(" + e.year + ")", "c-yellow")}\n`;
    if (e.details && e.details.length) {
      e.details.forEach((d) => {
        out += `     ${span(d, "")}\n`;
      });
    }
    out += "\n";
  });
  return out;
}

function renderContact() {
  return `
${span("cat ~/contact.txt", "c-muted")}

  ${span("📧 Email:", "c-yellow")}    <a href="mailto:${esc(DATA.email)}">${esc(DATA.email)}</a>
  ${span("🐙 GitHub:", "c-yellow")}   <a href="${esc(DATA.github)}" target="_blank">${esc(DATA.github)}</a>
  ${span("💼 LinkedIn:", "c-yellow")} <a href="${esc(DATA.linkedin)}" target="_blank">${esc(DATA.linkedin)}</a>

  ${span("Feel free to reach out — I'm always open to collaboration!", "c-green")}
`;
}

function renderBashrc() {
  return `
${span("# ~/.bashrc — roland's config", "c-muted")}
${span("export", "c-magenta")} ${span("EDITOR", "c-cyan")}=${span('"nvim"', "c-green")}
${span("export", "c-magenta")} ${span("LANG", "c-cyan")}=${span('"en_US.UTF-8"', "c-green")}
${span("export", "c-magenta")} ${span("PS1", "c-cyan")}=${span('"\\u@dev \\w $ "', "c-green")}
${span("alias", "c-magenta")} ${span("ll", "c-cyan")}=${span('"ls -la"', "c-green")}
${span("alias", "c-magenta")} ${span("gs", "c-cyan")}=${span('"git status"', "c-green")}
${span("alias", "c-magenta")} ${span("dc", "c-cyan")}=${span('"docker compose"', "c-green")}

${span("# Load conda", "c-muted")}
${span("eval", "c-magenta")} ${span('"$(conda shell.bash hook)"', "c-green")}
`;
}

function renderReadme() {
  return `
${span("# " + DATA.name + "'s Terminal Portfolio", "c-cyan c-bold")}

${span("An interactive terminal-style website.", "")}
${span("Navigate using bash commands like", "c-muted")} ${span("ls", "c-green")}${span(",", "c-muted")} ${span("cd", "c-green")}${span(",", "c-muted")} ${span("cat", "c-green")}${span(".", "c-muted")}

${span("Type", "c-muted")} ${span("help", "c-cyan")} ${span("for a full list of commands.", "c-muted")}
`;
}

// ── Filesystem Renderers ────────────────────────────────────

function renderTree(node, prefix) {
  let out = "";
  if (!node || node.type !== "dir") return out;
  const entries = Object.entries(node.children).sort(([a], [b]) => a.localeCompare(b));
  entries.forEach(([n, child], i) => {
    const isLast = i === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const color = child.type === "dir" ? "c-cyan c-bold" : "";
    out += span(prefix + connector, "c-muted") + span(n + (child.type === "dir" ? "/" : ""), color) + "\n";
    if (child.type === "dir") {
      out += renderTree(child, prefix + (isLast ? "    " : "│   "));
    }
  });
  return out;
}

function renderLs(path) {
  const target = path ? resolvePath(path) : cwd;
  const node = getNode(target);
  if (!node) return span(`ls: cannot access '${path}': No such file or directory`, "c-red");
  if (node.type !== "dir") return span(path, "");

  const entries = Object.keys(node.children).sort();
  let out = "";
  entries.forEach((name) => {
    const child = node.children[name];
    if (child.type === "dir") {
      out += span(name + "/", "c-cyan c-bold") + "  ";
    } else if (name.startsWith(".")) {
      out += span(name, "c-muted") + "  ";
    } else {
      out += span(name, "") + "  ";
    }
  });
  return out;
}

// ── Cat Dispatch ────────────────────────────────────────────

function catFile(path) {
  const resolved = resolvePath(path);
  const node = getNode(resolved);
  if (!node) return span(`cat: ${path}: No such file or directory`, "c-red");
  if (node.type === "dir") return span(`cat: ${path}: Is a directory`, "c-red");

  switch (node.content) {
    case "about":      return renderAbout();
    case "skills":     return renderSkills();
    case "experience": return renderExperience();
    case "education":  return renderEducation();
    case "contact":    return renderContact();
    case "bashrc":     return renderBashrc();
    case "readme":     return renderReadme();
    default:
      if (node.content.startsWith("project:")) {
        return renderProject(node.content.slice(8));
      }
      return span("(empty file)", "c-muted");
  }
}

// ── Command Processor ───────────────────────────────────────

const commandHistory = [];
let historyIndex = -1;

function processCommand(input) {
  const raw = input.trim();
  if (!raw) return "";

  commandHistory.push(raw);
  historyIndex = commandHistory.length;

  const [cmd, ...args] = raw.split(/\s+/);
  const arg = args.join(" ");

  switch (cmd) {
    case "help":
    case "--help":
    case "-h":
      return renderHelp();

    case "about":
      return renderAbout();

    case "skills":
      return renderSkills();

    case "projects":
      return renderProjects();

    case "experience":
      return renderExperience();

    case "education":
      return renderEducation();

    case "contact":
      return renderContact();

    case "whoami":
      return span(DATA.name + " — " + DATA.role, "c-green");

    case "date":
      return span(new Date().toString(), "");

    case "uname":
      return span("PortfolioOS 2.0.26 roland.dev x86_64 GNU/Linux", "c-green");

    case "hostname":
      return span("roland.dev", "c-green");

    case "echo":
      return span(arg, "");

    case "pwd":
      return span(cwd, "c-cyan");

    case "ls":
    case "ll":
      return renderLs(arg || null);

    case "cd": {
      if (!arg || arg === "~") { cwd = "~"; updatePrompt(); return ""; }
      const target = resolvePath(arg);
      const node = getNode(target);
      if (!node) return span(`cd: no such file or directory: ${arg}`, "c-red");
      if (node.type !== "dir") return span(`cd: not a directory: ${arg}`, "c-red");
      cwd = target;
      updatePrompt();
      return "";
    }

    case "tree": {
      const treePath = arg || cwd;
      const treeNode = getNode(treePath);
      if (!treeNode) return span(`tree: '${arg}': No such file or directory`, "c-red");
      if (treeNode.type !== "dir") return span(`tree: '${arg}': Not a directory`, "c-red");
      const root = arg || pathDisplay();
      return span(root + "/", "c-cyan c-bold") + "\n" + renderTree(treeNode, "");
    }

    case "cat":
      if (!arg) return span("cat: missing operand", "c-red");
      return catFile(arg);

    case "clear":
      document.getElementById("output").innerHTML = "";
      return null;

    case "sudo":
      if (arg.startsWith("rm"))
        return span("sudo: nice try, but this portfolio has plot armor.", "c-red");
      return span("sudo: You have no power here..", "c-red");

    case "rm":
      if (arg.includes("-rf /") || arg.includes("-rf ~") || arg.includes("-rf *"))
        return span("rm: absolutely not. I've seen what you did to prod. 🔥", "c-red");
      return span("rm: permission denied (this is a portfolio, not a playground!)", "c-red");

    case "chmod":
    case "chown":
      return span(`${cmd}: nope`, "c-red");

    case "shutdown":
    case "reboot":
    case "poweroff":
      return span(`${cmd}: Can't stop, addicted to the shindig..`, "c-red");

    case "kill":
    case "killall":
      return span(`${cmd}: No chance.`, "c-red");

    case "python":
    case "python3":
    case "node":
      return span(`${cmd}: sorry, I only run vibes here. Try 'help' instead.`, "c-yellow");

    case "ping":
      return span(
        `pong`,
        "c-green"
      );

    case "history":
      return commandHistory
        .map((c, i) => span(`  ${String(i + 1).padStart(4)}  ${c}`, ""))
        .join("\n");

    case "git":
      if (arg === "status") return span("On branch main\nnothing to commit, working tree clean", "c-green");
      if (arg === "log") return span("commit abc1234 (HEAD -> main)\nAuthor: Roland\nDate:   2026\n\n    Initial commit", "c-yellow");
      return span(`git: '${args[0] || ''}' is not a git command. See 'git --help'.`, "c-red");

    case "curl":
      if (!arg) return span("curl: try 'curl <url>'", "c-red");
      return span(`curl: (6) Could not resolve host: ${arg}\n(this is a portfolio, not a real terminal 😄)`, "c-yellow");

    default:
      return (
        span(`zsh: command not found: ${cmd}`, "c-red") +
        `\n${span("Type 'help' for available commands.", "c-muted")}`
      );
  }
}
