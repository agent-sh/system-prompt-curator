# system-prompt-curator

Expert system for creating and refining production-grade system prompts for autonomous coding agents and multi-agent orchestration.

This plugin is the canonical reference for writing high-quality agent identities, workflows, and completion criteria that work reliably across Claude Code, Cursor, Codex, OpenCode, Kiro, Devin-style agents, and other modern coding agents.

## What it does

- Generates new system prompts from role descriptions
- Improves existing prompts by finding text written for weaker models (emphasis stacks, reasoning incantations, step scripts, long examples) and replacing it with context, done criteria and reasoned constraints
- Provides role skeletons for common agents (coding, orchestrator-dispatched, reviewer, research, subagent)
- Recommends harness-level reinforcements that belong in code rather than the prompt

## Installation

```bash
agentsys install system-prompt-curator
```

## Usage

```bash
/system-prompt-curator "senior software engineer that resolves GitHub issues end-to-end"
```

```bash
/system-prompt-curator --improve path/to/existing-prompt.md --for-orchestrator
```

```bash
/system-prompt-curator --improve path/to/prompt.md --minimal
```

## Related Plugins

- `skill-curator`: sibling plugin for writing `SKILL.md` files
- `enhance`: broader prompt, plugin and agent improvement

## Philosophy

Current models plan, reason and verify on their own, and follow instructions closely. The best agent prompts give them what they cannot know:
- Who they work for and in what environment
- The goal and what done looks like, with evidence
- Constraints with reasons
- A way to stop honestly when blocked
- Harness checks for what code can enforce

This curator exists to make those patterns easy to apply consistently.
