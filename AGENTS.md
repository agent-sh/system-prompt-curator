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

## Additional maintainer guidance

Follow the Karpathy Guidelines strictly when working in this repository.

This skill encodes hard-won patterns for agent system prompts. Change the guidance when current model behavior or vendor documentation supports it, and say what the evidence is.

## Key Rules

- The skill body is the heart of the product. Changes here have wide impact.
- Keep role skeletons short; long demonstration trajectories get copied by the model.
- When improving prompts, be surgical — explain every change.
- The harness-level recommendations section is deliberately separate from the prompt template. Keep those items outside the prompt itself unless the user specifically asks for a pure-prompt solution.

## Validation scope

Choose checks that cover the changed behavior. For CPU-only tooling, documentation
and configuration changes, run the relevant CPU tests, static checks and configuration
validation. Do not require a blanket GPU gate for those changes. Require GPU
qualification when GPU, runtime or model behavior, or related claims, change.
Preserve applicable native, model and hardware qualification gates. CPU checks do
not qualify GPU behavior.
