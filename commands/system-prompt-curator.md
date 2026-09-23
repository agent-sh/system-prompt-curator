---
description: Create or dramatically improve production-grade system prompts for autonomous coding agents
argument-hint: "[role description or --improve path/to/prompt] [--for-orchestrator] [--minimal]"
allowed-tools: Read, Write
---

# /system-prompt-curator

Create a new system prompt for an autonomous coding agent, or improve an existing one, following `skills/system-prompt-curator/SKILL.md` and its references (load the `system-prompt-curator` skill, or read those files from the plugin root).

`$ARGUMENTS` is a role description, or `--improve <path>`, with optional `--for-orchestrator` and `--minimal`. With `--improve`, read the whole prompt and the code or templates that assemble it before judging it. For a new prompt, ask the user only for facts you cannot find and cannot sensibly assume (the agent's tools, whether a human is present); otherwise state the assumption in the analysis.

Write the prompt to a file only when the user asked for it or confirms the path, since it changes how their agent behaves on every run.

## Output

Output the final prompt in a clean code block, followed by:

- the issue summary: for `--improve`, each finding with its location and fix; for a new prompt, the key design decisions;
- a token estimate;
- orchestrator suitability: whether it works with no human in the loop, and what is missing if not;
- harness-level recommendations.
