# system-prompt-curator

Expert system for creating and refining production-grade system prompts for autonomous coding agents and multi-agent orchestration.

This plugin is the canonical reference for writing high-quality agent identities, workflows, and completion criteria that work reliably across Claude Code, Cursor, Codex, OpenCode, Kiro, Devin-style agents, and other modern coding agents.

## What it does

- Generates new system prompts from role descriptions
- Dramatically improves existing prompts by detecting research-backed anti-patterns
- Provides specialized templates for common agent roles (GitHub issue → PR, research, review, orchestration)
- Enforces the 10 core principles proven across top-performing agents (SWE-agent, OpenHands, Claude Code, Cursor, etc.)
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

- `skill-curator` — sibling plugin for writing excellent `SKILL.md` files
- `enhance` — broader prompt/plugin/agent improvement
- `karpathy-guidelines` — foundational behavioral rules often included in prompts

## Philosophy

The best agents are not the ones with the cleverest tricks in the prompt — they are the ones with:
- Clear identity
- Enforced phased workflow
- Concrete completion criteria that require evidence
- Proper error recovery guidance
- Tools declared upfront

This curator exists to make those patterns easy to apply consistently.
