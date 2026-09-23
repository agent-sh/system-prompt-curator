# AGENTS.md — system-prompt-curator

This plugin is the authoritative source for system prompt patterns in the agent-sh ecosystem.

## Overview

This repository ships one command and one skill for creating or improving autonomous agent system prompts. It is documentation-heavy and has no runtime library.

## Core Responsibility

Keep the guidance current with how strong models read prompts: context the model lacks, goal and done criteria, constraints with reasons, no emphasis stacks, reasoning incantations or step scripts for judgment work. The skill body is the core; `references/` holds the audit table, role skeletons and harness recommendations.

## When Editing

- Reflect guidance changes in `skills/system-prompt-curator/SKILL.md` and its references, and check claims about model behavior against current vendor docs before changing them.
- Role skeletons stay skeletons: real facts to fill in, not long example trajectories.
- Keep the skill balanced between depth and usability (the `--minimal` flag exists for a reason).

## Cross-Tool Goal

Prompts produced by this curator should work well in Claude Code, Cursor, Codex, OpenCode, Kiro, and other agent platforms without major modification.
