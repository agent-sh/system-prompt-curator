# AGENTS.md — system-prompt-curator

This plugin is the authoritative source for system prompt patterns in the agent-sh ecosystem.

## Overview

This repository ships one command and one skill for creating or improving autonomous agent system prompts. It is documentation-heavy and has no runtime library.

## Core Responsibility

Maintain and evolve the 10 Core Principles and Anti-Pattern table so that every agent prompt generated or improved through this tool follows the highest standards proven across SWE-agent, OpenHands, Claude Code, Cursor, and similar systems.

## When Editing

- Reflect changes to the principles or anti-pattern table in `skills/system-prompt-curator/SKILL.md`.
- New specialized templates should include realistic error recovery examples.
- Keep the skill balanced between depth and usability (the `--minimal` flag exists for a reason).
- The skill is intentionally opinionated — these patterns are backed by extensive empirical testing across many agent implementations.

## Cross-Tool Goal

Prompts produced by this curator should work well in Claude Code, Cursor, Codex, OpenCode, Kiro, and other agent platforms without major modification.
