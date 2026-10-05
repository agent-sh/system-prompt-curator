# system-prompt-curator

## Project overview

One command and one skill for creating or improving the system prompts of autonomous coding agents; the agent-sh ecosystem's source for system prompt patterns. It is documentation only, with no runtime library.

The product is `skills/system-prompt-curator/SKILL.md` and its references: `skills/system-prompt-curator/references/audit.md` (dated patterns and their replacements), `skills/system-prompt-curator/references/anatomy.md` (role skeletons) and `skills/system-prompt-curator/references/harness.md` (what to enforce in code). `commands/system-prompt-curator.md` delegates to the skill. Changes to the skill body reach every prompt the curator writes, so make them surgical and explain each one.

## Editing the guidance

- The guidance tracks how current models read prompts: context the model lacks, a goal with done criteria, constraints with reasons, and no emphasis stacks, reasoning incantations or step scripts for judgment work.
- Change a claim about model behavior only with current evidence (vendor prompting docs or a measured eval), and name it in the PR.
- Role skeletons list the facts to fill in. Long demonstration trajectories get copied by the model, so they stay out.
- Harness recommendations stay separate from the prompt template: they belong in the harness reference, outside the prompt, unless the user asks for a pure-prompt solution.
- Keep the skill usable at both depths; `--minimal` exists for users who want the smallest prompt.
- Prompts the curator writes should work in Claude Code, Codex, Cursor, OpenCode, Kiro and other agent platforms without major changes.

## Checks

`npm test` checks the package contract and the skill's own rules (no all-caps rules, a Done section, the references exist). CI also runs `npm pack --dry-run` and agnix.
