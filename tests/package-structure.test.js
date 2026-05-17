import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { test } from "node:test";

const PLUGIN = "system-prompt-curator";
const PACKAGE = `@agent-sh/${PLUGIN}`;
const VERSION = "2.0.1";
const REPO = `https://github.com/agent-sh/${PLUGIN}`;

const requiredPackageFiles = [
  ".claude-plugin/",
  ".codex-plugin/",
  "skills/",
  "commands/",
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "CONTRIBUTING.md",
  "components.json",
];

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const read = (path) => readFileSync(path, "utf8");

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, "missing frontmatter block");
  return Object.fromEntries(
    match[1]
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [key, ...rest] = line.split(":");
        const value = rest.join(":").trim().replace(/^"|"$/g, "");
        return [key.trim(), value];
      }),
  );
}

function assertPackageFileExists(entry) {
  const path = entry.endsWith("/") ? entry.slice(0, -1) : entry;
  assert.ok(existsSync(path), `${entry} listed in package.json but missing`);
  if (entry.endsWith("/")) {
    assert.ok(statSync(path).isDirectory(), `${entry} must be a directory`);
  } else {
    assert.ok(statSync(path).isFile(), `${entry} must be a file`);
  }
}

test("published package contract is internally consistent", () => {
  const pkg = readJson("package.json");
  const claude = readJson(".claude-plugin/plugin.json");
  const codex = readJson(".codex-plugin/plugin.json");
  const marketplace = readJson(".claude-plugin/marketplace.json");
  const components = readJson("components.json");

  assert.equal(pkg.name, PACKAGE);
  assert.equal(pkg.version, VERSION);
  assert.equal(pkg.type, "module");
  assert.equal(pkg.repository.url, `${REPO}.git`);
  assert.equal(pkg.homepage, REPO);
  assert.deepEqual(pkg.files, requiredPackageFiles);
  pkg.files.forEach(assertPackageFileExists);

  assert.equal(claude.name, PLUGIN);
  assert.equal(claude.version, pkg.version);
  assert.equal(claude.repository, REPO);
  assert.equal(claude.homepage, REPO);
  assert.match(claude.description, /system prompts/);

  assert.equal(marketplace.version, pkg.version);
  assert.equal(marketplace.repository, REPO);
  assert.equal(marketplace.plugins.length, 1);
  assert.deepEqual(marketplace.plugins[0], {
    name: PLUGIN,
    source: ".",
    description:
      "Create and improve autonomous coding-agent prompts with phase structure, evidence gates, and error recovery",
    version: pkg.version,
    category: "development",
  });

  assert.equal(codex.name, PLUGIN);
  assert.equal(codex.skills, "./skills");
  assert.equal(codex.interface.websiteUrl, REPO);
  assert.ok(codex.interface.defaultPrompt.length >= 3);
  assert.ok(codex.interface.capabilities.includes("prompt-engineering"));

  assert.deepEqual(components.skills, [PLUGIN]);
  assert.deepEqual(components.commands, [PLUGIN]);
});

test("skill frontmatter and body preserve autonomous-agent prompt quality", () => {
  const skill = read("skills/system-prompt-curator/SKILL.md");
  const fm = parseFrontmatter(skill);
  const lineCount = skill.trimEnd().split("\n").length;

  assert.equal(fm.name, PLUGIN);
  assert.equal(fm.version, VERSION);
  assert.ok(fm.description.startsWith("Use when "));
  assert.ok(fm.description.length <= 512);
  assert.match(fm.description, /system prompts/);
  assert.match(fm.description, /Not for user-facing messages/);
  assert.equal(fm["disable-model-invocation"], "true");
  assert.match(fm["argument-hint"], /--for-orchestrator/);

  assert.ok(lineCount <= 400, `skill is too large (${lineCount} lines)`);
  assert.match(skill, /## Core Principles/);
  assert.match(skill, /## Anti-Patterns to Detect and Fix/);
  assert.match(skill, /Explore -> Plan -> Implement -> Verify -> Deliver/);
  assert.match(skill, /Validate complete_run/);
  assert.match(skill, /error recovery/);
  const template = skill.split("## Prompt Template")[1].split("## Workflow")[0];
  assert.doesNotMatch(template, /CRITICAL WARNING|FAILURE TO/i);
});

test("slash command delegates to the skill and requires verification", () => {
  const command = read("commands/system-prompt-curator.md");
  const fm = parseFrontmatter(command);

  assert.match(fm.description, /system prompts/);
  assert.match(fm["allowed-tools"], /Read/);
  assert.match(fm["allowed-tools"], /Write/);
  assert.match(command, /skills\/system-prompt-curator\/SKILL\.md/);
  assert.match(command, /10 core principles/);
  assert.match(command, /full demonstration trajectory with error recovery/);
  assert.match(command, /explicit completion criteria/);
  assert.match(command, /harness-level recommendations/);
});

test("docs and CI encode the agent-sh publishing standard", () => {
  const readme = read("README.md");
  const agents = read("AGENTS.md");
  const ci = read(".github/workflows/ci.yml");

  assert.match(readme, /agentsys install system-prompt-curator/);
  assert.match(readme, /skill-curator/);
  assert.match(agents, /skills\/system-prompt-curator\/SKILL\.md/);
  assert.match(agents, /10 Core Principles/);

  assert.match(ci, /node-version: \$\{\{ matrix\.node-version \}\}/);
  assert.match(ci, /node-version:\s*\[18, 20, 22\]/);
  assert.match(ci, /actions\/checkout@[0-9a-f]{40}/);
  assert.match(ci, /actions\/setup-node@[0-9a-f]{40}/);
  assert.match(ci, /agent-sh\/agnix@v0\.26\.0/);
  assert.match(ci, /npm pack --dry-run/);
});
