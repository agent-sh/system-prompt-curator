---
name: system-prompt-curator
description: Use when creating, improving or debugging the system prompt of an autonomous coding agent or an orchestrated subagent. Not for chat replies or user-facing copy.
version: 2.1.0
disable-model-invocation: true
argument-hint: "[role-description] [--improve path/to/prompt] [--for-orchestrator] [--minimal]"
---

# System Prompt Curator

Write or rework the system prompt for an agent that does real work with tools: a coding agent, an issue-to-PR worker, a reviewer, a research subagent. The prompt should give the model what it cannot know on its own and get out of the way of what it already does well.

## Arguments

`$ARGUMENTS`: a role description for a new prompt, or `--improve <path>` for an existing one. `--for-orchestrator` means no human answers questions during the run, so the prompt has to settle every judgment call it can and say how to finish or stop without one. `--minimal` means the smallest prompt that still carries the context, constraints and done criteria.

## How current models change the job

The readers are strong models: Claude Opus, Fable, Sonnet and Haiku, GPT-class models in Codex, and open models of the Qwen, GLM and DeepSeek class. They plan, reason, use tools, explore before editing and verify their work without being told. They also follow instructions closely and literally. Two consequences:

- Text that was written to push weaker models now over-steers. Emphasis stacks (MUST, CRITICAL, NEVER), "think step by step", fixed phase scripts, a verification order after every step, and long demonstration trajectories make the agent rigid, over-cautious or a copy of the example.
- Missing context hurts more than missing instructions. A short prompt with no environment facts, quality bar or reasons produces generic work, because the model fills the gaps with safe defaults.

So the work is to add what only the author knows and remove the scaffolding. `references/audit.md` lists the dated patterns and what replaces each.

## What a good agent prompt contains

- **Role and situation** in a sentence or two: who the agent is working for, on what, and whether a human is present.
- **Environment facts**: repository, language, build and test commands, where things live, what is installed, what is off limits, conventions that differ from the obvious.
- **The goal and what done looks like**, stated as outcomes and evidence ("a PR is open, tests pass, the issue is linked"). This replaces phase scripts: the model plans its own route to a clear finish line.
- **Constraints with reasons**, each once. "Ask before force-pushing or deleting branches: other people's work lives there" generalizes to cases the rule did not list; a bare NEVER gets over-applied.
- **Judgment calls the author has already made**: when to ask versus proceed, how much scope creep is acceptable, what to do when tests are wrong or the task is infeasible (say so rather than working around it).
- **Output contract**: what the final message or tool call must contain, and its exact format where code parses it.
- **Stop and escalate paths** for orchestrator runs: a distinct way to report "blocked" or "needs help" so the agent does not fake completion.

Structure helps when the prompt mixes instructions with variable inputs: headings, or XML-style tags around injected content such as `<issue>` or `<diff>`, keep data from being read as instructions. Use them where they separate content, not as a required template.

Tools are described in their tool definitions, where the harness keeps them accurate. The system prompt says when a tool matters for this job, not what each one does, so enabling or disabling a tool never leaves a stale reference. Only mention tools the agent has.

`references/anatomy.md` has a skeleton for autonomous coding agents and short notes for reviewer, research and orchestrator-dispatched roles.

## Improving an existing prompt

Read the whole prompt and whatever assembles it (templates, code that injects variables, tool definitions). For each line ask whether it carries context the model lacks or pushes behavior the model already has. Keep the first kind; rewrite or cut the second, using `references/audit.md`. Keep real safety and business constraints, parsed output formats and tool contracts. Check factual claims (paths, commands, tool names, model names) against the code, since prompts rot as the code moves.

## Enforce in code what code can enforce

Some behavior is more reliable as harness logic than as prose: rejecting a "done" with an empty diff, a separate help or blocked tool, output truncation, pager suppression, structured outputs instead of JSON-by-instruction. Recommend these alongside the prompt; `references/harness.md` lists them.

## Output

- The final prompt in one code block.
- For `--improve`: the findings (what was removed, rewritten or added, and why), each tied to a line or section.
- A token estimate.
- Whether it suits orchestrator-dispatched use (no human), and what is missing if not.
- Harness-level recommendations.

## Done

The prompt states the goal, done criteria, environment facts and constraints with reasons; it has no emphasis stacks, reasoning incantations or step scripts for judgment work; every tool, path and command it names exists; and the user has the analysis above.
