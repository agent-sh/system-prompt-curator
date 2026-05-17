import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

test("package and plugin manifests describe system-prompt-curator consistently", () => {
  const pkg = readJson("package.json");
  const claude = readJson(".claude-plugin/plugin.json");
  const codex = readJson(".codex-plugin/plugin.json");
  const marketplace = readJson(".claude-plugin/marketplace.json");

  assert.equal(pkg.name, "@agent-sh/system-prompt-curator");
  assert.equal(pkg.version, "2.0.0");
  assert.equal(claude.name, "system-prompt-curator");
  assert.equal(claude.version, pkg.version);
  assert.equal(marketplace.plugins[0].name, "system-prompt-curator");
  assert.equal(marketplace.plugins[0].version, pkg.version);
  assert.equal(codex.skills, "./skills");
});

test("skill and command expose the curator workflow", () => {
  const skill = readFileSync("skills/system-prompt-curator/SKILL.md", "utf8");
  const command = readFileSync("commands/system-prompt-curator.md", "utf8");

  assert.match(skill, /^name: system-prompt-curator$/m);
  assert.match(skill, /Use when creating, improving, or debugging agent prompts/);
  assert.match(skill, /\$ARGUMENTS/);
  assert.match(skill, /Explore -> Plan -> Implement -> Verify -> Deliver/);
  assert.match(command, /skills\/system-prompt-curator\/SKILL\.md/);
});
